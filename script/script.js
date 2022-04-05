//Get our elements needed ///////////////////////////////////////////////////////
const popupForm = document.querySelector(".popup__form");
const likeButton = document.querySelectorAll(".card__like-button");
const editButton = document.querySelector(".profile__edit-button");
const closeButton = document.querySelector(".popup__close-button");
const popup = document.querySelector(".popup");
const popupFullName = document.querySelector(
  ".popup__input_changeProfileData_name"
);
const popupDescription = document.querySelector(
  ".popup__input_changeProfileData_description"
);
const saveButton = document.querySelector(".popup__submit-button");
const profileName = document.querySelector(".profile__name");
const profileDescription = document.querySelector(".profile__description");
////////////////////////////////////////////////////////////////////////////////
//Open edit form & close it.//////////////////////
function popupWindow() {
  popup.classList.toggle("popup_show");
}
editButton.addEventListener("click", popupWindow);
closeButton.addEventListener("click", popupWindow);
saveButton.addEventListener("click", popupWindow);
//////////////////////////////////////////////////
// Change profile name and description using our save button /
function changeProfileData(event) {
  event.preventDefault();
  if ((popupFullName.value || popupDescription.value) != "") {
    profileName.textContent = popupFullName.value;
    profileDescription.textContent = popupDescription.value;
  }
}
popupForm.addEventListener("submit", changeProfileData);
/////////////////////////////////////////////////////////////

// List for our images and their captions ////////////////////////////
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
///////////////////////////////////////////////////////////////////
// cards template//
const elementsSection = document.querySelector(".elements");
function createCard(initialCards) {
  const cardTemplate = document.querySelector("#card-template").content;
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);
  cardElement.querySelector(".card__image").src = initialCards.link;
  cardElement.querySelector(".card__caption").textContent = initialCards.name;
  return cardElement;
}
const card = createCard(initialCards);
initialCards.forEach((card) => {
  elementsSection.append(createCard(card));
  //I used in this case append for keeping the desing as the old one, while I will add the "add image" I will use prepend//
});
