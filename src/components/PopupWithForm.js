import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(popupSelector, { callbackSubmitForm }) {
    super(popupSelector);
    this._callbackSubmitForm = callbackSubmitForm;
    this._form = this._popup.querySelector(".popup__form");
    this._field = this._popup.querySelectorAll(".popup__field");
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
    // this._buttonClose.disabled = true;
  }

  resetButton(text) {
    this._buttonClose.textContent = text;
    // this._buttonClose.disabled = false;
  }

  setEventListeners() {
    super.setEventListeners();
    this._popup.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this._callbackSubmitForm(this._getInputValues());
    });
  }

  close() {
    super.close();
    this._form.reset();
  }
}
