export class API {
  constructor({ URL, headers }) {
    this.url = URL;
    this.headers = headers;
  }
  getUserInfo() {
    return fetch(`${this.url}/users/me`, {
      headers: this.headers,
    }).then((res) =>
      res.ok ? res.json() : Promise.reject(`Error: ${res.status}`)
    );
  }
  getInitialCards() {
    return fetch(`${this.url}/cards`, {
      headers: this.headers,
    }).then((res) =>
      res.ok ? res.json() : Promise.reject(`Error: ${res.status}`)
    );
  }
  addCard({ name, link }) {
    return fetch(`${this.url}/cards`, {
      headers: this.headers,
      method: "POST",
      body: JSON.stringify({
        name,
        link,
      }),
    }).then((res) =>
      res.ok ? res.json() : Promise.reject(`Error: ${res.status}`)
    );
  }
  editProfileServer({ name, about }) {
    return fetch(`${this.url}/users/me`, {
      headers: this.headers,
      method: "PATCH",
      body: JSON.stringify({
        name,
        about,
      }),
    }).then((res) =>
      res.ok ? res.json() : Promise.reject(`Error: ${res.status}`)
    );
  }
}
