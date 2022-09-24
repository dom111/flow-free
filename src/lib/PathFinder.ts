import { NeighbourDirections, isNeighbour } from './Path';
import Cell from '../components/Cell';
import Grid from '../components/Grid';
import Point from '../components/Point';

type Node = {
  cell: Cell;
  stack: Cell[];
};

const createNode = (cell: Cell, stack: Cell[] = []): Node => ({
  cell,
  stack,
});

export class PathFinder {
  #candidates: Cell[][] = [];
  #cells: Cell[];
  #from: Cell;
  #grid: Grid;
  #neighbourCache: Map<Cell, Cell[]> = new Map();
  #seen: Cell[] = [];
  #stack: Node[] = [];
  #to: Cell;

  constructor(grid: Grid, from: Cell, to: Cell) {
    this.#from = from;
    this.#grid = grid;
    this.#to = to;

    this.#cells = grid.cells();
    this.#stack.push(createNode(from));
  }

  private generate(): void {
    while (this.#stack.length) {
      const currentNode = this.#stack.shift(),
        { cell } = currentNode;

      if (this.#seen.includes(cell)) {
        continue;
      }

      this.neighboursOf(cell).forEach((neighbourCell) => {
        if (
          neighbourCell instanceof Point &&
          this.#from.colour() !== neighbourCell.colour()
        ) {
          return;
        }

        if (currentNode.stack.includes(neighbourCell)) {
          return;
        }

        const node = createNode(neighbourCell, [...currentNode.stack, cell]);

        if (neighbourCell === this.#to) {
          // Ensure the final `Cell` is included in the stack.
          this.#candidates.push(node.stack.concat([neighbourCell]));

          return;
        }

        this.#stack.push(node);
      });

      this.#seen.push(cell);
    }
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

  isPathAvailable(): boolean {
    if (this.#candidates.length === 0) {
      this.generate();
    }

    return this.#candidates.length > 0;
  }

  private neighboursOf(cell: Cell): Cell[] {
    if (!this.#neighbourCache.has(cell)) {
      this.#neighbourCache.set(
        cell,
        this.#cells.filter(
          (otherCell) => this.isNeighbour(cell, otherCell) !== false
        )
      );
    }

    return this.#neighbourCache.get(cell);
  }

  /**
   * Returns the shortest path from the source to the target.
   */
  shortestPath(): Cell[] {
    if (this.#candidates.length === 0) {
      this.generate();
    }

    const [shortest] = this.#candidates.sort(
      (a: Cell[], b: Cell[]) => a.length - b.length
    );

    return shortest;
  }
}

export default PathFinder;
