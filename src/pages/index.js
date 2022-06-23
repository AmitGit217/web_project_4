import "./index.css";
import { API } from "../components/API";
import { Card } from "../components/Card";
import { Section } from "../components/Section";
import { UserInfo } from "../components/UserInfo";
import { PopupWithForm } from "../components/PopupWithForm";
import { PopupWithImage } from "../components/PopupWithImage";
import { cardsSection, cardSettings } from "../utils/constants";
import { FormValidation, configObject } from "../components/FormValidation.js";
import { PopupWithSubmit } from "../components/PopupWithSubmit";

//Connect to to the Practicum's API
const api = new API({
  URL: "https://around.nomoreparties.co/v1/cohort-3-en",
  headers: {
    authorization: " 4f091419-1c89-4f29-928b-74f786fd1208",
    "Content-Type": "application/json",
  },
});

let userId;

Promise.all([api.getInitialCards(), api.getUserInfo()]).then(
  ([cardData, userData]) => {
    userId = userData._id;
    cardList.renderItems(cardData);
    profile.setUserInfo({
      name: userData.name,
      job: userData.about,
      avatar: userData.avatar,
    });
  }
);

const deletePopup = new PopupWithSubmit(".popup_confirm");
deletePopup.setEventListeners();
//Card creation logic
const { cardsTemplate } = cardSettings;
const addButton = document.querySelector(".profile__add-button");
const createCard = (item) => {
  const card = new Card(
    item,
    cardsTemplate,
    () => {
      imagePopup.open(item);
    },
    (id) => {
      deletePopup.open();
      api.deleteCard(id).then((res) => {
        deletePopup.setAction(() => {
          card._removeCard();
          return res;
        });
      });
    },
    userId
  );
  const cardElement = card.generateCard();
  return cardElement;
};

const cardList = new Section(
  {
    renderer: (data) => {
      const card = createCard(data);
      cardList.setItem(card);
    },
  },
  cardsSection
);

const addCardForm = new PopupWithForm("#addImagePopup", () => {
  const { caption, image } = addCardForm.getInputValues();
  api.addCard({ name: caption, link: image }).then((res) => {
    const cardElement = createCard(res);
    cardsSection.prepend(cardElement);
  });

  addCardForm.close();
});
const imagePopup = new PopupWithImage(".popup_image");

//End of Card logic

//Form logic
const formValidators = {};
const enableValidations = (configObject) => {
  const formList = [...document.querySelectorAll(configObject.formSelector)];
  formList.forEach((form) => {
    const newFormValidator = new FormValidation(configObject, form);
    const formName = form.getAttribute("name");
    formValidators[formName] = newFormValidator;
    newFormValidator.enableValidation();
  });
};
enableValidations(configObject);
//End of Form logic

const profileEditButton = document.querySelector("#profilePopup__edit-button");

//Profile popup & UserInfo implementation

const profile = new UserInfo({
  name: ".profile__name",
  job: ".profile__description",
  avatar: ".profile__avatar-image",
});
const profileForm = new PopupWithForm("#profilePopup", () => {
  const currentImage = document.querySelector(".profile__avatar-image").src;
  const { fullName, description } = profileForm.getInputValues();
  api.editProfileServer({ name: fullName, about: description }).then((res) => {
    profile.setUserInfo({
      name: fullName,
      job: description,
      avatar: currentImage,
    });
    return res;
  });
  profileForm.close();
});

addButton.addEventListener("click", () => addCardForm.open());
profileEditButton.addEventListener("click", () => {
  const { name, job } = profile.getUserInfo();
  profileForm.setInputValues({ fullName: name, description: job });
  profileForm.open();
});

imagePopup.setEventListeners();
profileForm.setEventListeners();
addCardForm.setEventListeners();
