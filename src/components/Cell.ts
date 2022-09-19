import Colour, { colourToClassName } from '../lib/Colour';
import Element, { s } from './Element';

export type Connection = 't' | 'r' | 'b' | 'l';

export class Cell extends Element {
  #colour: Colour = Colour.NONE;
  #connections: Connection[] = [];
  #index: number;

  constructor(index: number) {
    super(s('<div class="cell"></div>'));

    this.#index = index;
  }

  colour(): Colour {
    return this.#colour;
  }

  index(): number {
    return this.#index;
  }

  setColour(colour: Colour): void {
    if (this.#colour) {
      this.removeClass(...colourToClassName(this.#colour));
    }

    this.#colour = colour;

    if (!colour) {
      return;
    }

    this.addClass(...colourToClassName(colour));
  }

  addConnection(connection: Connection): void {
    if (this.#connections.includes(connection)) {
      return;
    }

    this.#connections.push(connection);

    this.attr('data-connections', this.#connections.join(' '));
  }

  dropConnection(connection: Connection): void {
    const connectionIndex = this.#connections.indexOf(connection);

    if (connectionIndex === -1) {
      return;
    }

    this.#connections.splice(connectionIndex, 1);

    if (this.#connections.length === 0) {
      this.removeAttr('data-connections');

      return;
    }

    this.attr('data-connections', this.#connections.join(' '));
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
