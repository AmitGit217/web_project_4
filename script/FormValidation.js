const configObject = {
  formSelector: ".form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__submit-button",
  inactiveButtonClass: "popup__submit-button_inactive",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__input-error_active",
};
class FormValidation {
  constructor(settings, formElement) {
    this._settings = settings;
    this._formElement = formElement;
    this._submit = this._formElement.querySelector(
      this._settings.submitButtonSelector
    );
    this._inputList = [
      ...this._formElement.querySelectorAll(this._settings.inputSelector),
    ];
  }

  _disableButtonState() {
    this._submit.classList.add(this._settings.inactiveButtonClass);
    this._submit.setAttribute("disabled", true);
  }
  _enableButtonState() {
    this._submit.classList.remove(this._settings.inactiveButtonClass);
    this._submit.removeAttribute("disabled", true);
  }
  _resetFormValidationState() {
    this._disableButtonState();
  }
  _hasInvalidInput() {
    return this._inputList.some((input) => {
      return !input.validity.valid;
    });
  }
  _toggleButtonState() {
    this._hasInvalidInput()
      ? this._disableButtonState()
      : this._enableButtonState();
  }
  _showErrorMessage(input) {
    const errorMessage = input.validationMessage;
    const errorElement = this._formElement.querySelector(`.${input.id}-error`);
    errorElement.textContent = errorMessage;
    input.classList.add(this._settings.inputErrorClass);
    errorElement.classList.add(this._settings.errorClass);
  }
  _hideErrorMessage(input) {
    const errorElement = this._formElement.querySelector(`.${input.id}-error`);
    input.classList.remove(this._settings.inputErrorClass);
    errorElement.classList.remove(this._settings.errorClass);
  }
  _checkInputValidity(input) {
    input.validity.valid
      ? this._hideErrorMessage(input)
      : this._showErrorMessage(input);
  }

  _setEventListeners() {
    this._inputList.forEach((input) => {
      input.addEventListener("input", () => {
        this._checkInputValidity(input);
        this._toggleButtonState();
      });
    });
  }

  enableValidation() {
    this._toggleButtonState();
    this._formElement.addEventListener("submit", (e) => {
      e.preventDefault();
      this._resetFormValidationState();
    });
    this._setEventListeners();
  }
}

export { configObject, FormValidation };
