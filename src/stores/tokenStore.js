// stores/tokenStore.js
import { defineStore } from "pinia";
import cookies from "@/utils/cookies";
const { VITE_CAFE_TOKEN_KEY, VITE_CAFE_REFRESH_TOKEN_KEY } = import.meta.env;

export const useTokenStore = defineStore("token", {
  actions: {
    //計算 payload 的過期時間
    createPayload(payload, days = 0) {
      const body = {
        name: payload.name,
        role: payload.role,
        iat: Math.floor(Date.now() / 1000),
        exp: Math.floor((Date.now() + days * 86400 * 1000) / 1000),
      };
      return body;
    },

    // 產生token
    saveToken(payload) {
      const header = {
        alg: "HS256",
        typ: "JWT",
      };
      const base64UrlEncode = (str) => {
        return btoa(JSON.stringify(str))
          .replace(/\+/g, "-")
          .replace(/\//g, "_")
          .replace(/=+$/, ""); // 轉換為符合 URL 安全的 Base64
      };

      // header
      const base64Header = base64UrlEncode(header);
      // payload
      const base64token = base64UrlEncode(this.createPayload(payload, 1));
      const base64RefreshToken = base64UrlEncode(
        this.createPayload(payload, 7)
      );
      //Signature
      const signToken = btoa(
        base64Header + "." + base64token + VITE_CAFE_TOKEN_KEY
      );
      const signRefreshToken = btoa(
        base64Header + "." + base64RefreshToken + VITE_CAFE_REFRESH_TOKEN_KEY
      );

      // 組裝成完整的 JWT token
      const token = `${base64Header}.${base64token}.${signToken}`;
      const refreshToken = `${base64Header}.${base64RefreshToken}.${signRefreshToken}`;

      cookies.saveAllToken({
        token: token,
        expiredDate: this.createPayload(payload, 1).exp,
        refreshToken: refreshToken,
        expiredDateR: this.createPayload(payload, 7).exp,
      });
    },
    // 驗證 Token
    verifyToken() {
      const now = Math.floor(Date.now() / 1000);
      const token = cookies.getToken();

      const decodedToken = this.decodeToken(token);
      // 1. 解碼 Token
      if (!decodedToken) {
        return this.checkRefreshToken();
      }
      // 4. 檢查 Token 是否過期
      if (decodedToken.exp < now) {
        return this.checkRefreshToken();
      }
      return true;
    },

    // 檢查 Refresh Token
    checkRefreshToken() {
      const alertStore = useAlertStore();
      const refreshToken = cookies.getRefreshToken();
      if (refreshToken) {
        const decodedFreshToken = this.decodeToken(refreshToken);
        const now = Math.floor(Date.now() / 1000);

        // 2. 如果 Refresh Token 過期
        if (decodedFreshToken.exp < now) {
          cookies.removeAllToken();
          alertStore.pushMsg("Common-Error", "Token都已過期");
          return false;
        }
        const { name, role } = decodedFreshToken;
        this.saveToken({ name: name, role: role });
        return true;
      } else {
        // 3.如果 Refresh Token 無效或消失
        cookies.removeAllToken();
        alertStore.pushMsg("Common-Error", "Token都已無效，請重新登入");
        return false;
      }
    },

    // 解碼 Base64 Token，並轉換成 JSON 物件
    decodeToken(token) {
      try {
        const base64Payload = token.split(".")[1];
        const decodedPayload = atob(base64Payload);
        return JSON.parse(decodedPayload);
      } catch (error) {
        return null;
      }
    },
  },
});
