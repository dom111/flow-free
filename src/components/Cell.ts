import Element, { h } from './Element';
import Colour, { allColourClasses, colourToClassName } from '../lib/Colour';

export type Connection = 't' | 'r' | 'b' | 'l';

export class Cell extends Element {
  #colour: Colour = null;
  #connections: Connection[] = [];
  #index: number;

  constructor(index: number) {
    super(h('.cell'));

    this.#index = index;

    this.attr('data-i', index.toString());
  }

  colour(): Colour | null {
    return this.#colour;
  }

  index(): number {
    return this.#index;
  }

  setColour(colour: Colour | null): void {
    this.#colour = colour;

    this.removeClass(...allColourClasses);

    if (colour === null) {
      return;
    }

    this.addClass(...colourToClassName(colour));
  }

  addConnection(connection: Connection): void {
    if (this.#connections.includes(connection)) {
      return;
    }

    this.#connections.push(connection);

    this.attr('data-' + connection);
  }

  clearConnections(): void {
    this.#connections
      .splice(0, this.#connections.length)
      .forEach((connection) => this.removeAttr('data-' + connection));
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
