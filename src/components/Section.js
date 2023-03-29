export default class Section {
  constructor({ items, renderer }, containerSelector) {
    this._renderCard = items;
    this._renderer = renderer;
    this._container = containerSelector;
  }

  renderItems() {
    this._renderCard.forEach((items) => {
      this._renderer(items);
    });
  }

  addItem(element) {
    this._container.prepend(element);
  }
}
