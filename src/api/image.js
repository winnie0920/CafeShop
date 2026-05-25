import APICafes from "@/utils/request";

export const apiPostImg = (url, body) => APICafes.postForm(url, "upload", body);
export const apiDelImg = (url, imageUrl) =>
  APICafes.postParams(url, "delete", { imageUrl });
