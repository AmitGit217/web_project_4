export class Api {
  constructor({ URL, headers }) {
    this.url = URL;
    this.headers = headers;
  }
  _customFetch(url, headers) {
    return fetch(url, headers).then((res) =>
      res.ok ? res.json() : Promise.reject(`Error: ${res.status}`)
    );
  }
  getUserInfo() {
    return this._customFetch(`${this.url}/users/me`, {
      headers: this.headers,
    });
  }
  getInitialCards() {
    return this._customFetch(`${this.url}/cards`, {
      headers: this.headers,
    });
  }
  addCard({ name, link }) {
    return this._customFetch(`${this.url}/cards`, {
      headers: this.headers,
      method: "POST",
      body: JSON.stringify({
        name,
        link,
      }),
    });
  }
  editProfileServer({ name, about }) {
    return this._customFetch(`${this.url}/users/me`, {
      headers: this.headers,
      method: "PATCH",
      body: JSON.stringify({
        name,
        about,
      }),
    });
  }
  deleteCard(id) {
    return this._customFetch(`${this.url}/cards/${id}`, {
      headers: this.headers,
      method: "DELETE",
    });
  }
  likeCard(id) {
    return this._customFetch(`${this.url}/cards/likes/${id}`, {
      headers: this.headers,
      method: "PUT",
    });
  }

  dislikeCard(id) {
    return this._customFetch(`${this.url}/cards/likes/${id}`, {
      headers: this.headers,
      method: "DELETE",
    });
  }
  updateAvatarImage({ avatar }) {
    return this._customFetch(`${this.url}/users/me/avatar`, {
      headers: this.headers,
      method: "PATCH",
      body: JSON.stringify({
        avatar,
      }),
    });
  }
}
