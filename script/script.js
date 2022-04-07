//Get our elements needed ///////////////////////////////////////////////////////
const popupForm = document.querySelector(".popup__form");
const likeButton = document.querySelectorAll(".card__like-button");
const editButton = document.querySelector(".profile__edit-button");
const closeButton = document.querySelector(".popup__close-button");
const popup = document.querySelectorAll(".popup");
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
const popupArray = Array.from(popup); //Create an array of popups from our NodeList
function openPopup(thisPopup) {
  thisPopup.classList.add("popup_show");
}
editButton.addEventListener("click", openPopup(popup[0]));

//////////////////////////////////////////////////
// Change profile name and description using our save button /
function changeProfileData(event) {
  event.preventDefault();
  if ((popupFullName.value || popupDescription.value) != "") {
    profileName.textContent = popupFullName.value;
    profileDescription.textContent = popupDescription.value;
  }
  popup.classList.remove("popup_show");
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
const imagePopup = document.querySelector(".imagePopup");
const imagePopupSrc = document.querySelector(".imagePopup__image");
const imagePopupCaption = document.querySelector(".imagePopup__caption");
const imagePopupCloseButton = document.querySelector(
  ".imagePopup__closeButton "
);
function createCard(card) {
  const cardTemplate = document.querySelector("#card-template").content;
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);
  const imageElement = cardElement.querySelector(".card__image");
  imageElement.src = card.link;
  imageElement.alt = card.name;
  cardElement.querySelector(".card__caption").textContent = card.name;
  //Like button of this element//
  cardElement
    .querySelector(".card__like-button")
    .addEventListener("click", (evt) => {
      evt.target.classList.toggle("card__like-button_active");
    });
  //Remove this element//
  cardElement
    .querySelector(".card__removeButton")
    .addEventListener("click", () => {
      const thisCard = cardElement.closest(".card");
      thisCard.remove();
    });
  //Show popupImage of this element//
  cardElement.querySelector(".card__image").addEventListener("click", () => {
    imagePopupSrc.src = card.link;
    imagePopupSrc.alt = card.name;
    imagePopupCaption.textContent = card.name;
    imagePopup.classList.add("imagePopup_show");
  });
  return cardElement;
}

// Add card //
const addButton = document.querySelector(".profile__add-button");
const popupAddCard = popupArray[1];
const popupAddCardForm = document.querySelector(".popupAddCard__Form");
popupAddCardForm.addEventListener("submit", (evt) => {
  const popup_AddCardCaption = document.querySelector(
    ".popup__input_addPhoto_caption"
  );
  const popup_AddCardImageURL = document.querySelector(
    ".popup__input_addPhoto_ImageURL"
  );
  evt.preventDefault();
  elementsSection.prepend(
    createCard({
      name: popup_AddCardCaption.value,
      link: popup_AddCardImageURL.value,
    })
  );
  popupAddCard.classList.remove("popup_show");
  popupAddCardForm.reset();
});

//Create our layout//
const card = createCard(initialCards);
initialCards.forEach((card) => {
  elementsSection.append(createCard(card));
});
