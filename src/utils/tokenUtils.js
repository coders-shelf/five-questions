export const setItem = (key, value) => {
  // localStorage以外の保存方法に切り替えるようにするため
  // localStorage, sessionStorage, Cookie, ...
  localStorage.setItem(key, value);
};

export const getItem = key => {
  return localStorage.getItem(key);
};

const removeItem = key => {
  localStorage.removeItem(key);
};

/**
 * トークン・ID・有効期限を保存する
 *
 * @param {String} token - 認証トークン
 * @param {String} id - ユーザID
 * @param {Number} expiresIn - 期限切れまでの時間(単位は秒)
 */
export const saveAuthTokens = (token, id, expiresIn) => {
  setItem("token", token);
  setItem("userId", id);
  setItem("exp", new Date(new Date().getTime() + expiresIn * 1000));
};

/**
 * 保存されたトークン・ID・有効期限を削除する
 */
export const removeAuthTokens = () => {
  removeItem("token");
  removeItem("userId");
  removeItem("exp");
};

/**
 * 保存されているトークンの有効期限が切れているか確認する
 *
 * @returns {Boolean} - 有効期限が切れていればtrueを返す
 */
export const isExpired = () => {
  const expirationDate = getItem("exp");
  if (new Date(expirationDate) <= new Date()) {
    // トークンの期限切れ
    return true;
  } else {
    return false;
  }
};

export const getUserId = () => {
  return getItem("userId");
};
