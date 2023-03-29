export default class Popup {
  constructor(popupSelector) {
    this._popup = document.querySelector(popupSelector);
    this._Escape = "Escape";
    this._form = this._popup.querySelector(".popup__form");
    this._field = this._popup.querySelectorAll(".popup__field");
    this._popupClose = this._popup.querySelector(".popup__close");
  }

  open() {
    this._popup.classList.add("popup_opened");
    // добавление слушителя для закрытия popupa по ESC
    document.addEventListener("keydown", this._handleEscClose);
    this._popup.addEventListener("click", this._closePopupOverLay);
  }

  close() {
    this._popup.classList.remove("popup_opened");
    // Удаление слушателя по ESC
    document.removeEventListener("keydown", this._handleEscClose);
    this._popup.removeEventListener("click", this._closePopupOverLay);
  }

  _handleEscClose = (evt) => {
    if (evt.key === this._Escape) {
      this.close();
    }
  };
  _closePopupOverLay = (evt) => {
    const overlay = evt.target;
    if (overlay === evt.currentTarget) {
      this.close();
    }
  };

  setEventListeners() {
    this._popupClose.addEventListener("click", () => {
      this.close();
    });
  }
}
