import "./pages/index.css";
import { Section } from "./script/Section";
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
// const createCard = (item) => {
//   const card = new Card(item, cardSettings.cardsTemplate);
//   const cardElement = card.generateCard();
//   return cardElement;
// };
const cardList = new Section(
  {
    data: initialCards,
    renderer: (item) => {
      const card = new Card(item, cardSettings.cardsTemplate);
      const cardElement = card.generateCard();
      cardList.setItem(cardElement);
    },
  },
  cardsSection
);
cardList.renderItems();
// addCardPopupForm.addEventListener("submit", () => {
//   const data = {
//     name: addCardPopupCaption.value,
//     link: addCardPopupURL.value,
//   };
//   const cardElement = createCard(data);
//   cardsSection.prepend(cardElement);
//   closePopup(addCardPopup);
//   addCardPopupForm.reset();
// });

//////////////////////////////////////////////////////////////////////////////////

const editProfilePopup = document.querySelector("#profilePopup");
const profilePopupForm = document.querySelector("#profilePopup__form");
const profileEditButton = document.querySelector("#profilePopup__edit-button");
const popupsCloseButtons = [
  ...document.querySelectorAll(".popup__close-button"),
];

const profilePopupName = document.querySelector(
  ".popup__input_changeProfileData_name"
);
const profilePopupDescription = document.querySelector(
  ".popup__input_changeProfileData_description"
);
const profileName = document.querySelector(".profile__name");
const profileDescription = document.querySelector(".profile__description");

profileEditButton.addEventListener("click", () => openPopup(editProfilePopup));

function changeProfileData(event) {
  event.preventDefault();
  profileName.textContent = profilePopupName.value;
  profileDescription.textContent = profilePopupDescription.value;
  closePopup(editProfilePopup);
}
profilePopupForm.addEventListener("submit", changeProfileData);
const addButton = document.querySelector(".profile__add-button");

addButton.addEventListener("click", () => openPopup(addImagePopup));

popupsCloseButtons.forEach((button) => {
  const popup = button.closest(".popup");
  button.addEventListener("click", (e) => {
    closePopup(popup);
  });
});
