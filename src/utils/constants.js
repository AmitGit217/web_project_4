export const configObject = {
  formSelector: ".form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__submit-button",
  inactiveButtonClass: "popup__submit-button_inactive",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__input-error_active",
};
export const popupSettings = {
  inputCaption: ".popup__input_addPhoto_caption",
  inputLink: ".popup__input_addPhoto_ImageURL",
  cardForm: "#addImagePopup__form",
  addCardPopup: "#addImagePopup",
};
export const cardSettings = {
  cardsSection: ".elements",
  cardImagePopup: ".popup_image",
  cardsTemplate: "#card-template",
  cardClass: ".card",
  cardImageClass: ".card__image",
  cardCaptionClass: ".card__caption",
  cardRemoveButton: ".card__removeButton",
  cardLikeButton: ".card__like-button",
  cardLikeButtonActive: "card__like-button_active",
  cardCounter: ".card__like-counter",
  deletePopup: ".popup_confirm",
};
export const addCardPopupCaption = document.querySelector(
  popupSettings.inputCaption
);
export const addCardPopupURL = document.querySelector(popupSettings.inputLink);
export const addCardPopupForm = document.querySelector(popupSettings.cardForm);
export const addCardPopup = document.querySelector(popupSettings.addCardPopup);
export const cardsSection = document.querySelector(cardSettings.cardsSection);

export const profileInputs = {
  name: ".popup__input_type_name",
  job: ".popup__input_type_description",
};
