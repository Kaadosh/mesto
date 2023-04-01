export default class Section {
  constructor({ items, renderer }, containerSelector) {
    this._renderCard = items;
    this._renderer = renderer;
    this._container = containerSelector;
  }

  renderItems() {
    this._renderCard.then((result) => {
      result.forEach((item) => {
        this._renderer(item);
      });
    });
  }

  addItem(element) {
    this._container.prepend(element);
  }
}
