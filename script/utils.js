const closeFromOverlay = (e) => {
  const openedPopup = document.querySelector(".popup_show");
  e.target === e.currentTarget ? closePopup(openedPopup) : false;
};
const closeFromEsc = (e) => {
  const openedPopup = document.querySelector(".popup_show");
  e.key === "Escape" ? closePopup(openedPopup) : false;
};

export function openPopup(popup) {
  popup.classList.add("popup_show");
  window.addEventListener("keydown", closeFromEsc);
  popup.addEventListener("mousedown", closeFromOverlay);
}
export function closePopup(popup) {
  popup.classList.remove("popup_show");
  popup.removeEventListener("mousedown", closeFromOverlay);
  window.removeEventListener("keydown", closeFromEsc);
}
