import { PER_AUTH, URL_THEME, URL_MEAL } from "@/utils/constants";
import APICafes from "@/utils/request";

export const apiGetTheme = (id) => APICafes.getParams(PER_AUTH, URL_THEME, id);
export const apiPostTheme = (body) =>
  APICafes.postBody(PER_AUTH, URL_THEME, body);
export const apiPatchTheme = (body) =>
  APICafes.patchBody(PER_AUTH, URL_THEME, body);
export const apiDeleteTheme = (id) => APICafes.delete(PER_AUTH, URL_THEME, id);

export const apiGetMeal = (id) => APICafes.getParams(PER_AUTH, URL_MEAL, id);
export const apiPostMeal = (body) =>
  APICafes.postBody(PER_AUTH, URL_MEAL, body);
export const apiPatchMeal = (body) =>
  APICafes.patchBody(PER_AUTH, URL_MEAL, body);

export const apiGetThemeDropdown = () =>
  APICafes.getParams(PER_AUTH, URL_THEME + "/dropdown");
