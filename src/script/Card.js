const popupSettings = {
  inputCaption: ".popup__input_addPhoto_caption",
  inputLink: ".popup__input_addPhoto_ImageURL",
  cardForm: "#addImagePopup__form",
  addCardPopup: "#addImagePopup",
};

const cardSettings = {
  cardsSection: ".elements",
  cardImagePopup: ".popup_image",
  cardsTemplate: "#card-template",
  cardClass: ".card",
  cardImageClass: ".card__image",
  cardCaptionClass: ".card__caption",
  cardRemoveButton: ".card__removeButton",
  cardLikeButton: ".card__like-button",
  cardLikeButtonActive: "card__like-button_active",
  cardZoomImageClass: ".popup__image",
  cardZoomCaptionClass: ".popup__caption",
};
const {
  cardImagePopup,
  cardsTemplate,
  cardClass,
  cardImageClass,
  cardCaptionClass,
  cardRemoveButton,
  cardLikeButton,
  cardLikeButtonActive,
  cardZoomImageClass,
  cardZoomCaptionClass,
} = cardSettings;
export class Card {
  constructor(data, template, handleClick) {
    this._handleClick = handleClick;
    this._text = data.name;
    this._link = data.link;
    this._template = template;
    this._card = document
      .querySelector(this._template)
      .content.querySelector(cardClass)
      .cloneNode(true);
    this._likeButton = this._card.querySelector(cardLikeButton);
    this._removeButton = this._card.querySelector(cardRemoveButton);
    this._image = this._card.querySelector(cardImageClass);
  }
  _toggleLike() {
    this._likeButton.addEventListener("click", (e) => {
      e.stopPropagation();
      this._likeButton.classList.toggle(cardLikeButtonActive);
    });
  }

  _removeCard() {
    const removeCard = (e) => {
      e.stopPropagation();
      this._card.remove();
      this._removeButton.removeEventListener("click", removeCard);
    };
    this._removeButton.addEventListener("click", removeCard);
  }
  _setEventListeners() {
    this._toggleLike();
    this._removeCard();
    this._card.addEventListener("click", () => {
      this._handleClick();
    });
  }
  generateCard() {
    this._image.src = this._link;
    this._image.alt = this._text;
    this._card.querySelector(cardCaptionClass).textContent = this._text;
    this._setEventListeners();
    return this._card;
  }
}

const addCardPopupCaption = document.querySelector(popupSettings.inputCaption);
const addCardPopupURL = document.querySelector(popupSettings.inputLink);
const addCardPopupForm = document.querySelector(popupSettings.cardForm);
const addCardPopup = document.querySelector(popupSettings.addCardPopup);
const cardsSection = document.querySelector(cardSettings.cardsSection);
export {
  addCardPopupCaption,
  addCardPopupURL,
  addCardPopupForm,
  addCardPopup,
  cardsSection,
  cardSettings,
};
