export const BASE_URL = "https://api.hvny-web.students.nomoreparties.co";

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
      "Accept": "application/json",
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
      credentials: "include",
      method: "POST",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        password: password,
        email: email,
      }),
    })
    .then(checkRequest)
    .then((data) => {
      localStorage.setItem('userId', data._id);
      return data;
    })
};

export const getContent = (token) => {
  return fetch(`${BASE_URL}/users/me`, {
    credentials: "include",
    method: "GET",
    headers: {
      "Accept": "application/json",
      "Content-Type": "application/json",
    },
  }).then(checkRequest);
};