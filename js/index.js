
// popups
const popupElementProfile = document.querySelector('#popup__profile');
const popupElementCards = document.querySelector('#popup__add-card');
const popupElementView = document.querySelector('#popup__view');
// откытие попапов
const popupOpenProfile = document.querySelector('.profile__button');
const popupOpenCards = document.querySelector('.profile__add');

// закрытие попапов
const popupCloseProfile = popupElementProfile.querySelector('.popup__close-profile');
const popupCloseCards = popupElementCards.querySelector('.popup__close-card');
const popupCloseView = popupElementView.querySelector('.popup__close-view');
// форма редоктирования профайла
const popupEditFormProfile = document.querySelector('.popup__form-profile');
const formEditNickName = popupEditFormProfile.querySelector('.popup__field_input_nickname');
const formEditProfession = popupEditFormProfile.querySelector('.popup__field_input_profession');
const nameProfile = document.querySelector('.profile__title');
const professionProfile = document.querySelector('.profile__subtitle');

// форма редоктирования карт
const popupEditFormCards = document.querySelector('.popup__form-cards');
const formEditNameCards = popupEditFormCards.querySelector('.popup__field_input_namecard');
const formEditImgCards = popupEditFormCards.querySelector('.popup__field_input_imagecard');

// template 
const templateCards = document.querySelector('#cards').content;
const sectionCards = document.querySelector('.cards');

//   попап фото
const imgEditView = popupElementView.querySelector('.popup__photo-view');
const titleEditView = popupElementView.querySelector('.popup__title-view');

// общая функция на открытие и закрытие попапов
const togglePopupVisabillity = function (element) {
  element.classList.toggle('popup_opened')
};

// слушатель на открытие popupProfile
popupOpenProfile.addEventListener('click', function () {
  formEditNickName.value = nameProfile.textContent;
  formEditProfession.value = professionProfile.textContent;
  togglePopupVisabillity(popupElementProfile)

});
// слушатель на открытие popupCards
popupOpenCards.addEventListener('click', function () {
  togglePopupVisabillity(popupElementCards)
});

// слушатель на закрытие popupCloseProfile
popupCloseProfile.addEventListener('click', function () {
  togglePopupVisabillity(popupElementProfile)
});
// слушатель на закрытие popupCloseCards
popupCloseCards.addEventListener('click', function () {
  togglePopupVisabillity(popupElementCards)
});

popupCloseView.addEventListener('click', function () {
  togglePopupVisabillity(popupElementView)
});

// Возврат значение формы в профиль
function handleFormSubmit(evt) {
  evt.preventDefault()
  nameProfile.textContent = formEditNickName.value;
  professionProfile.textContent = formEditProfession.value;
  togglePopupVisabillity(popupElementProfile)
};

// слушатель на форму профиля
popupElementProfile.addEventListener('submit', handleFormSubmit);

function openViewCard(item) {
  togglePopupVisabillity(popupElementView)
  imgEditView.src = item.link;
  imgEditView.alt = item.name;
  titleEditView.textContent = item.name;
}

// ! Реализация функции лайка
function likeCard(button) {
  button.classList.toggle('card__like_active');
};

// ! Реализация функции удаления
function deleteCard(btn) {
  const cardFindElement = btn.closest('.card');
  cardFindElement.remove();
};

//  ! создание карт
const createCard = (item) => {
  const elementCard = templateCards.cloneNode(true);
  const cardTemplateImg = elementCard.querySelector('.card__photo');
  const cardTempleteTitle = elementCard.querySelector('.card__title');
  const cardTempleteLike = elementCard.querySelector('.card__like');
  const buttonDeleteCard = elementCard.querySelector('.card__delete');
  cardTemplateImg.src = item.link;
  cardTemplateImg.alt = item.name;
  cardTempleteTitle.textContent = item.name;

  cardTempleteLike.addEventListener('click', () => likeCard(cardLike));
  buttonDeleteCard.addEventListener('click', () => deleteCard(buttonDeleteCard));
  cardTemplateImg.addEventListener('click', () => openViewCard(item));

  return elementCard;
};

// ! Ретендер карт
const renderCard = (item) => {
  const elementCard = createCard
  sectionCards.append(elementCard(item));
};

// ! работа с формой карт
const formCardHandler = (evt) => {
  evt.preventDefault();
  const newCard = { name: formEditNameCards.value, link: formEditImgCards.value, };
  sectionCards.prepend(createCard(newCard));

  popupEditFormCards.reset()

  togglePopupVisabillity(popupElementCards);
};

popupEditFormCards.addEventListener('submit', formCardHandler); 