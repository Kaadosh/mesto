import { openPopup, imgEditView, titleEditView, popupElementView } from './index.js'

export default class Cards {
  constructor(data, templateSelector) {
    this._name = data.name;
    this._link = data.link;
    this._templateSelector = templateSelector;
  }

  _getTemplate() {
    const cardElement = document.querySelector('#cards')
      .content
      .querySelector('.card')
      .cloneNode(true);
    return cardElement;
  }

  generateCard() {
    this._element = this._getTemplate();
    this._element.querySelector('.card__photo').src = this._link;
    this._element.querySelector('.card__title').textContent = this._name;
    this._setEventListeners();
    return this._element;
  }

  _setEventListeners() {
    this._element.querySelector('.card__like').addEventListener('click', () => {
      this._likeCards();
    });
    this._element.querySelector('.card__delete').addEventListener('click', () => {
      this._deleteCard();
    });
    this._element.querySelector('.card__photo').addEventListener('click', () => {
      this._bigPhoto(this._name, this._link);
    });
  }
  // Метод лайк
  _likeCards() {
    this._element.querySelector('.card__like').classList.toggle('card__like_active');
  }
  _deleteCard() {
    const deleteCard = this._element.querySelector('.card__delete').closest('.card');
    deleteCard.remove();
  }
  _bigPhoto() {
    openPopup(popupElementView)
    imgEditView.src = this._link;
    imgEditView.alt = this._name;
    titleEditView.textContent = this._name;
  }
}