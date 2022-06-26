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
let userId;
//Connect to to the Practicum's API
const api = new Api({
  URL: "https://around.nomoreparties.co/v1/cohort-3-en",
  headers: {
    authorization: " 4f091419-1c89-4f29-928b-74f786fd1208",
    "Content-Type": "application/json",
  },
});
Promise.all([api.getInitialCards(), api.getUserInfo()])
  .then(([cardData, userData]) => {
    userId = userData._id;
    cardList.renderItems(cardData);
    profile.setUserInfo({
      name: userData.name,
      job: userData.about,
      avatar: userData.avatar,
    });
  })
  .catch((err) => console.log(err));

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
    handleDelete: (card) => {
      deletePopup.open();
      deletePopup.setAction(() => {
        return api
          .deleteCard(card.getId())
          .then((res) => {
            card.removeCard();
            deletePopup.close();
            return res;
          })
          .catch((err) => console.log(err));
      });
    },
    userId: userId,
    handleLike: (card) => {
      if (!card.isLiked()) {
        api
          .likeCard(card.getId())
          .then((res) => {
            card.updateLikes(res.likes);
          })
          .catch((err) => console.log(err));
      } else {
        api
          .dislikeCard(card.getId())
          .then((res) => {
            card.updateLikes(res.likes);
          })
          .catch((err) => console.log(err));
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
  addCardForm.renderLoading(true);
  api
    .addCard({ name: caption, link: image })
    .then((res) => {
      const cardElement = createCard(res);
      cardsSection.prepend(cardElement);
      addCardForm.close();
    })
    .catch((err) => console.log(err))
    .finally(() => addCardForm.renderLoading(false));
});
const imagePopup = new PopupWithImage(".popup_image");
const deletePopup = new PopupWithSubmit(".popup_confirm");
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

//Profile popup & UserInfo implementation
const profileEditButton = document.querySelector("#profilePopup__edit-button");
const profile = new UserInfo({
  name: ".profile__name",
  job: ".profile__description",
  avatar: ".profile__avatar-image",
});
const profileForm = new PopupWithForm("#profilePopup", () => {
  const { fullName, description } = profileForm.getInputValues();
  profileForm.renderLoading(true);
  api
    .editProfileServer({ name: fullName, about: description })
    .then((res) => {
      profile.setUserInfo({
        name: fullName,
        job: description,
        avatar: res.avatar,
      });
      profileForm.close();
      return res;
    })
    .catch((err) => console.log(err))
    .finally(() => profileForm.renderLoading(false));
});
const profileImageButton = document.querySelector(".profile__overlay");
const uploadProfileImage = new PopupWithForm("#edit-profile-image", () => {
  const { updateImageUrl } = uploadProfileImage.getInputValues();
  uploadProfileImage.renderLoading(true);
  api
    .updateAvatarImage({ avatar: updateImageUrl })
    .then((res) => {
      profile.setUserInfo({
        name: res.name,
        job: res.about,
        avatar: updateImageUrl,
      });
      uploadProfileImage.close();
    })
    .catch((err) => console.log(err))
    .finally(() => uploadProfileImage.renderLoading(false));
});

addButton.addEventListener("click", () => addCardForm.open());
profileImageButton.addEventListener("click", () => uploadProfileImage.open());
profileEditButton.addEventListener("click", () => {
  const { name, job } = profile.getUserInfo();
  profileForm.setInputValues({ fullName: name, description: job });
  profileForm.open();
});

imagePopup.setEventListeners();
profileForm.setEventListeners();
addCardForm.setEventListeners();
deletePopup.setEventListeners();
uploadProfileImage.setEventListeners();
