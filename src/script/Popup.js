export class Popup {
  constructor(popupSelector) {
    this._popup = document.querySelector(popupSelector);
    this._closeButton = this._popup.querySelector(".popup__close-button");
    this._isOpen = "popup_show";
  }
  _handleEscClose(e) {
    if (e.key === "Escape") {
      this.close();
    }
  }

  open() {
    this._popup.classList.add(this._isOpen);
    document.addEventListener("keydown", this._handleEscClose);
  }

  close() {
    console.log("triggered");
    this._popup.classList.remove(this._isOpen);
  }

  setEventListeners() {
    this._closeButton.addEventListener("click", () => this.close());
    this._popup.addEventListener("mousedown", (e) => {
      if (e.target === e.currentTarget) {
        this.close();
      }
    });
  }
}
