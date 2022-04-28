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
profileEditButton.addEventListener("click", () => {
  openPopup(editProfilePopup);
});
profilePopupCloseButton.addEventListener("click", () => {
  closePopup(editProfilePopup);
});
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
//
// ──── CARDS TEMPLATE AND ZOOM ON VARIABLES ─────
//
const elementsSection = document.querySelector(".elements");
const imagePopupPhoto = document.querySelector(".imagePopup__image");
const imagePopupCaption = document.querySelector(".imagePopup__caption");
const imagePopupCloseButton = document.querySelector(
  ".imagePopup__closeButton "
);
const cardTemplate = document.querySelector("#card-template").content;
const addButton = document.querySelector(".profile__add-button");
const addCardPopupForm = document.querySelector("#addImagePopup__form");
const addCardPopupCloseButton = document.querySelector(
  "#add-popup__close-button"
);
//
// ─── CREATE CARD AND THEIR FUNCTIONS ─────
//
function createCard(card) {
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);
  const imageElement = cardElement.querySelector(".card__image");
  imageElement.src = card.link;
  imageElement.alt = card.name;
  cardElement.querySelector(".card__caption").textContent = card.name;
  //
  // ─── LIKE BUTTON OF THIS ELEMENT ─────
  //
  cardElement
    .querySelector(".card__like-button")
    .addEventListener("click", (evt) => {
      evt.target.classList.toggle("card__like-button_active");
    });
  // ────────────────────────────────────────────────────────────────────────────────
  // ────────────────────────────────────────────────────────────────────────────────
  // ────────────────────────────────────────────────────────────────────────────────

  //
  // ─── REMOVE THIS ELEMENT ─────
  //
  cardElement
    .querySelector(".card__removeButton")
    .addEventListener("click", () => {
      const thisCard = cardElement.closest(".card");
      thisCard.remove();
    });
  // ─────────────────────────────────────────────────────────────────
  // ────────────────────────────────────────────────────────────────────────────────
  // ────────────────────────────────────────────────────────────────────────────────

  //
  // ───── SHOW IMAGE POPUP OF THIS ELEMENT KNOWN AS ZOOMING ─────
  //
  cardElement.querySelector(".card__image").addEventListener("click", () => {
    imagePopupPhoto.src = card.link;
    imagePopupPhoto.alt = card.name;
    imagePopupCaption.textContent = card.name;
    openPopup(imagePopup);
  });
  // ────────────────────────────────────────────────────────────────────────────────
  // ────────────────────────────────────────────────────────────────────────────────
  // ────────────────────────────────────────────────────────────────────────────────

  //
  // ──── CLOSE THE IMAGE POPUP WINDOW AKA UN ZOOMING ─────
  //
  imagePopupCloseButton.addEventListener("click", () => {
    closePopup(imagePopup);
  });
  // ────────────────────────────────────────────────────────────────────────────────
  // ────────────────────────────────────────────────────────────────────────────────
  // ────────────────────────────────────────────────────────────────────────────────

  return cardElement; //All our code inside this return :)
}

//
// ──── OPENING AND CLOSING OUR ADD CARD POPUP ─────
//
addButton.addEventListener("click", () => {
  openPopup(addImagePopup);
});
addCardPopupCloseButton.addEventListener("click", () => {
  closePopup(addImagePopup);
});
// ────────────────────────────────────────────────────────────────────────────────
// ────────────────────────────────────────────────────────────────────────────────
// ────────────────────────────────────────────────────────────────────────────────

//
// ──────────────────────────────────────────────────────── III ──────────
//   :::::: A D D   C A R D : :  :   :    :     :        :          :
// ──────────────────────────────────────────────────────────────────
//
addCardPopupForm.addEventListener("submit", (evt) => {
  const addCardPopupCaption = document.querySelector(
    ".popup__input_addPhoto_caption"
  );
  const addCardPopupURL = document.querySelector(
    ".popup__input_addPhoto_ImageURL"
  );
  evt.preventDefault();
  elementsSection.prepend(
    createCard({
      name: addCardPopupCaption.value,
      link: addCardPopupURL.value,
    })
  );
  closePopup(addImagePopup);

  addCardPopupForm.reset();
});

//
// ───── CREATE OUR LAYOUT ─────
//
const card = createCard(initialCards);
initialCards.forEach((card) => {
  elementsSection.append(createCard(card));
});
// ────────────────────────────────────────────────────────────────────────────────
// ────────────────────────────────────────────────────────────────────────────────
// ────────────────────────────────────────────────────────────────────────────────
