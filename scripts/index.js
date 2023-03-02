import Card from './Card.js'
import FormValidator from './FormValidator.js';
import { initialCards, validateConfig } from './constants.js'
// popups
const popupEditProfile = document.querySelector('#popup__profile');
const popupElementCards = document.querySelector('#popup__add-card');
const popupElementView = document.querySelector('#popup__view');
// откытие попапов
const buttonOpenEditProfilePopup = document.querySelector('.profile__button');
const buttonOpenAddCardPopup = document.querySelector('.profile__add');

// закрытие попапов
const buttonCloseEditProfilePopup = popupEditProfile.querySelector('.popup__close-profile');
const buttonCloseAddCardPopup = popupElementCards.querySelector('.popup__close-card');
const buttonCloseImagePopup = popupElementView.querySelector('.popup__close-view');
// форма редоктирования профайла
const popupEditFormProfile = document.querySelector('.popup__form-profile');
const inputUserName = popupEditFormProfile.querySelector('.popup__field_input_nickname');
const inputUserProfession = popupEditFormProfile.querySelector('.popup__field_input_profession');
const nameProfile = document.querySelector('.profile__title');
const professionProfile = document.querySelector('.profile__subtitle');

// форма редоктирования карт
const formAddCard = document.querySelector('.popup__form-cards');
const inputCardName = formAddCard.querySelector('.popup__field_input_namecard');
const inputCardLink = formAddCard.querySelector('.popup__field_input_imagecard');
const buttonPopup = document.querySelector('#buttonCard');

// template 
const templateCards = document.querySelector('#cards').content;
const sectionCards = document.querySelector('.cards');

//   попап фото
const imgEditView = popupElementView.querySelector('.popup__photo-view');
const titleEditView = popupElementView.querySelector('.popup__title-view');

const validFormProfil = createFormValidator(popupEditFormProfile)
const validFormAdd = createFormValidator(formAddCard)
//  функция на открытие попапов
const openPopup = function (element) {
  element.classList.add('popup_opened')
  document.addEventListener('keydown', closePopupByEsc);

};
// Закрытие попапа
const closePopup = function (element) {
  element.classList.remove('popup_opened')
  document.removeEventListener('keydown', closePopupByEsc);
};

// слушатель на открытие popupProfile
buttonOpenEditProfilePopup.addEventListener('click', function () {
  inputUserName.value = nameProfile.textContent;
  inputUserProfession.value = professionProfile.textContent;
  openPopup(popupEditProfile)

});
// слушатель на открытие popupCards
buttonOpenAddCardPopup.addEventListener('click', function () {
  openPopup(popupElementCards)
});

// слушатель на закрытие buttonCloseEditProfilePopup
buttonCloseEditProfilePopup.addEventListener('click', function () {
  closePopup(popupEditProfile)
});
// слушатель на закрытие buttonCloseAddCardPopup
buttonCloseAddCardPopup.addEventListener('click', function () {
  closePopup(popupElementCards)
});

buttonCloseImagePopup.addEventListener('click', function () {
  closePopup(popupElementView)
});

// Закрытие по Overlay
const closeByClickOverlay = function (event) {
  if (event.target.classList.contains('popup_opened')) {
    closePopup(event.target);
  }
};

// Закрытие по esc
function closePopupByEsc(evt) {
  if (evt.key === 'Escape') {
    const popup = document.querySelector('.popup_opened');
    closePopup(popup);
  };
};


// Возврат значение формы в профиль
function submitEditProfileForm(evt) {
  evt.preventDefault()
  nameProfile.textContent = inputUserName.value;
  professionProfile.textContent = inputUserProfession.value;
  closePopup(popupEditProfile)
};

// слушатель на форму профиля
popupEditProfile.addEventListener('submit', submitEditProfileForm);

// слушатель на Overlay
document.addEventListener('click', closeByClickOverlay);

function createCard(data,) {
  const cards = new Card(data, '#cards');
  const newCard = cards.generateCard();
  return newCard;
}

const renderCard = (data, container) => {
  container.prepend(createCard(data));
};

initialCards.forEach((item) => {
  renderCard(item, sectionCards);
});

const submitFormCardHandler = (evt) => {
  evt.preventDefault();
  const name = inputCardName.value;
  const link = inputCardLink.value;
  const data = { name, link };
  renderCard(data, sectionCards);
  // evt.target.reset();
  closePopup(popupElementCards);
  formAddCard.reset();
  validFormAdd.resetValidation();
  
}

function createFormValidator(element) {
  const formValid = new FormValidator (validateConfig, element);
  formValid.enableValidation();
  return formValid;
}

formAddCard.addEventListener('submit', submitFormCardHandler);


export { openPopup, imgEditView, titleEditView, popupElementView }

