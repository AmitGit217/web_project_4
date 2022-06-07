import "./pages/index.css";
import { Section } from "./script/Section";
import { Card } from "./script/Card";
import { Popup } from "./script/Popup";
import { PopupWithImage } from "./script/PopupWithImage";
import { PopupWithForm } from "./script/PopupWithForm";
import { UserInfo } from "./script/UserInfo";
import {
  addCardPopupCaption,
  addCardPopupURL,
  addCardPopup,
  cardsSection,
  cardSettings,
} from "./utils/consts";
import { closePopup } from "./utils/utils.js";
import { FormValidation, configObject } from "./script/FormValidation.js";
import { initialCards } from "./utils/consts";

const formValidators = {};
const enableValidations = (configObject) => {
  const formList = [...document.querySelectorAll(configObject.formSelector)];
  formList.forEach((form) => {
    const newFormValidator = new FormValidation(configObject, form);
    const formName = form.getAttribute("name");
    formValidators[formName] = newFormValidator;
    newFormValidator.enableValidation();
  });
};
enableValidations(configObject);

const imagePopup = new PopupWithImage(".popup_image");
imagePopup.setEventListeners();
const cardList = new Section(
  {
    data: initialCards,
    renderer: (item) => {
      const card = new Card(item, cardsTemplate, () => {
        imagePopup.open(item);
      });
      const cardElement = card.generateCard();
      cardList.setItem(cardElement);
    },
  },
  cardsSection
);
const { cardsTemplate } = cardSettings;
cardList.renderItems();
const createCard = (item) => {
  const card = new Card(item, cardsTemplate, () => {
    imagePopup.open(item);
  });
  const cardElement = card.generateCard();
  return cardElement;
};
const addCardForm = new PopupWithForm("#addImagePopup__form", () => {
  const data = {
    name: addCardPopupCaption.value,
    link: addCardPopupURL.value,
  };
  const cardElement = createCard(data);
  cardsSection.prepend(cardElement);
  closePopup(addCardPopup);
  addCardForm.close();
});

const editProfilePopup = document.querySelector("#profilePopup");
const profileEditButton = document.querySelector("#profilePopup__edit-button");
const profile = new UserInfo({
  name: ".profile__name",
  job: ".profile__description",
});

const profileInputs = {
  name: ".popup__input_type_name",
  job: ".popup__input_type_description",
};

const profileForm = new PopupWithForm("#profilePopup__form", () => {
  profile.setUserInfo(profileInputs);
  closePopup(editProfilePopup);
});
profileForm.setEventListeners();
profile.getUserInfo();

const addButton = document.querySelector(".profile__add-button");
const editProfile = new Popup("#profilePopup");
const addCard = new Popup("#addImagePopup");
profileEditButton.addEventListener("click", () => editProfile.open());
addButton.addEventListener("click", () => addCard.open());

profileForm.setEventListeners();
editProfile.setEventListeners();
addCardForm.setEventListeners();
addCard.setEventListeners();
