import "./index.css";
import API from "../components/API";
import { Card } from "../components/Card";
import { Section } from "../components/Section";
import { UserInfo } from "../components/UserInfo";
import { initialCards } from "../utils/constants";
import { PopupWithForm } from "../components/PopupWithForm";
import { PopupWithImage } from "../components/PopupWithImage";
import { cardsSection, cardSettings } from "../utils/constants";
import { FormValidation, configObject } from "../components/FormValidation.js";

//Connect to to the Practicum's API
const api = new API({
  URL: "https://around.nomoreparties.co/v1/cohort-3-en",
  headers: {
    authorization: " 4f091419-1c89-4f29-928b-74f786fd1208",
    "Content-Type": "application/json",
  },
});

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
  const { caption, image } = addCardForm.getInputValues();
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
api
  .getUserInfo()
  .then((res) => {
    profile.setUserInfo({ name: res.name, job: res.about, avatar: res.avatar });
  })
  .catch((err) => {
    console.log(err);
  });

const profile = new UserInfo({
  name: ".profile__name",
  job: ".profile__description",
  avatar: ".profile__avatar-image",
});
const profileForm = new PopupWithForm("#profilePopup", () => {
  const { fullName, description } = profileForm.getInputValues();
  profile.setUerInfo({ name: fullName, job: description });
  profileForm.close();
});

addButton.addEventListener("click", () => addCardForm.open());
profileEditButton.addEventListener("click", () => {
  const { name, job } = profile.getUserInfo();
  profileForm.setInputValues({ fullName: name, description: job });
  profileForm.open();
});

imagePopup.setEventListeners();
profileForm.setEventListeners();
addCardForm.setEventListeners();
