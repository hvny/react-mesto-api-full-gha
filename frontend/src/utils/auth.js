export const BASE_URL = "https://auth.nomoreparties.co";

/*проверка запроса*/
const checkRequest = (res) =>{
    if (res.ok) {
        return res.json();
    }
    return Promise.reject(res.status);
};

/*регистрация юзера*/
export const register = (password, email) => {
  return fetch(`${BASE_URL}/signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      password: password,
      email: email,
    }),
  })
  .then(checkRequest);
};

/*авторизация*/
export const authorize = (password, email) => {
    return fetch(`${BASE_URL}/signin`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        password: password,
        email: email,
      }),
    })
    .then(checkRequest);
};

export const getContent = (token) => {
  return fetch(`${BASE_URL}/users/me`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  }).then(checkRequest);
};