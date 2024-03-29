export default class FormValidator {
  constructor(data, formElement) {
    this._data = data;
    this._formElement = formElement;
  }

  _showInputError(inputElement) {
    this.errorElement = this._formElement.querySelector(
      `.${inputElement.id}-error`
    );
    inputElement.classList.add(this._data.inputErrorClass);
    this.errorElement.textContent = inputElement.validationMessage;
    this.errorElement.classList.add(this._data.errorClass);
  }

  _hideInputError(inputElement) {
    this.errorElement = this._formElement.querySelector(
      `.${inputElement.id}-error`
    );
    inputElement.classList.remove(this._data.inputErrorClass);
    this.errorElement.classList.remove(this._data.errorClass);
    this.errorElement.textContent = "";
  }
  _toggleInputErrorState = (inputElement) => {
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement);
    } else {
      this._hideInputError(inputElement);
    }
  };

  _setEventListeners() {
    this._inputList = Array.from(
      this._formElement.querySelectorAll(this._data.inputElement)
    );
    this._buttonElement = this._formElement.querySelector(
      this._data.buttonClass
    );
    this._toggleButtonState();
    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener("input", () => {
        this._toggleInputErrorState(inputElement);
        this._toggleButtonState();
      });
    });
  }

  _hasInvalidInput() {
    return this._inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  }

  _toggleButtonState() {
    if (this._hasInvalidInput()) {
      this._buttonElement.classList.add(this._data.inactiveButtonClass);
      this._buttonElement.disabled = true;
    } else {
      this._buttonElement.classList.remove(this._data.inactiveButtonClass);
      this._buttonElement.disabled = false;
    }
  }

  enableValidation = () => {
    this._setEventListeners();
  };

  resetValidation() {
    this._inputList.forEach((inputElement) => {
      this._hideInputError(inputElement);
    });
    this._toggleButtonState();
  }
}
