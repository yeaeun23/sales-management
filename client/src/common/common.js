import { put } from "axios";

export const apiPrefix = '/api';

export function uncomma(str) {
  str = String(str);
  return str.replace(/[^\d]+/g, "");
}

export function comma(str) {
  str = String(str);
  return str.replace(/(\d)(?=(?:\d{3})+(?!\d))/g, "$1,");
}

export function setLogout() {
  const api = apiPrefix + '/logout';
  const data = { user_name: sessionStorage.getItem("user_name") };
  const config = {
    headers: { 'content-type': 'application/json' }
  };
  return put(api, data, config);
}
