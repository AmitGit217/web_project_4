import "./index.css";
import { Card } from "../components/Card";
import { Section } from "../components/Section";
import { UserInfo } from "../components/UserInfo";
import { initialCards } from "../utils/constants";
import { PopupWithForm } from "../components/PopupWithForm";
import { PopupWithImage } from "../components/PopupWithImage";
import { cardsSection, cardSettings } from "../utils/constants";
import { FormValidation, configObject } from "../components/FormValidation.js";

//Card creation logic
const { cardsTemplate } = cardSettings;
const addButton = document.querySelector(".profile__add-button");
const createCard = (item) => {
  const card = new Card(item, cardsTemplate, () => {
    imagePopup.open(item);
  });
  const cardElement = card.generateCard();
  return cardElement;
};
const cardList = new Section(
  {
    data: initialCards,
    renderer: (item) => {
      const card = createCard(item);
      cardList.setItem(card);
    },
  },
  cardsSection
);
cardList.renderItems();
const addCardForm = new PopupWithForm("#addImagePopup", () => {
  const { caption, image } = addCardForm._getInputValues();
  const cardElement = createCard({ name: caption, link: image });
  cardList.prependItem(cardElement);
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

// const editProfilePopup = document.querySelector("#profilePopup");
const profileEditButton = document.querySelector("#profilePopup__edit-button");

//Profile popup & UserInfo implementation
const profile = new UserInfo({
  name: ".profile__name",
  job: ".profile__description",
});
const profileForm = new PopupWithForm("#profilePopup", () => {
  const { fullName, description } = profileForm._getInputValues();
  profile.setUerInfo({ name: fullName, job: description });
  profileForm.close();
});
profile.getUserInfo();

addButton.addEventListener("click", () => addCardForm.open());
profileEditButton.addEventListener("click", () => profileForm.open());

imagePopup.setEventListeners();
profileForm.setEventListeners();
addCardForm.setEventListeners();
