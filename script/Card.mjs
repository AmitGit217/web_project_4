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
    this.text = data.name;
    this.link = data.link;
    this.template = template;
  }
  _createCard(targetSection, cardClass, cardImageClass, cardCationClass) {
    const elementsSection = document.querySelector(targetSection);
    const cardTemplate = document.querySelector(this.template).content;
    const cardElement = cardTemplate.querySelector(cardClass).cloneNode(true);
    const imageElement = cardElement.querySelector(cardImageClass);
    imageElement.src = this.link;
    imageElement.alt = this.text;
    cardElement.querySelector(cardCationClass).textContent = this.text;
    elementsSection.appendChild(cardElement);
  }
}
export function createCardsGrid() {
  initialCards.forEach((item) => {
    const card = new Card(item, "#card-template");
    card._createCard(".elements", ".card", ".card__image", ".card__caption");
  });
}
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
