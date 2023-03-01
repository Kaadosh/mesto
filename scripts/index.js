import Cards from './Cards.js'
import FormValidate from './FormValidate.js';
import { initialCards, validateConfig } from './constants.js'
// popups
const formEditProfile = document.querySelector('#popup__profile');
const popupElementCards = document.querySelector('#popup__add-card');
const popupElementView = document.querySelector('#popup__view');
const popupForm = document.querySelector('.popup__form');
// откытие попапов
const buttonOpenEditProfilePopup = document.querySelector('.profile__button');
const buttonOpenAddCardPopup = document.querySelector('.profile__add');

// закрытие попапов
const buttonCloseEditProfilePopup = formEditProfile.querySelector('.popup__close-profile');
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

const validFormProfil = validationForm(popupForm)
const validFormAdd = validationForm(formAddCard)
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
  openPopup(formEditProfile)

});
// слушатель на открытие popupCards
buttonOpenAddCardPopup.addEventListener('click', function () {
  openPopup(popupElementCards)
});

// слушатель на закрытие buttonCloseEditProfilePopup
buttonCloseEditProfilePopup.addEventListener('click', function () {
  closePopup(formEditProfile)
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
  closePopup(formEditProfile)
};

// слушатель на форму профиля
formEditProfile.addEventListener('submit', submitEditProfileForm);

// слушатель на Overlay
document.addEventListener('click', closeByClickOverlay);

function createCard(data,) {
  const cards = new Cards(data, '#cards');
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
  evt.target.reset();
  closePopup(popupElementCards);
  formAddCard.reset();
}

function validationForm(element) {
  const formValid = new FormValidate(validateConfig, element);
  formValid.enableValidation();
  return formValid;
}

function resetValidationForm(element) {
  const validReset = new FormValidate(validateConfig, element);
  validReset.resetValidation();
  return validReset;

}

function sendValid(event) {
  event.preventDefault();
  const testValid = resetValidationForm(formAddCard)
  const valid = {
    name: inputCardName.value,
    link: inputCardLink.value
  }
  renderCard(valid);
  closePopup(popupElementCards);
}


formAddCard.addEventListener('submit', submitFormCardHandler);


export { openPopup, imgEditView, titleEditView, popupElementView }

// function openViewCard(item) {
//   openPopup(popupElementView)
//   imgEditView.src = item.link;
//   imgEditView.alt = item.name;
//   titleEditView.textContent = item.name;
// }

// // ! Реализация функции лайка
// function likeCard(button) {
//   button.classList.toggle('card__like_active');
// };

// // ! Реализация функции удаления
// function deleteCard(btn) {
//   const cardFindElement = btn.closest('.card');
//   cardFindElement.remove();
// };


// //  ! создание карт
// const createCard = (item) => {
//   const elementCard = templateCards.cloneNode(true);
//   const cardTemplateImg = elementCard.querySelector('.card__photo');
//   const cardTempleteTitle = elementCard.querySelector('.card__title');
//   const cardTempleteLike = elementCard.querySelector('.card__like');
//   const buttonDeleteCard = elementCard.querySelector('.card__delete');
//   cardTemplateImg.src = item.link;
//   cardTemplateImg.alt = item.name;
//   cardTempleteTitle.textContent = item.name;

//   cardTempleteLike.addEventListener('click', () => likeCard(cardTempleteLike));
//   buttonDeleteCard.addEventListener('click', () => deleteCard(buttonDeleteCard));
//   cardTemplateImg.addEventListener('click', () => openViewCard(item));

//   return elementCard;
// };




// const buttonDisabled = (evt) => {
//   evt.classList.add("popup__button_inactive");
//   evt.setAttribute("disabled", "");
// }

// const submitFormCardHandler = (evt) => {
//   evt.preventDefault();
//   const newCard = { name: inputCardName.value, link: inputCardLink.value, };
//   sectionCards.prepend(createCard(newCard));

// formAddCard.reset()
// closePopup(popupElementCards);
// // Сброс кнопки после отправки формы
// buttonDisabled(buttonPopup);

// enableValidation(newCard); // не получается сбросить форму функцией toggleButtonState 
// };




