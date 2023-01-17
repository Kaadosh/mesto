const popupElement = document.querySelector('.popup_profile');
const popupCloseElement = popupElement.querySelector('.popup__close');
const popupEditorElement = document.querySelector('.profile__button');
let formElement = document.querySelector('.popup__form');
let nameInput = formElement.querySelector('.popup__field_input_nickname');
let jobInput = formElement.querySelector('.popup__field_input_profession');
const openAddCard = document.querySelector('.popup_addCard');
const closeCard = openAddCard.querySelector('.popup_closeCard');
const buttonAddCard = document.querySelector('.profile__add');
let personName = document.querySelector('.profile__title');
let personJob = document.querySelector('.profile__subtitle');


// Открытие профиля и редоктирование
// const togglePopupVisabillity = function (event) {
//   popupElement.classList.toggle('popup_opened')
// }
// const togglePopupAddCard = function (event) {
//   openAddCard.classList.toggle('popup_opened')
// }
// buttonAddCard.addEventListener('click', function () {
//   togglePopupAddCard()
// });
// !функция открытия профиля
const openPopupProfile = function () {
  popupElement.classList.add('popup_opened');
};
// ! функция закрытия профиля
const closePopupProfile = function () {
  popupElement.classList.remove('popup_opened');
};
// ! функция открытия добовления карт
const openPopupCard = function () {
  openAddCard.classList.add('popup_opened');
};
// ! функция закрытия добовления карт
const closePopupCard = function () {
  openAddCard.classList.remove('popup_opened');
};





// const closePopupByOnOverley = function (event) {
//   if (event.target === event.currentTarget) {
//     togglePopupVisabillity();
//   }
// }
function handleFormSubmit(evt) {
  evt.preventDefault();
  personName.textContent = nameInput.value;
  personJob.textContent = jobInput.value;
  closePopupProfile()
  // togglePopupVisabillity()
}
popupEditorElement.addEventListener('click', function () {
  nameInput.value = personName.textContent;
  jobInput.value = personJob.textContent;

  //   togglePopupVisabillity()
});
buttonAddCard.addEventListener('click', openPopupCard);
closeCard.addEventListener('click', closePopupCard);
popupEditorElement.addEventListener('click', openPopupProfile,);
popupCloseElement.addEventListener('click', closePopupProfile);
// popupCloseElement.addEventListener('click', togglePopupVisabillity);
// popupElement.addEventListener('click', closePopupByOnOverley);
formElement.addEventListener('submit', handleFormSubmit);

// ! Создание карт

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
// ! Добавление карточек через JS по средствам templane
//  Обращение к templane
const templateCards = document.querySelector('#cards').content;
const newCards = document.querySelector('.cards');
// перебор массива с данными карточкаи методом forEach
initialCards.forEach(function (element) {
  const articleCard = templateCards.querySelector('.card').cloneNode(true);
  articleCard.querySelector('.card__photo').src = element.link;
  articleCard.querySelector('.card__photo').alt = element.name;
  articleCard.querySelector('.card__title').textContent = element.name;

  newCards.append(articleCard);
});












