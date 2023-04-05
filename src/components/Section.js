export default class Section {
  constructor({ renderer }, containerSelector) {
    this._renderer = renderer;
    this._container = containerSelector;
  }

  renderItems(card) {
    //! Сергей спасибо вам за терпение и подробные подсказки. Видимо слишком устал и не понимал что делаю под конец. Вам огромное спасибо
    card.forEach((cards) => {
      this._renderer(cards);
    });
  }

  addItem(element) {
    this._container.prepend(element);
  }
}
