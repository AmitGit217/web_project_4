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

export class Card {
  constructor(data, template) {
    this._text = data.name;
    this._link = data.link;
    this._template = template;
  }
  _getTemplate() {
    const card = document
      .querySelector(this._template)
      .content.querySelector(".card")
      .cloneNode(true);
    return card;
  }
  generateCard() {
    this._card = this._getTemplate();
    this._card.querySelector(".card__image").src = this._link;
    this._card.querySelector(".card__caption").textContent = this._text;
    this._setEventListeners();
    return this._card;
  }
  _toggleLike() {
    const likeButton = this._card.querySelector(".card__like-button");
    likeButton.addEventListener("click", () => {
      likeButton.classList.toggle("card__like-button_active");
    });
  }
  _removeCard() {
    const removeButton = this._card.querySelector(".card__removeButton");
    removeButton.addEventListener("click", () => {
      this._card.remove();
    });
  }
  _setEventListeners() {
    this._toggleLike();
    this._removeCard();
  }
}

const cardsSection = document.querySelector(".elements");
initialCards.forEach((item) => {
  const card = new Card(item, "#card-template");
  const cardElement = card.generateCard();
  cardsSection.appendChild(cardElement);
});

//
// ──── CARDS TEMPLATE AND ZOOM ON VARIABLES ─────
//
// const elementsSection = document.querySelector(".elements");
// const imagePopupPhoto = document.querySelector(".imagePopup__image");
// const imagePopupCaption = document.querySelector(".imagePopup__caption");
// const imagePopupCloseButton = document.querySelector(
//   ".imagePopup__closeButton "
// );
// const cardTemplate = document.querySelector("#card-template").content;
// const addButton = document.querySelector(".profile__add-button");
// const addCardPopupForm = document.querySelector("#addImagePopup__form");
// const addCardPopupCloseButton = document.querySelector(
//   "#add-popup__close-button"
// );
// //
// // ─── CREATE CARD AND THEIR FUNCTIONS ─────
// //
// function createCard(card) {
//   const cardElement = cardTemplate.querySelector(".card").cloneNode(true);
//   const imageElement = cardElement.querySelector(".card__image");
//   imageElement.src = card.link;
//   imageElement.alt = card.name;
//   cardElement.querySelector(".card__caption").textContent = card.name;
//   //
//   // ─── LIKE BUTTON OF THIS ELEMENT ─────
//   //
//   cardElement
//     .querySelector(".card__like-button")
//     .addEventListener("click", (evt) => {
//       evt.target.classList.toggle("card__like-button_active");
//     });
//   // ────────────────────────────────────────────────────────────────────────────────
//   // ────────────────────────────────────────────────────────────────────────────────
//   // ────────────────────────────────────────────────────────────────────────────────

//   //
//   // ─── REMOVE THIS ELEMENT ─────
//   //
//   cardElement
//     .querySelector(".card__removeButton")
//     .addEventListener("click", () => {
//       const thisCard = cardElement.closest(".card");
//       thisCard.remove();
//     });
//   // ─────────────────────────────────────────────────────────────────
//   // ────────────────────────────────────────────────────────────────────────────────
//   // ────────────────────────────────────────────────────────────────────────────────

//   //
//   // ───── SHOW IMAGE POPUP OF THIS ELEMENT KNOWN AS ZOOMING ─────
//   //
//   cardElement.querySelector(".card__image").addEventListener("click", () => {
//     imagePopupPhoto.src = card.link;
//     imagePopupPhoto.alt = card.name;
//     imagePopupCaption.textContent = card.name;
//     openPopup(imagePopup);
//   });
//   // ────────────────────────────────────────────────────────────────────────────────
//   // ────────────────────────────────────────────────────────────────────────────────
//   // ────────────────────────────────────────────────────────────────────────────────

//   //
//   // ──── CLOSE THE IMAGE POPUP WINDOW AKA UN ZOOMING ─────
//   //
//   imagePopupCloseButton.addEventListener("click", () => {
//     closePopup(imagePopup);
//   });
//   // ────────────────────────────────────────────────────────────────────────────────
//   // ────────────────────────────────────────────────────────────────────────────────
//   // ────────────────────────────────────────────────────────────────────────────────

//   return cardElement; //All our code inside this return :)
// }

// //
// // ──── OPENING AND CLOSING OUR ADD CARD POPUP ─────
// //
// addButton.addEventListener("click", () => openPopup(addImagePopup));
// addCardPopupCloseButton.addEventListener("click", () =>
//   closePopup(addImagePopup)
// );
// // ────────────────────────────────────────────────────────────────────────────────
// // ────────────────────────────────────────────────────────────────────────────────
// // ────────────────────────────────────────────────────────────────────────────────

// //
// // ──────────────────────────────────────────────────────── III ──────────
// //   :::::: A D D   C A R D : :  :   :    :     :        :          :
// // ──────────────────────────────────────────────────────────────────
// //
// addCardPopupForm.addEventListener("submit", (evt) => {
//   const addCardPopupCaption = document.querySelector(
//     ".popup__input_addPhoto_caption"
//   );
//   const addCardPopupURL = document.querySelector(
//     ".popup__input_addPhoto_ImageURL"
//   );
//   evt.preventDefault();
//   elementsSection.prepend(
//     createCard({
//       name: addCardPopupCaption.value,
//       link: addCardPopupURL.value,
//     })
//   );
//   closePopup(addImagePopup);

//   addCardPopupForm.reset();
// });

// //
// // ───── CREATE OUR LAYOUT ─────
// //
// const card = createCard(initialCards);
// initialCards.forEach((card) => {
//   elementsSection.append(createCard(card));
// });
// ────────────────────────────────────────────────────────────────────────────────
// ────────────────────────────────────────────────────────────────────────────────
// ────────────────────────────────────────────────────────────────────────────────
