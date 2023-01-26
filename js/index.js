// popups
const popupProfile = document.querySelector('#popup__profile');
const popupCards = document.querySelector('#popup__add-card');
const popupView = document.querySelector('#popup__view');
// откытие попапов
const popupOpenProfile = document.querySelector('.profile__button');
const popupOpenCards = document.querySelector('.profile__add');

// закрытие попапов
const popupCloseProfile = popupProfile.querySelector('.popup__close-profile');
const popupCloseCards = popupCards.querySelector('.popup__close-card');
const popupCloseView = popupView.querySelector('.popup__close-view');
// форма редоктирования профайла
let popupFormProfile = document.querySelector('.popup__form-profile');
let formNickName = popupFormProfile.querySelector('.popup__field_input_nickname');
let formProfession = popupFormProfile.querySelector('.popup__field_input_profession');
let nameProfile = document.querySelector('.profile__title');
let professionProfile = document.querySelector('.profile__subtitle');

// форма редоктирования карт
const popupFormCards = document.querySelector('.popup__form-cards');
const formNameCards = popupFormCards.querySelector('.popup__field_input_namecard');
const formImgCards = popupFormCards.querySelector('.popup__field_input_imagecard');

// template 
const templateCards = document.querySelector('#cards').content;
const cards = document.querySelector('.cards');
const card = templateCards.querySelector('.card');
//   попап фото
const imgView = popupView.querySelector('.popup__photo-view');
const titleView = popupView.querySelector('.popup__title-view');





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

popupCloseView.addEventListener('click', function () {
  togglePopupVisabillity(popupView)
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




function viewCard(item) {
  togglePopupVisabillity(popupView)
  imgView.src = item.link;
  imgView.alt = item.name;
  titleView.textContent = item.name;

}

// ! Реализация функции лайка
function likeCard(button) {
  button.classList.toggle('card__like_active');
};
// ! Реализация функции удаления
function deleteCard(btn) {
  const findCard = btn.closest('.card');
  findCard.remove();
};
//  ! создание карт
const createCard = (item) => {

  const elementCard = templateCards.cloneNode(true);
  const cardImg = elementCard.querySelector('.card__photo');
  let cardTitle = elementCard.querySelector('.card__title');
  const cardLike = elementCard.querySelector('.card__like');
  const buttonDeleteCard = elementCard.querySelector('.card__delete');
  const popupView = document.querySelector('.popup__view');
  cardImg.src = item.link;
  cardImg.alt = item.name;
  cardTitle.textContent = item.name;

  cardLike.addEventListener('click', () => likeCard(cardLike));
  buttonDeleteCard.addEventListener('click', () => deleteCard(buttonDeleteCard));
  cardImg.addEventListener('click', () => viewCard(item));

  return elementCard;
};

// ! Ретендер карт
const renderCard = (item) => {
  const elementCard = createCard
  cards.append(elementCard(item));
};

// ! Перебор массива с отображением карт из обьекта
initialCards.forEach((item) => {
  renderCard(item);
});

// ! работа с формой карт
const formCardHandler = (evt) => {
  evt.preventDefault();
  const newCard = { name: formNameCards.value, link: formImgCards.value, };
  cards.prepend(createCard(newCard));




  formNameCards.value = '';
  formImgCards.value = '';
  togglePopupVisabillity(popupCards);
};



popupFormCards.addEventListener('submit', formCardHandler); 