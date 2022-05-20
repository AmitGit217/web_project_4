import { openPopup, closePopup } from "./utils.js";
const popupSettings = {
  inputCaption: ".popup__input_addPhoto_caption",
  inputLink: ".popup__input_addPhoto_ImageURL",
  cardForm: "#addImagePopup__form",
  addCardPopup: "#addImagePopup",
};

const cardSettings = {
  cardsSection: ".elements",
  cardImagePopup: ".imagePopup",
  cardsTemplate: "#card-template",
  cardClass: ".card",
  cardImageClass: ".card__image",
  cardCationClass: ".card__caption",
  cardRemoveButton: ".card__removeButton",
  cardLikeButton: ".card__like-button",
  cardLikeButtonActive: "card__like-button_active",
  cardZoomImageClass: ".imagePopup__image",
  cardZoomCaptionClass: ".imagePopup__caption",
  cardZoomCloseButton: ".imagePopup__closeButton",
};
const imagePopup = document.querySelector(cardSettings.cardImagePopup);

export class Card {
  constructor(data, template) {
    this._text = data.name;
    this._link = data.link;
    this._template = template;
  }
  _getTemplate() {
    const card = document
      .querySelector(this._template)
      .content.querySelector(cardSettings.cardClass)
      .cloneNode(true);
    return card;
  }
  _toggleLike() {
    const likeButton = this._card.querySelector(cardSettings.cardLikeButton);
    likeButton.addEventListener("click", () => {
      likeButton.classList.toggle(cardSettings.cardLikeButtonActive);
    });
  }
  _zoomCard() {
    const imagePopupPhoto = document.querySelector(
      cardSettings.cardZoomImageClass
    );
    const imagePopupCaption = document.querySelector(
      cardSettings.cardZoomCaptionClass
    );
    this._card.querySelector(".card__image").addEventListener("click", () => {
      imagePopupPhoto.src = this._link;
      imagePopupPhoto.alt = this._text;
      imagePopupCaption.textContent = this._text;
      openPopup(imagePopup);
      // this._unZoom();
    });
  }
  _removeCard() {
    const removeButton = this._card.querySelector(
      cardSettings.cardRemoveButton
    );
    const removeCard = () => {
      this._card.remove();
      removeButton.removeEventListener("click", removeCard);
    };
    removeButton.addEventListener("click", removeCard);
  }
  _setEventListeners() {
    this._toggleLike();
    this._removeCard();
    this._zoomCard();
  }
  generateCard() {
    this._card = this._getTemplate();
    this._card.querySelector(cardSettings.cardImageClass).src = this._link;
    this._card.querySelector(cardSettings.cardCationClass).textContent =
      this._text;
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
