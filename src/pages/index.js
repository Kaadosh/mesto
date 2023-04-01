import "./index.css";
import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator";
import { initialCards, validateConfig } from "../components/utils/constants.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImage from "../components/PopupWithImage.js";
import Section from "../components/Section.js";
import UserInfo from "../components/UserInfo.js";
import Api from "../components/Api";
import PopupWithConfirm from "../components/PopupWhithConfirm.js";

let userId;
const buttonOpenEditProfilePopup = document.querySelector(".profile__button");
const buttonOpenAddCardPopup = document.querySelector(".profile__add");
const buttonOpenAvatar = document.querySelector(".profile__button-avatar");
const popupEditFormProfile = document.querySelector(".popup__form-profile");
const inputUserName = popupEditFormProfile.querySelector(
  ".popup__field_input_nickname"
);
const inputUserProfession = popupEditFormProfile.querySelector(
  ".popup__field_input_profession"
);
const formAddCard = document.querySelector(".popup__form-cards");
const sectionCards = document.querySelector(".cards");
// ----------------------------------------------------------------------------------------------------------------------------------------------------//
const api = new Api({
  baseUrl: "https://mesto.nomoreparties.co/v1/cohort-62",
  headers: {
    authorization: "3506c88d-b52d-4252-882d-40c36d7fbe63",
    "Content-Type": "application/json",
  },
});
// ----------------------------------------------------------------------------------------------------------------------------------------------------//
const userInfo = new UserInfo(
  ".profile__title",
  ".profile__subtitle",
  ".profile__img"
);
const bigImgOpen = new PopupWithImage(".popup-view");
//----------------------------------------------------------------------------------------------------------------------------------------------------//
Promise.all([api.getUserInfo(), api.getCards])
  .then(([{ name, about, avatar, _id }]) => {
    userInfo.setUserInfo({ name, profession: about });
    userInfo.setUserAvatar({ avatar });
    userId = _id;
    cardSection.renderItems(cardSection.setItems(data[1].reverse()));
  })
  .catch((err) => {
    `Ошибка:${err}`;
  });
// ----------------------------------------------------------------------------------------------------------------------------------------------------//
const popupEditProfile = new PopupWithForm("#popup__profile", {
  callbackSubmitForm: (formData) => {
    popupEditProfile.lodingButton("Сохранение...");
    api
      .editUserInfo(formData)
      .then(() => {
        userInfo.setUserInfo(formData);
        api.editUserInfo(formData);
      })
      .then(() => {
        popupEditProfile.close();
      })
      .catch((err) => {
        console.log(`Ошибка:${err}`);
      });
  },
});
// ----------------------------------------------------------------------------------------------------------------------------------------------------//
function addCard(item) {
  const card = new Card(
    item,
    userId,
    "#cards",
    () => handleCardClick(item.name, item.link),
    () => setLike(item, card),
    () => deleteLike(item, card),
    () => popupConfirm(item._id, card)
  );
  return card.generateCard();
}
//----------------------------------------------------------------------------------------------------------------------------------------------------//
const cardSection = new Section(
  {
    items: api
      .getCards()
      .then((result) => {
        return result.reverse();
      })
      .catch((err) => {
        console.log(err);
      }),
    renderer: (item) => {
      const cardElement = addCard(item);
      cardSection.addItem(cardElement);
    },
  },
  sectionCards
);
cardSection.renderItems();
//----------------------------------------------------------------------------------------------------------------------------------------------------//
const popupWhithConfirm = new PopupWithConfirm("#popup__confirm", {
  callbackSubmitForm: (itemId, card) => {
    popupWhithConfirm.lodingButton("Сохранение...");
    api
      .removeCard(itemId)
      .then(() => {
        card._deleteCard();
        popupWhithConfirm.close();
      })
      .catch((err) => {
        `Ошибка:${err}`;
      })
      .finally(() => {
        popupWhithConfirm.resetButton();
      });
  },
});
popupWhithConfirm.setEventListeners();
//----------------------------------------------------------------------------------------------------------------------------------------------------//
function setLike(item, card) {
  api
    .likeCard(item._id)
    .then((res) => {
      card.likeCount(res);
      card._likeCard();
    })
    .catch((err) => {
      console.log(`Ошибка:${err}`);
    });
}
//----------------------------------------------------------------------------------------------------------------------------------------------------//
function deleteLike(item, card) {
  api
    .unlikeCard(item._id)
    .then((res) => {
      card.likeCount(res);
      card.deleteLike();
    })
    .catch((err) => {
      console.log(`Ошибка:${err}`);
    });
}
//----------------------------------------------------------------------------------------------------------------------------------------------------//
function handleCardClick(name, link) {
  const data = { name: name, link: link };
  bigImgOpen.open(data);
}
//----------------------------------------------------------------------------------------------------------------------------------------------------//
const popupEditAvatar = new PopupWithForm("#popup__add-avatar", {
  callbackSubmitForm: (formData) => {
    popupEditAvatar.lodingButton();
    api
      .editAvatar(formData.link)
      .then((data) => {
        userInfo.setUserAvatar(data);
        popupEditAvatar.close();
      })
      .catch((err) => {
        console.log(`Ошибка:${err}`);
      })
      .finally(() => {
        popupEditAvatar.resetButton();
      });
  },
});
popupEditAvatar.setEventListeners();
//----------------------------------------------------------------------------------------------------------------------------------------------------//
const popupAddCard = new PopupWithForm("#popup__add-card", {
  callbackSubmitForm: (formData) => {
    popupAddCard.lodingButton();
    api
      .postCards(formData)
      .then((data) => {
        cardSection.addItem(addCard(data));
        popupAddCard.close();
      })
      .catch((err) => {
        console.log(`Ошибка:${err}`);
      })
      .finally(() => {
        popupAddCard.resetButton();
      });
  },
});
popupAddCard.setEventListeners();
//----------------------------------------------------------------------------------------------------------------------------------------------------//
const openPopupProfile = () => {
  const user = userInfo.getUserInfo();
  inputUserName.value = user.name;
  inputUserProfession.value = user.profession;
  popupEditProfile.open();
  profileValidation.resetValidation();
};
//----------------------------------------------------------------------------------------------------------------------------------------------------//
const openAddPopup = () => {
  placeValidation.resetValidation();
  popupAddCard.open();
};
//----------------------------------------------------------------------------------------------------------------------------------------------------//
function popupConfirm(itemId, card) {
  popupWhithConfirm.open();
  popupWhithConfirm.setItemConfirm(itemId, card);
}
//----------------------------------------------------------------------------------------------------------------------------------------------------//
const avatarOpenPopup = () => {
  placeValidation.resetValidation();
  popupEditAvatar.open();
};
//----------------------------------------------------------------------------------------------------------------------------------------------------//
buttonOpenAddCardPopup.addEventListener("click", openAddPopup);
buttonOpenEditProfilePopup.addEventListener("click", openPopupProfile);
popupEditProfile.setEventListeners();
bigImgOpen.setEventListeners();
buttonOpenAvatar.addEventListener("click", avatarOpenPopup);
//----------------------------------------------------------------------------------------------------------------------------------------------------//
const profileValidation = new FormValidator(
  validateConfig,
  popupEditFormProfile
);
profileValidation.enableValidation();
//----------------------------------------------------------------------------------------------------------------------------------------------------//
const placeValidation = new FormValidator(validateConfig, formAddCard);
placeValidation.enableValidation();
//----------------------------------------------------------------------------------------------------------------------------------------------------//
