import axios from "axios";
import { getItem } from "../utils/tokenUtils";

const instance = axios.create({
  baseURL: "https://five-questions-77934.firebaseio.com/"
  // timeout: 2000
});

// リクエストのインターセプター
instance.interceptors.request.use(
  config => {
    // リクエストが送られる「前に」実行される
    // 例えば、トークンを設定する
    config.url += "?auth=" + getItem("token");
    return config;
  },
  error => {
    // then/catchの処理の「前に」実行されるエラーハンドリング
    console.log("=== Request Failed ===");
    return Promise.reject(error);
  }
);

// レスポンスのインタセプター
// then/catchの処理の「前に」実行される
instance.interceptors.response.use(
  response => {
    console.log("=== Success ===");
    return response;
  },
  error => {
    console.log("=== Response Error ===");
    return Promise.reject(error);
  }
);

export default instance;
