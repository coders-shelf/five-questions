export const setItem = (key, value) => {
  // localStorage, sessionStorage, Cookie, ...
  localStorage.setItem(key, value);
};

export const getItem = key => {
  return localStorage.getItem(key);
};

const removeItem = key => {
  localStorage.removeItem(key);
};

export const saveAuthTokens = (token, id, expiresIn) => {
  setItem("token", token);
  setItem("userId", id);
  setItem("exp", new Date(new Date().getTime() + expiresIn * 1000));
};

export const removeAuthTokens = () => {
  removeItem("token");
  removeItem("userId");
  removeItem("exp");
};

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
