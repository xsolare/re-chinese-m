import axios from "axios";

import { WordsApi } from "./words";

export type ApiReturnType = {
  words: ReturnType<typeof WordsApi>;
};

export const Api = (): ApiReturnType => {
  const instance = axios.create({
    baseURL: "",
    headers: {
      "X-Auth-Token": "",
    },
    params: {},
  });

  const apis = {
    words: WordsApi,
  };

  const result = Object.entries(apis).reduce((prev, [key, f]) => {
    return {
      ...prev,
      [key]: f(instance),
    };
  }, {} as ApiReturnType);

  return result;
};
