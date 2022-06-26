import { costumeFetch } from "../utils/utils";
export class Api {
  constructor({ URL, headers }) {
    this.url = URL;
    this.headers = headers;
  }
  getUserInfo() {
    return costumeFetch(`${this.url}/users/me`, {
      headers: this.headers,
    });
  }
  getInitialCards() {
    return costumeFetch(`${this.url}/cards`, {
      headers: this.headers,
    });
  }
  addCard({ name, link }) {
    return costumeFetch(`${this.url}/cards`, {
      headers: this.headers,
      method: "POST",
      body: JSON.stringify({
        name,
        link,
      }),
    });
  }
  editProfileServer({ name, about }) {
    return costumeFetch(`${this.url}/users/me`, {
      headers: this.headers,
      method: "PATCH",
      body: JSON.stringify({
        name,
        about,
      }),
    });
  }
  deleteCard(id) {
    return costumeFetch(`${this.url}/cards/${id}`, {
      headers: this.headers,
      method: "DELETE",
    });
  }
  likeCard(id) {
    return costumeFetch(`${this.url}/cards/likes/${id}`, {
      headers: this.headers,
      method: "PUT",
    });
  }

  dislikeCard(id) {
    return costumeFetch(`${this.url}/cards/likes/${id}`, {
      headers: this.headers,
      method: "DELETE",
    });
  }
  updateAvatarImage({ avatar }) {
    return costumeFetch(`${this.url}/users/me/avatar`, {
      headers: this.headers,
      method: "PATCH",
      body: JSON.stringify({
        avatar,
      }),
    });
  }
}
