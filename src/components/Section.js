export class Section {
  constructor({ renderer }, selectedContainer) {
    this._renderer = renderer;
    this._container = selectedContainer;
  }
  renderItems(data) {
    data.forEach((element) => {
      this._renderer(element);
    });
  }

  setItem(element) {
    this._container.append(element);
  }
  prependItem(element) {
    this._container.prepend(element);
  }
}
