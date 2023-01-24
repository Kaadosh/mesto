// popups
const popupProfile = document.querySelector('.popup_profile');
const popupCards = document.querySelector('.popup_addCard');

// откытие попапов
const popupOpenProfile = document.querySelector('.profile__button');
const popupOpenCards = document.querySelector('.profile__add');

// закрытие попапов
const popupCloseProfile = popupProfile.querySelector('.popup_closeProfile');
const popupCloseCards = popupCards.querySelector('.popup_closeCard');

// форма редоктирования профайла
let popupFormProfile = document.querySelector('.popup_formProfile');
let formNickName = popupFormProfile.querySelector('.popup__field_input_nickname');
let formProfession = popupFormProfile.querySelector('.popup__field_input_profession');
let nameProfile = document.querySelector('.profile__title');
let professionProfile = document.querySelector('.profile__subtitle');

// форма редоктирования карт
const popupFormCards = document.querySelector('.popup_formCards');
const formNameCards = popupFormCards.querySelector('.popup__field_input_namecard');
const formImgCards = popupFormCards.querySelector('.popup__field_input_imagecard');

// template 
const templateCards = document.querySelector('#cards').content;
const cards = document.querySelector('.cards');
const card = templateCards.querySelector('.card');



// общая функция на открытие и закрытие попапов
const togglePopupVisabillity = function (element) {
  element.classList.toggle('popup_opened')
};

// слушатель на открытие popupProfile
popupOpenProfile.addEventListener('click', function () {
  togglePopupVisabillity(popupProfile)

});
// слушатель на открытие popupCards
popupOpenCards.addEventListener('click', function () {
  togglePopupVisabillity(popupCards)
});

// слушатель на закрытие popupCloseProfile
popupCloseProfile.addEventListener('click', function () {
  togglePopupVisabillity(popupProfile)
});
// слушатель на закрытие popupCloseCards
popupCloseCards.addEventListener('click', function () {
  togglePopupVisabillity(popupCards)
});

// Возврат значение формы в профиль
function handleFormSubmit(evt) {
  evt.preventDefault()
  nameProfile.textContent = formNickName.value;
  professionProfile.textContent = formProfession.value;
  togglePopupVisabillity(popupProfile)
};
// Возврат значение формы в профиль
popupOpenProfile.addEventListener('click', function () {
  formNickName.value = nameProfile.textContent;
  formProfession.value = professionProfile.textContent;
});
// слушатель на форму профиля
popupProfile.addEventListener('submit', handleFormSubmit);

const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];



// ! добавление карточек через templete
function createCard(name, link, alt) {
  const elementCard = templateCards.cloneNode(true);
  const cardImg = elementCard.querySelector('.card__photo');
  const cardTitle = elementCard.querySelector('.card__title');

  cardImg.src = link;
  cardImg.alt = alt;
  cardTitle.textContent = name;

  return elementCard;
}
// ! перебор массива для добовление карточек из обьекта
initialCards.forEach(function (item) {
  const newCard = createCard(item.name, item.link, item.name)
  cards.prepend(newCard);
});

//  поключение формы для карточек 
// ? Не работает отбражение картинки
function handleCardSubmit(evt) {
  evt.preventDefault()
  const renderCard = createCard(formImgCards.value, formNameCards.value, formNameCards.value)
  cards.prepend(renderCard);
  togglePopupVisabillity(popupCards);

};

popupCards.addEventListener('submit', handleCardSubmit);
