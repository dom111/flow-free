import Path, { Status } from './Path';
import Cell from '../components/Cell';
import Colour from './Colour';
import Grid from '../components/Grid';

export class PathRepository {
  #grid: Grid;
  #paths: Path[] = [];

  constructor(grid: Grid) {
    this.#grid = grid;
  }

  commit(): void {
    this.getAllByStatus(Status.DRAFT).forEach((path) => {
      this.removeAllByColour(path.colour(), path);

      path.setStatus(path.complete() ? Status.COMPLETE : Status.COMMITTED);
    });
  }

  create(colour: Colour): Path {
    const path = new Path(colour, this.#grid);

    this.#paths.push(path);

    return path;
  }

  getAllByCell(cell: Cell): Path[] {
    return this.#paths.filter((path) => path.includes(cell));
  }

  getAllByColour(colour: Colour): Path[] {
    return this.#paths.filter((path) => path.colour() === colour);
  }

  getAllByStatus(status: Status): Path[] {
    return this.#paths.filter((path) => path.status() === status);
  }

  getIntersectingPaths(path: Path): Path[] {
    return this.#paths.filter((otherPath) => {
      if (otherPath === path) {
        return false;
      }

      return path.intersects(otherPath);
    });
  }

  getOrCreateByColourAndStatus(
    colour: Colour,
    status: Status = Status.DRAFT
  ): Path {
    const existingPaths = this.getAllByColour(colour);

    if (existingPaths.length === 0) {
      return this.create(colour);
    }

    const [existingStatus] = existingPaths.filter(
      (path) => path.status() === status
    );

    if (existingStatus) {
      return existingStatus;
    }

    const path = existingPaths[0].clone();

    this.#paths.push(path);

    return path;
  }

  remove(path: Path): void {
    const pathIndex = this.#paths.indexOf(path);

    if (pathIndex === -1) {
      return;
    }

    this.#paths.splice(pathIndex, 1);
  }

  removeAllByColour(colour: Colour, ...except: Path[]): void {
    this.getAllByColour(colour).forEach((path) => {
      if (except.includes(path)) {
        return;
      }

      this.remove(path);
    });
  }
}

export default PathRepository;
