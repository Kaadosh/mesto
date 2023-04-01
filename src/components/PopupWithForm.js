import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(popupSelector, { callbackSubmitForm }) {
    super(popupSelector);
    this._callbackSubmitForm = callbackSubmitForm;
  }

  _getInputValues() {
    this._formList = {};
    this._field.forEach((input) => {
      this._formList[input.name] = input.value;
    });
    return this._formList;
  }
  lodingButton() {
    this._buttonClose.textContent = "Сохранение...";
    this._buttonClose.disabled = true;
  }

  resetButton() {
    this._buttonClose.textContent = "Сохранить";
    this._buttonClose.disabled = false;
  }

  setEventListeners() {
    super.setEventListeners();
    this._popup.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this._callbackSubmitForm(
        this._getInputValues(),
        this._itemId,
        this._card
      );
    });
  }

  close() {
    super.close();
    this._form.reset();
  }
}
