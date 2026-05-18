import APICafes from "@/utils/request";
import JWT from "@/utils/cookies.js";
import { PER_AUTH, URL_LOGIN, URL_REFRESH } from "@/utils/constants.js";

export const apiLogIn = async (data) => {
  try {
    const res = await APICafes.postBody(PER_AUTH, URL_LOGIN, data);
    JWT.saveAllToken(res);
    return res.data;
  } catch (e) {
    console.error("ERR! apiLogIn", e);
  }
};
