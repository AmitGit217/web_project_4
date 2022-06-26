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
  constructor({
    data,
    template,
    handleClick,
    handleDelete,
    userId,
    handleLike,
  }) {
    this.data = data;
    this._handleClick = handleClick;
    this._text = data.name;
    this._link = data.link;
    this._likesData = data.likes;
    this._template = template;
    this._card = document
      .querySelector(this._template)
      .content.querySelector(cardClass)
      .cloneNode(true);
    this.likeButton = this._card.querySelector(cardLikeButton);
    this._removeButton = this._card.querySelector(cardRemoveButton);
    this._image = this._card.querySelector(cardImageClass);
    this.cardCounter = this._card.querySelector(cardCounter);
    this._deleteHandler = handleDelete;
    this._cardId = data._id;
    this._ownerId = data.owner._id;
    this._userId = userId;
    this._likeAction = handleLike;
  }

  removeCard() {
    this._card.remove();
  }
  getId() {
    return this._cardId;
  }

  isLiked() {
    if (this.likeButton.classList.contains(cardSettings.cardLikeButtonActive)) {
      return true;
    }
  }
  updateLikes(parameter) {
    this.cardCounter.textContent = parameter.length;
    this.likeButton.classList.toggle(cardSettings.cardLikeButtonActive);
  }
  _setEventListeners() {
    this.likeButton.addEventListener("click", (e) => {
      e.stopPropagation();
      this._likeAction(this);
    });
    this._removeButton.addEventListener("click", (e) => {
      e.stopPropagation();
      this._deleteHandler(this);
    });
    this._card.addEventListener("click", () => {
      this._handleClick();
    });
  }
  generateCard() {
    this._image.src = this._link;
    this._image.alt = this._text;
    this.cardCounter.textContent = this._likesData.length;
    this._card.querySelector(cardCaptionClass).textContent = this._text;
    this._setEventListeners();
    if (this._userId !== this._ownerId) {
      this._removeButton.style.display = "none";
    }
    this._likesData.some((like) => {
      if (like._id === this._userId) {
        this.likeButton.classList.add(cardLikeButtonActive);
      }
    });
    return this._card;
  }
}
