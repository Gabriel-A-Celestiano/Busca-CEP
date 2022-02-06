import api from "../services/api";

export function useCep() {
  function request(number) {
    return api.get(number + "/json");
  }
  return request;
}
