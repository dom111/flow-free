import Cell, { Connection } from '../components/Cell';
import Colour from './Colour';
import Grid from '../components/Grid';
import Point from '../components/Point';

export type NeighbourDirections = 't' | 'r' | 'b' | 'l';

export const isNeighbour = (
  cell: Cell,
  otherCell: Cell,
  height: number,
  width: number
): NeighbourDirections | false => {
  const x = (cell.index() % width) - (otherCell.index() % width),
    y =
      Math.floor(cell.index() / width) - Math.floor(otherCell.index() / width);

  if (x === -1 && y === 0) {
    return 'l';
  }

  if (x === 1 && y === 0) {
    return 'r';
  }

  if (x === 0 && y === -1) {
    return 't';
  }

  if (x === 0 && y === 1) {
    return 'b';
  }

  return false;
};

export enum Status {
  DRAFT,
  FINAL,
  COMPLETE,
}

export class Path {
  #cells: Cell[] = [];
  #colour: Colour;
  #grid: Grid;
  #status: Status = Status.DRAFT;

  constructor(colour: Colour, grid: Grid) {
    this.#colour = colour;
    this.#grid = grid;
  }

  breakAt(cell: Cell): void {
    if (!this.includes(cell)) {
      return;
    }

    const breakIndex = this.#cells.indexOf(cell),
      startChain = this.#cells.slice(0, breakIndex),
      endChain = this.#cells.slice(breakIndex);

    if (
      endChain.length > startChain.length &&
      this.first() instanceof Point &&
      this.last() instanceof Point
    ) {
      this.#cells.reverse();
    }

    while (this.last() !== cell) {
      this.pop();
    }
  }

  canAdd(cell: Cell): boolean {
    const last = this.last();

    if (last === null) {
      return cell instanceof Point;
    }

    if (this.complete()) {
      return false;
    }

    return (
      this.isNeighbour(last, cell) &&
      (!(cell instanceof Point) || cell.colour() === this.colour())
    );
  }

  clear(): void {
    while (this.last()) {
      this.pop();
    }
  }

  colour(): Colour {
    return this.#colour;
  }

  complete(): boolean {
    const first = this.first(),
      last = this.last();

    return (
      this.length() > 1 &&
      first &&
      last &&
      first !== last &&
      first instanceof Point &&
      last instanceof Point
    );
  }

  first(): Cell | null {
    if (this.length() === 0) {
      return null;
    }

    return this.#cells[0];
  }

  includes(cell: Cell): boolean {
    return this.#cells.includes(cell);
  }

  private isNeighbour(
    cell: Cell,
    otherCell: Cell
  ): NeighbourDirections | false {
    return isNeighbour(
      cell,
      otherCell,
      this.#grid.height(),
      this.#grid.width()
    );
  }

  last(): Cell | null {
    if (this.length() === 0) {
      return null;
    }

    return this.#cells[this.length() - 1];
  }

  length(): number {
    return this.#cells.length;
  }

  pop(): void {
    if (this.length() === 0) {
      return;
    }

    const wasComplete = this.complete(),
      cell = this.#cells.pop(),
      last = this.last();

    if (!(cell instanceof Point)) {
      cell.setColour(Colour.NONE);
    }

    cell.setFinal(false);

    if (last) {
      last.dropConnection(this.isNeighbour(cell, last) as Connection);
      cell.dropConnection(this.isNeighbour(last, cell) as Connection);
    }

    if (wasComplete) {
      cell.setFinal(false);
      this.#cells.forEach((cell) => cell.setFinal(false));
      this.setStatus(Status.DRAFT);
    }
  }

  push(cell: Cell): void {
    const last = this.last();

    if (last && !this.canAdd(cell)) {
      return;
    }

    this.#cells.push(cell);

    if (!(cell instanceof Point)) {
      cell.setColour(this.#colour);
    }

    if (last) {
      last.addConnection(this.isNeighbour(cell, last) as Connection);
      cell.addConnection(this.isNeighbour(last, cell) as Connection);
    }
  }

  setStatus(status: Status): void {
    if (this.#status === Status.COMPLETE && status === Status.FINAL) {
      return;
    }

    this.#status = status;

    if (status === Status.DRAFT) {
      this.#cells.forEach((cell) => cell.setFinal(false));

      return;
    }

    this.#cells.forEach((cell) => cell.setFinal(true));
  }

  status(): Status {
    return this.#status;
  }
}

export default Path;
