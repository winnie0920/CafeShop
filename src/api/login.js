import APICafes from "@/utils/request";
import JWT from "@/utils/cookies.js";
import { PER_AUTH, URL_LOGIN, URL_REFRESH } from "@/utils/constants.js";

export const apiLogIn = async (data) => {
  try {
    const res = await APICafes.postBody(PER_AUTH, URL_LOGIN, data);
    JWT.saveAllToken(res.data);
    return res.data;
  } catch (e) {
    console.log(e);
    console.error("ERR! apiLogIn", e);
  }
};

export const apiRefreshToken = async () => {
  if (JWT.getToken() || !JWT.getRefreshToken()) return;
  try {
    const refreshToken = JWT.getRefreshToken();

    const res = await APICafes.postRefresh(PER_AUTH, URL_REFRESH, refreshToken);
    const { data } = res.data;
    JWT.saveAllToken(data);
  } catch (e) {
    console.error("ERR! apiRefreshToken", e);
    JWT.removeAllToken();
  }
};
