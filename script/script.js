//Get our elements needed :)
let likeButton = document.querySelectorAll(".single-element__like-button");
let editButton = document.querySelector(".profile__edit-button");
let closeButton = document.querySelector(".popup__close-button");
let popup = document.querySelector(".popup");
let popupFullName = document.querySelector(".popup__name");
let popupDescription = document.querySelector(".popup__description");
let saveButton = document.querySelector(".popup__submit-button");
let profileName = document.querySelector(".profile__name");
let profileDescription = document.querySelector(".profile__description");

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
  profileName.innerHTML = popupFullName.value;
  profileDescription.innerHTML = popupDescription.value;
}
saveButton.addEventListener("click", changeProfileData);
