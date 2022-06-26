import "./index.css";
import { Api } from "../components/Api";
import { Card } from "../components/Card";
import { Section } from "../components/Section";
import { UserInfo } from "../components/UserInfo";
import { PopupWithForm } from "../components/PopupWithForm";
import { PopupWithImage } from "../components/PopupWithImage";
import { cardsSection, cardSettings } from "../utils/constants";
import { FormValidation, configObject } from "../components/FormValidation.js";
import { PopupWithSubmit } from "../components/PopupWithSubmit";

function changeSubmitText(bool, submitButton) {
  if (bool) {
    submitButton.textContent = "Saving...";
  } else {
    submitButton.textContent = submitButton.name;
  }
}
//Connect to to the Practicum's API
const api = new Api({
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
  const card = new Card({
    data: item,
    template: cardsTemplate,
    handleClick: () => {
      imagePopup.open(item);
    },
    handleDelete: (id) => {
      deletePopup.open();
      api
        .deleteCard(id)
        .then((res) => {
          deletePopup.setAction(() => {
            card._removeCard();
            return res;
          });
        })
        .catch((err) => console.log(err));
    },
    userId: userId,
    handleLike: (id) => {
      card._likeButton.classList.toggle(cardSettings.cardLikeButtonActive);
      if (
        card._likeButton.classList.contains(cardSettings.cardLikeButtonActive)
      ) {
        api.likeCard(id).then((res) => {
          card._cardCounter.textContent = res.likes.length;
        });
      } else {
        api.dislikeCard(id).then((res) => {
          card._cardCounter.textContent = res.likes.length;
        });
      }
    },
  });
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
  changeSubmitText(true, addCardForm._submitButton);
  api
    .addCard({ name: caption, link: image })
    .then((res) => {
      const cardElement = createCard(res);
      cardsSection.prepend(cardElement);
    })
    .catch((err) => console.log(err))
    .finally(changeSubmitText(false, addCardForm._submitButton));

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
  const { fullName, description } = profileForm.getInputValues();
  changeSubmitText(true, profileForm._submitButton);
  api
    .editProfileServer({ name: fullName, about: description })
    .then((res) => {
      profile.setUserInfo({
        name: fullName,
        job: description,
        avatar: res.avatar,
      });
      return res;
    })
    .catch((err) => console.log(err))
    .finally(changeSubmitText(false, profileForm._submitButton));
  profileForm.close();
});
const profileImageButton = document.querySelector(".profile__overlay");
const uploadProfile = new PopupWithForm("#edit-profile-image", () => {
  const { updateImageUrl } = uploadProfile.getInputValues();
  changeSubmitText(true, uploadProfile._submitButton);
  api
    .updateAvatarImage({ avatar: updateImageUrl })
    .then((res) => {
      changeSubmitText(true, uploadProfile._submitButton);
      profile.setUserInfo({
        name: res.name,
        job: res.about,
        avatar: updateImageUrl,
      });
      uploadProfile.close();
    })
    .catch((err) => console.log(err))
    .finally(changeSubmitText(false, uploadProfile._submitButton));
  uploadProfile.close();
});

addButton.addEventListener("click", () => addCardForm.open());
profileImageButton.addEventListener("click", () => uploadProfile.open());

profileEditButton.addEventListener("click", () => {
  const { name, job } = profile.getUserInfo();
  profileForm.setInputValues({ fullName: name, description: job });
  profileForm.open();
});

imagePopup.setEventListeners();
profileForm.setEventListeners();
addCardForm.setEventListeners();
uploadProfile.setEventListeners();
