import axios from "axios";
// 取消請求
let cancelReq = new AbortController();

const routeDispatch = (permission, url, slug, dispatch) => {
  let URI = "";

  if (url) URI = `${url}`;
  if (permission) URI = `${permission}${URI ? `/${URI}` : ""}`;
  if (slug) URI = `${URI}/${slug}`;

  // 如果传入了 dispatch 就使用它作为基础路径
  return dispatch ? `${dispatch}/${URI}` : `${URI}`;
};

// axios實例：主要、次要（換發 Token 用）
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

// 請求攔截器
AxiosCafe.interceptors.request.use(
  async (config) => {
    console.log(config);

    return config;
  },
  (err) => {
    if (err && err.response) {
      return Promise.reject(err.response);
    }
    return Promise.reject(err);
  }
);

// 響應攔截器
AxiosCafe.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => {
    return Promise.reject(error);
  }
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
  delete(url, slug) {
    return AxiosCafe.delete(routeDispatch(url, slug), {
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
