import { Popup } from "./Popup";
export class PopupWithForm extends Popup {
  constructor(popupSelector, handleSubmit) {
    super(popupSelector);
    this._handleSubmit = handleSubmit;
  }
  close() {
    super.close();
    this._popup.reset();
  }
  __getInputValues() {
    const inputList = [...this._popup.querySelectorAll(".popup__input")];
    const inputData = {};
    inputList.forEach((input) => {
      inputData[input.name] = input.value;
    });
    return inputData;
  }

  setEventListeners() {
    this._popup.addEventListener("submit", (e) => {
      e.preventDefault();
      this._handleSubmit();
      this.__getInputValues();
      this.close();
    });
  }
}
