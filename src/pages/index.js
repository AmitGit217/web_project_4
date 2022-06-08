import "./index.css";
import { Section } from "../components/Section";
import { Card } from "../components/Card";
import { Popup } from "../components/Popup";
import { PopupWithImage } from "../components/PopupWithImage";
import { PopupWithForm } from "../components/PopupWithForm";
import { UserInfo } from "../components/UserInfo";
import {
  addCardPopupCaption,
  addCardPopupURL,
  addCardPopup,
  cardsSection,
  cardSettings,
  profileInputs,
} from "../utils/constants";
import { closePopup } from "../utils/utils.js";
import { FormValidation, configObject } from "../components/FormValidation.js";
import { initialCards } from "../utils/constants";

//Card creation logic
const { cardsTemplate } = cardSettings;
const addButton = document.querySelector(".profile__add-button");
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
cardList.renderItems();
const createCard = (item) => {
  const card = new Card(item, cardsTemplate, () => {
    imagePopup.open(item);
  });
  const cardElement = card.generateCard();
  return cardElement;
};
const addCardForm = new PopupWithForm("#addImagePopup", () => {
  const data = {
    name: addCardPopupCaption.value,
    link: addCardPopupURL.value,
  };
  const cardElement = createCard(data);
  cardsSection.prepend(cardElement);
  closePopup(addCardPopup);
  addCardForm.close();
});
const imagePopup = new PopupWithImage(".popup_image");
//End of Card logic

//Form logic
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
//End of Form logic

const editProfilePopup = document.querySelector("#profilePopup");
const profileEditButton = document.querySelector("#profilePopup__edit-button");

//Profile popup & UserInfo implementation
const profile = new UserInfo({
  name: ".profile__name",
  job: ".profile__description",
});
const profileForm = new PopupWithForm("#profilePopup__form", () => {
  profile.setUserInfo(profileInputs);
  closePopup(editProfilePopup);
});
profileForm.setEventListeners();
profile.getUserInfo();

const addCard = new Popup("#addImagePopup");
const editProfile = new Popup("#profilePopup");
addButton.addEventListener("click", () => addCard.open());
profileEditButton.addEventListener("click", () => editProfile.open());

addCard.setEventListeners();
imagePopup.setEventListeners();
profileForm.setEventListeners();
editProfile.setEventListeners();
addCardForm.setEventListeners();
