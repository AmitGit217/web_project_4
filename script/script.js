import { Card } from "./Card.js";
import { openPopup, closePopup } from "./globalFunctions.js";

const editProfilePopup = document.querySelector("#profilePopup");

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

profileEditButton.addEventListener("click", () => openPopup(editProfilePopup));
profilePopupCloseButton.addEventListener("click", () =>
  closePopup(editProfilePopup)
);

function changeProfileData(event) {
  event.preventDefault();
  profileName.textContent = profilePopupName.value;
  profileDescription.textContent = profilePopupDescription.value;
  closePopup(editProfilePopup);
}
profilePopupForm.addEventListener("submit", changeProfileData);
