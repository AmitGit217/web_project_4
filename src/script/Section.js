export class Section {
  constructor({ data, renderer }, selectedContainer) {
    this._items = data;
    this._renderer = renderer;
    this._container = selectedContainer;
  }
  renderItems() {
    this._items.forEach((element) => {
      this._renderer(element);
    });
  }

  setItem(element) {
    this._container.append(element);
  }
}
