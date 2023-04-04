export default class Card {
  constructor(
    data,
    userId,
    templateSelector,
    hundleCardClick,
    putLike,
    deleteLike,
    confirm
  ) {
    this._name = data.name;
    this._link = data.link;
    this._counterLikes = data.likes;
    this._templateSelector = templateSelector;
    this._hundleCardClick = hundleCardClick;
    this._cardId = data._id;
    this._userId = userId;
    this._ownerId = data.owner._id;
    this._putlike = putLike;
    this._deleteLike = deleteLike;
    this._confirm = confirm;
  }

  _getTemplate() {
    const cardElement = document
      .querySelector(this._templateSelector)
      .content.querySelector(".card")
      .cloneNode(true);
    return cardElement;
  }

  generateCard() {
    this._element = this._getTemplate();
    this._cardPhoto = this._element.querySelector(".card__photo");
    this._cardLike = this._element.querySelector(".card__like");
    this._numberLike = this._element.querySelector(".card__counter");
    this._deleteBtn = this._element.querySelector(".card__delete");
    this._cardPhoto.src = this._link;
    this._cardPhoto.alt = this._name;
    this._element.querySelector(".card__title").textContent = this._name;
    this._counter = this._counterLikes.length;
    this._numberLike.textContent = this._counterLikes.length;

    this._setEventListeners();

    if (this._ownerId === this._userId) {
      this._deleteBtn.addEventListener("click", () => {
        this._confirm();
      });
    } else {
      this._deleteBtn.remove();
    }

    if (this._counterLikes.find((element) => this._userId === element._id)) {
      this.likeActive();
    } else {
      this.deleteLike();
    }
    return this._element;
  }

  likeActive() {
    this._cardLike.classList.add("card__like_active");
  }

  deleteLike() {
    this._cardLike.classList.remove("card__like_active");
  }

  likeCount(res) {
    this._numberLike.textContent = `${res.likes.length}`;
  }

  deleteCard() {
    this._element.remove();
  }

  _setEventListeners() {
    this._cardLike.addEventListener("click", () => {
      if (this._cardLike.classList.contains("card__like_active")) {
        this._deleteLike();
      } else {
        this._putlike();
      }
    });
    this._element
      .querySelector(".card__photo")
      .addEventListener("click", () => {
        this._hundleCardClick();
      });
  }
}
