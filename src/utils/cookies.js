const { CAFE_TOKEN_KEY, CAFE_REFRESH_TOKEN_KEY } = import.meta.env;

function getToken() {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${CAFE_TOKEN_KEY}=`);
  if (parts.length === 2) return parts.pop().split(";").shift();
}
function getRefreshToken() {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${CAFE_REFRESH_TOKEN_KEY}=`);
  if (parts.length === 2) return parts.pop().split(";").shift();
}
function saveToken(token, expired) {
  document.cookie = `${CAFE_TOKEN_KEY}=${token}; expires=${new Date(
    expired
  )}; path=/`;
}
function saveRefreshToken(token, expired) {
  document.cookie = `${CAFE_REFRESH_TOKEN_KEY}=${token}; expires=${new Date(
    expired
  )}; path=/`;
}
function saveAllToken(res) {
  const { token, refreshToken, expireTime, expireTimeR } = res;
  saveToken(token, expireTime);
  saveRefreshToken(refreshToken, expireTimeR);
}
function removeToken() {
  document.cookie = `${CAFE_TOKEN_KEY}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/`;
}
function removeRefreshToken() {
  document.cookie = `${CAFE_REFRESH_TOKEN_KEY}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/`;
}
function removeAllToken() {
  removeToken();
  removeRefreshToken();
}

function setCookie(name, value, days) {
  const date = new Date();
  date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000); // 有效天數
  document.cookie = `${name}=${value}; expires=${date.toUTCString()}; path=/;`;
}

function getCookie(name) {
  const cookies = document.cookie.split("; ");
  for (let cookie of cookies) {
    const [key, value] = cookie.split("=");
    if (key === name) {
      return value;
    }
  }
  return null;
}

export default {
  getToken,
  getRefreshToken,
  saveRefreshToken,
  saveToken,
  saveAllToken,
  removeToken,
  removeRefreshToken,
  removeAllToken,
  setCookie,
  getCookie,
};
