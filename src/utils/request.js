import axios from "axios";
import { apiRefreshToken } from "@/api/login.js";
import JWT from "@/utils/cookies.js";
import { PER_AUTH, URL_LOGIN } from "@/utils/constants.js";

// 取消請求
let cancelReq = new AbortController();

const routeDispatch = (url, slug, dispatch) => {
  let URI = "";
  if (url) URI = `${url}`;
  if (slug) URI = `${URI}/${slug}`;

  return dispatch ? `${dispatch}/${URI}` : `${URI}`;
};

const axiosConfig = {
  baseURL: "http://localhost:8080",
  timeout: 15000,
  headers: {
    "Content-Type": "application/json; charset=utf-8",
    pragma: "no-cache",
    "cache-control": "no-cache",
  },
};
const AxiosCafe = axios.create(axiosConfig);
const AxiosRefresh = axios.create(axiosConfig);

// 不需要攜帶Token的URL
const noNeedTokenUrls = [routeDispatch(PER_AUTH, URL_LOGIN)];

// 請求攔截器
AxiosCafe.interceptors.request.use(
  async (config) => {
    if (!noNeedTokenUrls.includes(config.url)) {
      const alertStore = useAlertStore();
      // 換發到期 Token
      await apiRefreshToken();

      // 換發後仍無有效 Token 則清除並取消請求，要求重新登入
      if (!JWT.getToken()) {
        alertStore.pushMsg("Msg-Bye", "【無有效Token】請重新登入後造訪！");
        cancelReq.abort();
        cancelReq = new AbortController();
        await router.push({ name: "Login" });
      } else {
        const reqConfig = config;
        const token = JWT.getToken();
        return { ...reqConfig, headers: { ...reqConfig.headers, token } };
      }
    }
    return config;
  },
  (err) => {
    if (err && err.response) {
      return Promise.reject(err.response);
    }
    return Promise.reject(err);
  },
);

// 響應攔截器
AxiosCafe.interceptors.response.use(
  (response) => {
    const alertStore = useAlertStore();
    const { code, msg } = response.data;
    // 抛出意外錯誤 Http200 -> code!==200
    if (code < 200 || code >= 300) {
      alertStore.pushMsg(
        "Common-Error",
        msg || "發生異常，操作失敗，請稍後再試！",
      );
      return Promise.reject(response.data);
    }
    return response.data;
  },
  (error) => {
    const alertStore = useAlertStore();
    console.log(error);

    const { code, msg } = error.response.data;
    switch (code) {
      case 9004:
        JWT.removeAllToken();
        alertStore.pushMsg("Common-Error", "令牌過期，請重新登入！");
        router.push({ name: "Login" });
        break;
      default:
        alertStore.pushMsg("Common-Error", msg);
        break;
    }
    return Promise.reject(error);
  },
);

const APICafes = {
  // 主要
  getParams(url, slug, params) {
    return AxiosCafe.get(routeDispatch(url, slug), {
      params,
      signal: cancelReq.signal,
    });
  },
  postBody(url, slug, data) {
    return AxiosCafe.post(routeDispatch(url, slug), data, {
      signal: cancelReq.signal,
    });
  },
  postParams(url, slug, params) {
    return AxiosCafe.post(routeDispatch(url, slug), null, {
      params,
      signal: cancelReq.signal,
    });
  },
  postForm(url, slug, data) {
    return AxiosCafe.post(routeDispatch(url, slug), data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
      signal: cancelReq.signal,
    });
  },
  patchBody(url, slug, data) {
    return AxiosCafe.patch(routeDispatch(url, slug), data, {
      signal: cancelReq.signal,
    });
  },
  delete(url, slug, params) {
    return AxiosCafe.delete(routeDispatch(url, slug), {
      params,
      signal: cancelReq.signal,
    });
  },

  // 次要（換發 Token 用）
  postRefresh(url, slug, refreshToken) {
    return AxiosRefresh.post(routeDispatch(url, slug), null, {
      params: { refreshToken },
    });
  },
};

export default APICafes;
