//Get our elements needed :)
const likeButton = document.querySelectorAll(".single-element__like-button");
const editButton = document.querySelector(".profile__edit-button");
const closeButton = document.querySelector(".popup__close-button");
const popup = document.querySelector(".popup");
const popupFullName = document.querySelector(".popup__name");
const popupDescription = document.querySelector(".popup__description");
const saveButton = document.querySelector(".popup__submit-button");
const profileName = document.querySelector(".profile__name");
const profileDescription = document.querySelector(".profile__description");

//Open edit form & close it.
function popupWindow() {
  popup.classList.toggle("popup_show");
}
editButton.addEventListener("click", popupWindow);
closeButton.addEventListener("click", popupWindow);
saveButton.addEventListener("click", popupWindow);

//Change profile name and description using our save button
function changeProfileData(event) {
  event.preventDefault();
  if ((popupFullName.value || popupDescription.value) != "") {
    profileName.textContent = popupFullName.value;
    profileDescription.textContent = popupDescription.value;
  } else {
    popupFullName.value = profileName.textContent;
    popupDescription.value = profileDescription.textContent;
  }
}
saveButton.addEventListener("click", changeProfileData);
