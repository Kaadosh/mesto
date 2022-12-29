const popupElement = document.querySelector('.popup');
const popupCloseElement = popupElement.querySelector('.popup__close');
const popupOpenElement = document.querySelector('.profile__button');
const popupClose = document.querySelector('.popup__button');


const togglePopupVisabillity = function (event) {
  popupElement.classList.toggle('popup_opened')
}

const closePopupByOnOverley = function (event) {
  if (event.target === event.currentTarget) {
    togglePopupVisabillity();
  }
}

popupOpenElement.addEventListener('click', togglePopupVisabillity);
popupCloseElement.addEventListener('click', togglePopupVisabillity);
popupElement.addEventListener('click', closePopupByOnOverley);
popupClose.addEventListener('click', togglePopupVisabillity);




let formElement = document.querySelector('.popup__container');
let nameInput = formElement.querySelector('.popup__text');
let jobInput = formElement.querySelector('.popup__job');

let personName = document.querySelector('.profile__title');
let personJob = document.querySelector('.profile__subtitle');

function handleFormSubmit(evt) {
  evt.preventDefault();
  personName.textContent = nameInput.value;
  personJob.textContent = jobInput.value;
}



formElement.addEventListener('submit', handleFormSubmit);

popupElement.classList.remove('popup__button');


