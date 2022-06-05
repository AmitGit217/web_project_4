export class Popup {
  constructor(popupSelector) {
    this._popup = document.querySelector(popupSelector);
    this._closeButton = this._popup.querySelector(".popup__close-button");
  }
  open() {
    this._popup.classList.add("popup_show");
    // this._popup.addEventListener("mousedown", closeFromOverlay);
  }
  close() {
    this._popup.classList.remove("popup_show");
    // this._popup.removeEventListener("mousedown", closeFromOverlay);
    // window.removeEventListener("keydown", closeFromEsc);
  }
  _handleEscClose() {
    window.addEventListener("keydown", () => {
      this.close();
    });
  }
  setEventListeners() {
    this._closeButton.addEventListener("click", () => {
      this._popup.close;
    });
    this._handleEscClose();
  }
}
