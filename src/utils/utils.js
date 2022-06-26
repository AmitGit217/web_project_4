const closeFromOverlay = (e) => {
  e.target === e.currentTarget ? closePopup(e.currentTarget) : false;
};
export const closeFromEsc = (e) => {
  if (e.key === "Escape") {
    const openedPopup = document.querySelector(".popup_show");
    closePopup(openedPopup);
  }
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
