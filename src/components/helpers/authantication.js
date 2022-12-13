export const setUserAuth = (key, value) => {
  localStorage.setItem(key, JSON.stringify(value));
};

export const isAuth = (key1, key2) => {
  const user = JSON.parse(localStorage.getItem(key1));
  const token = JSON.parse(localStorage.getItem(key2));

  return { user: user, token: token };
};

export const deleteStorage = (key1, key2) => {
  localStorage.removeItem(key1);
  localStorage.removeItem(key2);
};

export const logout = (next) => {
  deleteStorage("user", "token");
  next();
};
