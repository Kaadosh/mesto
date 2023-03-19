import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._imgEditView = this._popup.querySelector(".popup__photo-view");
    this._titleEditView = this._popup.querySelector(".popup__title-view");
  }

  open(data) {
    this._imgEditView.src = data.link;
    this._imgEditView.alt = data.name;
    this._titleEditView.textContent = data.name;
    super.open();
  }
}
