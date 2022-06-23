import { cardSettings } from "../utils/constants";
const {
  cardClass,
  cardImageClass,
  cardCaptionClass,
  cardRemoveButton,
  cardLikeButton,
  cardLikeButtonActive,
  cardCounter,
} = cardSettings;
export class Card {
  constructor(data, template, handleClick, handleDelete) {
    this._handleClick = handleClick;
    this._text = data.name;
    this._link = data.link;
    this._likesData = data.likes;
    this._template = template;
    this._card = document
      .querySelector(this._template)
      .content.querySelector(cardClass)
      .cloneNode(true);
    this._likeButton = this._card.querySelector(cardLikeButton);
    this._removeButton = this._card.querySelector(cardRemoveButton);
    this._image = this._card.querySelector(cardImageClass);
    this._cardCounter = this._card.querySelector(cardCounter);
    this._deleteHandler = handleDelete;
    this._ownerId = data.owner;
    this._id = data._id;
  }
  _toggleLike() {
    this._likeButton.addEventListener("click", (e) => {
      e.stopPropagation();
      this._likeButton.classList.toggle(cardLikeButtonActive);
    });
  }

  _removeCard() {
    this._card.remove();
  }
  _setEventListeners() {
    this._toggleLike();
    this._removeButton.addEventListener("click", (e) => {
      e.stopPropagation();
      this._deleteHandler(this._id);
    });
    this._card.addEventListener("click", () => {
      this._handleClick();
    });
  }
  generateCard() {
    this._image.src = this._link;
    this._image.alt = this._text;
    // this._cardCounter.textContent = this._likesData.length;
    this._card.querySelector(cardCaptionClass).textContent = this._text;
    this._setEventListeners();
    return this._card;
  }
}
