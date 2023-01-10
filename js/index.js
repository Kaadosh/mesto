const popupElement = document.querySelector('.popup');
const popupCloseElement = popupElement.querySelector('.popup__close');
const popupEditorElement = document.querySelector('.profile__button');
// const popupClose = document.querySelector('.popup__button');
let formElement = document.querySelector('.popup__form');
let nameInput = formElement.querySelector('.popup__field_input_nickname');
let jobInput = formElement.querySelector('.popup__field_input_profession');

let personName = document.querySelector('.profile__title');
let personJob = document.querySelector('.profile__subtitle');
// Варвара здравствуйтеб я не доканца понимаю ваше замечание: по брифу по кнопке "сохранить" popup должен закрываться


const togglePopupVisabillity = function (event) {
  popupElement.classList.toggle('popup_opened')
}

const closePopupByOnOverley = function (event) {
  if (event.target === event.currentTarget) {
    togglePopupVisabillity();
  }
}
function handleFormSubmit(evt) {
  evt.preventDefault();
  personName.textContent = nameInput.value;
  personJob.textContent = jobInput.value;
}

popupEditorElement.addEventListener('click', togglePopupVisabillity);
popupCloseElement.addEventListener('click', togglePopupVisabillity);
popupElement.addEventListener('click', closePopupByOnOverley);
// popupClose.addEventListener('click', togglePopupVisabillity); // Варвара здравствуйте я не доконца понимаю ваше замечание: по брифу по кнопке "сохранить" popup должен закрываться



formElement.addEventListener('submit', handleFormSubmit);

// popupElement.classList.remove('popup__button');


