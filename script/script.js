import { createCardsGrid } from "./Card.js";

createCardsGrid();
//
// ─── GET THE MAIN POPUPS ────────────────────────────────────────────────────────
//
const editProfilePopup = document.querySelector("#profilePopup");
const addCardPopup = document.querySelector("#addImagePopup");
const imagePopup = document.querySelector(".imagePopup");
// ────────────────────────────────────────────────────────────────────────────────
// ────────────────────────────────────────────────────────────────────────────────
// ────────────────────────────────────────────────────────────────────────────────
//
// ───── CLOSE POPUP FROM THE OVERLAY ───────────────────────────────────────
//
const closeFromOverlay = (e) => {
  const openedPopup = document.querySelector(".popup_show");
  e.target === e.currentTarget ? closePopup(openedPopup) : false;
};
// ────────────────────────────────────────────────────────────────────────────────
// ────────────────────────────────────────────────────────────────────────────────
// ────────────────────────────────────────────────────────────────────────────────
//
// ─── CLOSE WITH ESCAPE KEY ──────────────────────────────────────────────────────
//
const closeFromEsc = (e) => {
  const openedPopup = document.querySelector(".popup_show");
  e.key === "Escape" ? closePopup(openedPopup) : false;
};
// ────────────────────────────────────────────────────────────────────────────────
// ────────────────────────────────────────────────────────────────────────────────
// ────────────────────────────────────────────────────────────────────────────────

//
// ─── GLOBAL FUNCTIONS FOR OPENING AND CLOSING POPUPS ──────────────────────────────
//
function openPopup(popup) {
  popup.classList.add("popup_show");
  window.addEventListener("keydown", closeFromEsc);
  popup.addEventListener("mousedown", closeFromOverlay);
}
function closePopup(popup) {
  popup.classList.remove("popup_show");
  popup.removeEventListener("mousedown", closeFromOverlay);
  window.removeEventListener("keydown", closeFromEsc);
}
// ────────────────────────────────────────────────────────────────────────────────
// ────────────────────────────────────────────────────────────────────────────────
// ────────────────────────────────────────────────────────────────────────────────

//
// ────────────────────────────────────────────────────────────────── II ──────────
//   :::::: P R O F I L E   P O P U P : :  :   :    :     :        :          :
// ────────────────────────────────────────────────────────────────────────────
//

//
// ───OUR ELEMENTS FROM THE DOM ───────────────────────────────────────────────
//
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
