const popupElement = document.querySelector('.popup');
const popupCloseElement = popupElement.querySelector('.popup__close');
const popupEditorElement = document.querySelector('.profile__button');
let formElement = document.querySelector('.popup__form');
let nameInput = formElement.querySelector('.popup__field_input_nickname');
let jobInput = formElement.querySelector('.popup__field_input_profession');

let personName = document.querySelector('.profile__title');
let personJob = document.querySelector('.profile__subtitle');



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
  togglePopupVisabillity()
}
popupEditorElement.addEventListener('click', function () {
  nameInput.value = personName.textContent;
  jobInput.value = personJob.textContent;
  togglePopupVisabillity()
});
popupCloseElement.addEventListener('click', togglePopupVisabillity);
popupElement.addEventListener('click', closePopupByOnOverley);
formElement.addEventListener('submit', handleFormSubmit);




