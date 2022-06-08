import { Popup } from "./Popup";
export class PopupWithForm extends Popup {
  constructor(popupSelector, handleSubmit) {
    super(popupSelector);
    this._handleSubmit = handleSubmit;
    this._inputs = [...this._popup.querySelectorAll(".popup__input")];
    this._form = this._popup.querySelector(".form");
  }
  close() {
    super.close();
    this._form.id === "addImagePopup__form" ? this._form.reset() : false;
  }
  _getInputValues() {
    const inputData = {};
    this._inputs.forEach((input) => {
      inputData[input.name] = input.value;
    });

    return inputData;
  }

  setEventListeners() {
    super.setEventListeners();
    this._popup.addEventListener("submit", (e) => {
      e.preventDefault();
      this._handleSubmit(this._getInputValues());
    });
  }
}
