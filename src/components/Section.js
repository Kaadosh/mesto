export default class Section {
  constructor({ items, renderer }, containerSelector) {
    this._renderCard = items; // Сергей данный метод был одобрен в предыдущей работе ревьюером(он его не просмотрел мы работали над этим модулем) если данный код можно оптимизировать пожадуйста отметье это как "можно лучше"
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
