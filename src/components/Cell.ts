import Element, { h } from './Element';

export type Connection = 't' | 'r' | 'b' | 'l';

export class Cell extends Element {
  #colour: number | null = null;
  #connections: Connection[] = [];
  #index: number;
  #point: boolean;

  constructor(index: number, point: number | null = null) {
    super(h('.cell'));

    this.#colour = point;
    this.#index = index;
    this.#point = point !== null;

    this.attr('data-i', index.toString());

    if (point !== null) {
      this.attr('data-id', point.toString());
      this.attr('data-point');
    }
  }

  colour(): number | null {
    return this.#colour;
  }

  index(): number {
    return this.#index;
  }

  point(): boolean {
    return this.#point;
  }

  setColour(colour: number | null): void {
    if (this.#point) {
      throw new TypeError('Cannot change the colour of a point');
    }

    this.#colour = colour;

    if (colour === null) {
      this.removeAttr('data-id');

      return;
    }

    this.attr('data-id', colour.toString());
  }

  addConnection(connection: Connection): void {
    if (this.#connections.includes(connection)) {
      return;
    }

    this.#connections.push(connection);

    this.attr('data-' + connection);
  }

  dropConnection(connection: Connection): void {
    const connectionIndex = this.#connections.indexOf(connection);

    if (connectionIndex === -1) {
      return;
    }

    this.#connections.splice(connectionIndex, 1);

    this.removeAttr('data-' + connection);
  }

  setFinal(final: boolean) {
    if (final) {
      this.attr('data-final');

      return;
    }

    this.removeAttr('data-final');
  }
}

export default Cell;
