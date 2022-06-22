export default class API {
  constructor({ URL, headers }) {
    this.url = URL;
    this.headers = headers;
  }
  getUserInfo() {
    return fetch("https://around.nomoreparties.co/v1/cohort-3-en/users/me", {
      headers: this.headers,
    }).then((res) => {
      if (res.ok) {
        return res.json();
      } else {
        return Promise.reject(`Error: ${res.status}`);
      }
    });
  }
  getInitialCards() {
    return fetch("https://around.nomoreparties.co/v1/cohort-3-en/cards", {
      headers: this.headers,
    }).then((res) => {
      if (res.ok) {
        return res.json();
      } else {
        return Promise.reject(`Error: ${res.status}`);
      }
    });
  }
}
