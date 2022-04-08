//Declaring our popups with variabels//
const editProfilePopup = document.querySelector("#profilePopup");
const addCardPopup = document.querySelector("#addImagePopup");
const imagePopup = document.querySelector(".imagePopup");

///Global functions for openning & colsing popups///
function openPopup(popup) {
  popup.classList.add("popup_show");
}
function closePopup(popup) {
  popup.classList.remove("popup_show");
}

/// ### Profile popup ### ///

// 1. Our elements from the DOM //
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
//Open the edit profile popup//
profileEditButton.addEventListener("click", () => {
  openPopup(editProfilePopup);
});
profilePopupCloseButton.addEventListener("click", () => {
  closePopup(editProfilePopup);
});

// Change profile name and description using our save button /
function changeProfileData(event) {
  event.preventDefault();
  profileName.textContent = profilePopupName.value;
  profileDescription.textContent = profilePopupDescription.value;
  closePopup(editProfilePopup);
}
profilePopupForm.addEventListener("submit", changeProfileData);

/// End of edit profile popup functions ///

/// ### Add Image Popup & Zoom on an Image Popup ### ///

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
// Cards template & Zoom on variabels //
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

//  Create card and their functions //
function createCard(card) {
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

  //Show image popup of this element. AKA => "Zooming"//
  cardElement.querySelector(".card__image").addEventListener("click", () => {
    imagePopupPhoto.src = card.link;
    imagePopupPhoto.alt = card.name;
    imagePopupCaption.textContent = card.name;
    openPopup(imagePopup);
  });

  //Close the image popup window. AKA => "UnZooming"//
  imagePopupCloseButton.addEventListener("click", () => {
    closePopup(imagePopup);
  });

  return cardElement; // On this state the card element contains all the functions needed //
}

//Openning and closing our add card popup//
addButton.addEventListener("click", () => {
  openPopup(addImagePopup);
});
addCardPopupCloseButton.addEventListener("click", () => {
  closePopup(addImagePopup);
});

// Add card //
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

//Create our layout//
const card = createCard(initialCards);
initialCards.forEach((card) => {
  elementsSection.append(createCard(card));
});
