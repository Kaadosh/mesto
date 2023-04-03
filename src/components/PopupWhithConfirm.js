import Popup from "./Popup";

export default class PopupWithConfirm extends Popup {
  constructor(popupSelector, { callbackSubmitForm }) {
    super(popupSelector);
    this._callbackSubmitForm = callbackSubmitForm;
  }

  setItemConfirm(itemId, item) {
    this._itemId = itemId;
    this._item = item;
  }

  lodingButton() {
    this._buttonClose.textContent = "Удаление...";
    this._buttonClose.disabled = true;
  }

  resetButton() {
    this._buttonClose.textContent = "Да";
    this._buttonClose.disabled = false;
  }

  setEventListeners() {
    super.setEventListeners();

    this._popup.addEventListener("submit", (event) => {
      event.preventDefault();
      this._callbackSubmitForm(this._itemId, this._item);
    });
  }
}
