import { Popup } from "./Popup";
export class PopupWithSubmit extends Popup {
  setAction(action) {
    this.handleDelete = action;
  }
  close() {
    super.close();
  }
  setEventListeners() {
    this._popup.addEventListener("submit", (e) => {
      e.preventDefault();
      this.handleDelete();
    });
    super.setEventListeners();
  }
}
