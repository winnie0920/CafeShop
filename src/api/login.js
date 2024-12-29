import APICafes from "@/utils/request";
import JWT from "@/utils/cookies.js";
import { PER_USER, URL_LOGIN, URL_REFRESH } from "@/utils/constants.js";

export const apiLogIn = async (data) => {
  try {
    const res = await APICafes.postBody(PER_USER, URL_LOGIN, data);
    JWT.saveAllToken(res.data);
    return res.data;
  } catch (e) {
    console.error("ERR! apiLogIn", e);
  }
};
