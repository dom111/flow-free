import Element, { h } from './Element';

export type Connection = 't' | 'r' | 'b' | 'l';

export class Cell extends Element {
  #colour: number | null = null;
  #connections: Connection[] = [];
  #index: number;

  constructor(index: number) {
    super(h('.cell'));

    this.#index = index;

    this.attr('data-i', index.toString());
  }

  colour(): number | null {
    return this.#colour;
  }

  index(): number {
    return this.#index;
  }

  setColour(colour: number | null): void {
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
