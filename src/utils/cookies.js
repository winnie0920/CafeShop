const { VITE_CAFE_TOKEN_KEY, VITE_CAFE_REFRESH_TOKEN_KEY } = import.meta.env;

function getToken() {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${VITE_CAFE_TOKEN_KEY}=`);
  if (parts.length === 2) return parts.pop().split(";").shift();
}
function getRefreshToken() {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${VITE_CAFE_REFRESH_TOKEN_KEY}=`);
  if (parts.length === 2) return parts.pop().split(";").shift();
}
function saveToken(token, exp) {
  const expiredDate = new Date(exp * 1000);
  document.cookie = `${VITE_CAFE_TOKEN_KEY}=${token}; expires=${expiredDate.toUTCString()}; path=/`;
}
function saveRefreshToken(token, exp) {
  const expiredDate = new Date(exp * 1000);
  document.cookie = `${VITE_CAFE_REFRESH_TOKEN_KEY}=${token}; expires=${expiredDate.toUTCString()}; path=/`;
}
function saveAllToken(res) {
  const { token, expiredDate, refreshToken, expiredDateR } = res;
  saveToken(token, expiredDate);
  saveRefreshToken(refreshToken, expiredDateR);
}
function removeToken() {
  document.cookie = `${VITE_CAFE_TOKEN_KEY}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/`;
}
function removeRefreshToken() {
  document.cookie = `${VITE_CAFE_REFRESH_TOKEN_KEY}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/`;
}
function removeAllToken() {
  removeToken();
  removeRefreshToken();
}

function setCookie(name, value, days) {
  const expiredDate = new Date(Date.now() + days * 86400000 + 8 * 3600000);
  document.cookie = `${name}=${value}; expires=${expiredDate.toUTCString()}; path=/;`;
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
