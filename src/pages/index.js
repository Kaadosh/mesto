import './index.css';
import Card from '../components/Card.js'
import FormValidator from '../components/FormValidator';
import { initialCards, validateConfig } from '../components/constants.js'
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithImage from '../components/PopupWithImage.js';
import Section from '../components/Section.js';
import UserInfo from '../components/UserInfo.js';

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
// const templateCards = document.querySelector('#cards').content;
const sectionCards = document.querySelector('.cards');


const userInfo = new UserInfo({nameSelector: '.profile__title', profileSelector: '.profile__subtitle'});
const bigImgOpen = new PopupWithImage('.popup-view')
const popupEdit = new PopupWithForm('#popup__profile', {
  callbackSubmitForm: (formData) => {
    userInfo.setUserInfo(formData);
    popupEdit.close()
  }
})
const cardSection = new Section({
  items: initialCards,
  renderer: (item) => {
    const cardElement = addCard(item)
    cardSection.addItem(cardElement);
  }
}, sectionCards
);

cardSection.renderItems();

function addCard(item) {
  const card = new Card(item, '#cards', () => handleCardClick(item.place, item.link));
  return card.generateCard();
};


function handleCardClick(place, link) {
  const data = {name: place, link: link}
bigImgOpen.open(data)
};

const popupAddCard = new PopupWithForm('#popup__add-card', {
  callbackSubmitForm: (FormData) => {
    cardSection.renderItem(FormData);
    popupAddCard.close();
  }
});

 const openPopupProfile = () => {
  const user = userInfo.getUserInfo();
inputUserName.value = user.name;
inputUserProfession.value = user.profession;
popupEdit.open();
};

const openAddPopup = () => {
  // placeValidation.reset();
  popupAddCard.open();
}


popupAddCard.setEventListeners();
buttonOpenAddCardPopup.addEventListener('click', openAddPopup);
buttonOpenEditProfilePopup.addEventListener('click', openPopupProfile);
popupEdit.setEventListeners();
bigImgOpen.setEventListeners();

const profileValidation = new FormValidator(validateConfig, popupEditFormProfile);
profileValidation.enableValidation();

const placeValidation = new FormValidator(validateConfig, formAddCard);
placeValidation.enableValidation();

