//Get our elements needed ///////////////////////////////////////////////////////
const popupForm = document.querySelector(".popup__form");
const likeButton = document.querySelectorAll(".card__like-button");
const editButton = document.querySelector(".profile__edit-button");
const closeButton = document.querySelector(".popup__close-button");
const popup = document.querySelector("#popup");
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
  popup.classList.add("popup_show");
}
function popupWindow_remove() {
  popup.classList.remove("popup_show");
}
editButton.addEventListener("click", popupWindow);
closeButton.addEventListener("click", popupWindow_remove);
saveButton.addEventListener("click", popupWindow_remove);
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
// cards template//
const elementsSection = document.querySelector(".elements");
function createCard(initialCards) {
  const cardTemplate = document.querySelector("#card-template").content;
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);
  cardElement.querySelector(".card__image").src = initialCards.link;
  cardElement.querySelector(".card__image").alt = initialCards.name;
  cardElement.querySelector(".card__caption").textContent = initialCards.name;
  return cardElement;
}
// Add card //

const addButton = document.querySelector(".profile__add-button");
const popupAddCard = document.querySelector(".popup_AddCard");
const popupAddCard_closeButton = document.querySelector(
  ".popup__close-button_AddCard"
);
const popupAddCard_submitButton = document.querySelector(
  ".popupAddCard_submitButton "
);
const popup_AddCardForm = document.querySelector(".popup_AddCardForm");

function popupWindow_addRemove() {
  popupAddCard.classList.remove("popup_show");
}
addButton.addEventListener("click", () => {
  popupAddCard.classList.add("popup_show");
});
popup_AddCardForm.addEventListener("submit", (evt) => {
  const popup_AddCardCaption = document.querySelector(
    ".popup_AddCard__input_changeProfileData_caption"
  );
  const popup_AddCardImageURL = document.querySelector(
    ".popup_AddCard__input_changeProfileData_imageURL"
  );
  evt.preventDefault();
  initialCards.push({
    name: popup_AddCardCaption.value,
    link: popup_AddCardImageURL.value,
    //I used this push method to change my array as well//
  });
  elementsSection.prepend(
    createCard({
      name: popup_AddCardCaption.value,
      link: popup_AddCardImageURL.value,
    })
  );
  //Reset to empty value !//
  popup_AddCardCaption.value = "";
  popup_AddCardImageURL.value = "";
});

popupAddCard_closeButton.addEventListener("click", popupWindow_addRemove);
popupAddCard_submitButton.addEventListener("click", popupWindow_addRemove);

const card = createCard(initialCards);
initialCards.forEach((card) => {
  elementsSection.append(createCard(card));
});
