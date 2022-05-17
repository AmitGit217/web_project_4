import { Card } from "./Card.js";
import { openPopup, closePopup } from "./globalFunctions.js";

// Rendering Card class & Adding a new card inheritance
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
const addCardPopupCaption = document.querySelector(
  ".popup__input_addPhoto_caption"
);
const addCardPopupURL = document.querySelector(
  ".popup__input_addPhoto_ImageURL"
);
const addCardPopupForm = document.querySelector("#addImagePopup__form");
const cardsSection = document.querySelector(".elements");
addCardPopupForm.addEventListener("submit", () => {
  const data = {
    name: addCardPopupCaption.value,
    link: addCardPopupURL.value,
  };
  const newCard = new Card(data, "#card-template");
  const cardElement = newCard.generateCard();
  cardsSection.prepend(cardElement);
  closePopup(addCardPopup);
  addCardPopupForm.reset();
});
initialCards.forEach((item) => {
  const card = new Card(item, "#card-template");
  const cardElement = card.generateCard();
  cardsSection.appendChild(cardElement);
});
//////////////////////////////////////////////////////

const editProfilePopup = document.querySelector("#profilePopup");
const addCardPopup = document.querySelector("#addImagePopup");
const imagePopup = document.querySelector(".imagePopup");

const profilePopupForm = document.querySelector("#profilePopup__form");
const profileEditButton = document.querySelector("#profilePopup__edit-button");
const profilePopupCloseButton = document.querySelector(
  "#profilePopup__close-button"
);
const profilePopupName = document.querySelector(
  ".popup__input_changeProfileData_name"
);
const profilePopupDescription = document.querySelector(
  ".popup__input_changeProfileData_description"
);
const profileName = document.querySelector(".profile__name");
const profileDescription = document.querySelector(".profile__description");
//
// ───── OPEN THE EDIT PROFILE POPUP ───────────────────────────────────────
//
profileEditButton.addEventListener("click", () => openPopup(editProfilePopup));
profilePopupCloseButton.addEventListener("click", () =>
  closePopup(editProfilePopup)
);
// ────────────────────────────────────────────────────────────────────────────────
// ────────────────────────────────────────────────────────────────────────────────
// ────────────────────────────────────────────────────────────────────────────────

//
// ──── CHANGE PROFILE NAME AND DESCRIPTION USING OUR SAVE BUTTON ─────────────────
//
function changeProfileData(event) {
  event.preventDefault();
  profileName.textContent = profilePopupName.value;
  profileDescription.textContent = profilePopupDescription.value;
  closePopup(editProfilePopup);
}
profilePopupForm.addEventListener("submit", changeProfileData);

// ────────────────────────────────────────────────────────────────────────────────
// ────────────────────────────────────────────────────────────────────────────────
// ────────────────────────────────────────────────────────────────────────────────

//
// ──────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────── III ──────────
//   :::::: A D D   I M A G E   P O P U P   A N D   Z O O M   O N   A N   I M A G E   P O P U P : :  :   :    :     :        :          :
// ──────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────
//
