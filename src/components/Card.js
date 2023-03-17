//  import { openPopup, imgEditView, titleEditView, popupElementView } from './index.js'

 export default class Card {
  constructor(data, templateSelector, hundleCardClick) {
    this._name = data.name;
    this._link = data.link;
    this._templateSelector = templateSelector;
    this._hundleCardClick = hundleCardClick;
  }

  _getTemplate() {
    const cardElement = document.querySelector(this._templateSelector)
      .content
      .querySelector('.card')
      .cloneNode(true);
    return cardElement;
  }

  generateCard() {
    this._element = this._getTemplate();
    this._cardPhoto = this._element.querySelector('.card__photo');
    this._cardLike = this._element.querySelector('.card__like');
    this._cardPhoto.src = this._link;
    this._cardPhoto.alt = this._name;
    this._element.querySelector('.card__title').textContent = this._name;
    this._setEventListeners();

    return this._element;
  }

  _setEventListeners() {
    this._cardLike.addEventListener('click', () => {
      this._likeCard();
    });
    this._element.querySelector('.card__delete').addEventListener('click', () => {
      this._deleteCard();
    });
    this._element.querySelector('.card__photo').addEventListener('click', () => {
      this._hundleCardClick(this._name, this._link);
    });
  }
  // Метод лайк
  _likeCard() {
    this._cardLike.classList.toggle('card__like_active');
  }

  _deleteCard() {
    this._element.remove();
  }
  
  // _openBigPhoto() {
  //   openPopup(popupElementView)
  //   imgEditView.src = this._link;
  //   imgEditView.alt = this._name;
  //   titleEditView.textContent = this._name;
  // }
}

