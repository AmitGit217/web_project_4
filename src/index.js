import "./pages/index.css";
import { Section } from "./script/Section";
import { Popup } from "./script/Popup";
import { PopupWithImage } from "./script/PopupWithImage";
import {
  Card,
  addCardPopupCaption,
  addCardPopupURL,
  addCardPopupForm,
  addCardPopup,
  cardsSection,
  cardSettings,
} from "./script/Card.js";
import { openPopup, closePopup } from "./script/utils.js";
import { FormValidation, configObject } from "./script/FormValidation.js";

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

const initialCards = [
  {
    name: "Yosemite Valley",
    link: "https://code.s3.yandex.net/web-code/yosemite.jpg",
  },
  {
    name: "Lake Louise",
    link: "https://code.s3.yandex.net/web-code/lake-louise.jpg",
  },
  {
    name: "Bald Mountains",
    link: "https://code.s3.yandex.net/web-code/bald-mountains.jpg",
  },
  {
    name: "Latemar",
    link: "https://code.s3.yandex.net/web-code/latemar.jpg",
  },
  {
    name: "Vanoise National Park",
    link: "https://code.s3.yandex.net/web-code/vanoise.jpg",
  },
  {
    name: "Lago di Braies",
    link: "https://code.s3.yandex.net/web-code/lago.jpg",
  },
];
const imagePopup = new PopupWithImage(".popup_image");
imagePopup.setEventListeners();
const cardList = new Section(
  {
    data: initialCards,
    renderer: (item) => {
      const card = new Card(item, cardSettings.cardsTemplate, () => {
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
  const card = new Card(item, cardSettings.cardsTemplate);
  const cardElement = card.generateCard();
  return cardElement;
};
addCardPopupForm.addEventListener("submit", () => {
  const data = {
    name: addCardPopupCaption.value,
    link: addCardPopupURL.value,
  };
  const cardElement = createCard(data);
  cardsSection.prepend(cardElement);
  closePopup(addCardPopup);
  addCardPopupForm.reset();
});

//////////////////////////////////////////////////////////////////////////////////

const editProfilePopup = document.querySelector("#profilePopup");
const profilePopupForm = document.querySelector("#profilePopup__form");
const profileEditButton = document.querySelector("#profilePopup__edit-button");

const profilePopupName = document.querySelector(
  ".popup__input_changeProfileData_name"
);
const profilePopupDescription = document.querySelector(
  ".popup__input_changeProfileData_description"
);
const profileName = document.querySelector(".profile__name");
const profileDescription = document.querySelector(".profile__description");
const addButton = document.querySelector(".profile__add-button");

const editProfile = new Popup("#profilePopup");
const addCard = new Popup("#addImagePopup");
profileEditButton.addEventListener("click", () => editProfile.open());
addButton.addEventListener("click", () => addCard.open());
editProfile.setEventListeners();
addCard.setEventListeners();

function changeProfileData(event) {
  event.preventDefault();
  profileName.textContent = profilePopupName.value;
  profileDescription.textContent = profilePopupDescription.value;
  closePopup(editProfilePopup);
}
profilePopupForm.addEventListener("submit", changeProfileData);
