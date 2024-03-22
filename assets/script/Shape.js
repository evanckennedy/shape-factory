class Shape {
  #name;
  #color;
  
  constructor(name, color) {
    this.#name = name;
    this.#color = color;
  }

  get name() {
    return this.#name;
  }

  get color() {
    return this.#color;
  }

  getInfo() {
    return `${this.#color.toLowerCase()} ${this.#name.toLowerCase()}`;
  }
}

export default Shape;