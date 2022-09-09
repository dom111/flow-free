import Element, { h } from './Element';
import Path, { Status } from '../lib/Path';
import Cell from './Cell';
import PathFinder from '../lib/PathFinder';
import { throttle } from 'throttle-debounce';

export class Grid extends Element {
  #cellMap: Map<HTMLElement, Cell> = new Map();
  #currentPath: Path | null = null;
  #paths: Map<number, Path> = new Map();
  #height: number;
  #width: number;

  private constructor(height: number, width: number, cells: Cell[] = []) {
    super(h('.grid'));

    const area = height * width;

    if (cells.length < area) {
      cells.push(...new Array(area - cells.length).fill(null));
    }

    const size = Math.sqrt(cells.length);

    if (size !== Math.floor(size)) {
      throw new TypeError('Invalid cell data');
    }

    this.setSize(height, width);

    cells.forEach((cell) => {
      this.#cellMap.set(cell.element(), cell);

      this.append(cell);
    });

    this.bindEvents();
  }

  static loadFromString(
    height: number,
    width: number,
    gridDefinition: string
  ): Grid {
    const matches = gridDefinition.match(/\d+|[a-z]/gi);

    if (matches === null) {
      throw new TypeError('Invalid grid definition');
    }

    const data = matches.flatMap((value: string): number | number[] => {
      if (/^\d+$/.test(value)) {
        return new Array(parseInt(value)).fill(null);
      }

      return parseInt(value, 36) - 9;
    });

    return new Grid(
      height,
      width,
      data.map((point: number, index: number) => new Cell(index, point))
    );
  }

  private bindEvents(): void {
    this.onEach(['touchstart', 'mousedown'], (event) => {
      if (event instanceof MouseEvent && event.buttons !== 1) {
        return;
      }

      event.preventDefault();

      const cell = this.cellFromEvent(event);

      if (cell === null) {
        return;
      }

      const existingPath = this.pathFromCell(cell);

      if (
        existingPath &&
        existingPath.complete() &&
        existingPath.last() === cell
      ) {
        this.#currentPath = existingPath;

        existingPath.setStatus(Status.DRAFT);

        existingPath.clear();

        existingPath.push(cell);

        return;
      }

      if (existingPath && existingPath.last() !== cell) {
        this.#currentPath = existingPath;

        existingPath.setStatus(Status.DRAFT);

        existingPath.breakAt(cell);

        return;
      }

      if (existingPath && existingPath.last() === cell) {
        this.#currentPath = existingPath;

        existingPath.setStatus(Status.DRAFT);

        return;
      }

      if (!cell.point()) {
        return;
      }

      const path = new Path(cell.colour(), this);

      this.#currentPath = path;
      this.#paths.set(path.colour(), path);
    });

    this.onEach(
      ['touchmove', 'mousemove'],
      throttle(1000 / 60, (event) => {
        if (event instanceof MouseEvent && !event.buttons) {
          return;
        }

        const cell = this.cellFromEvent(event),
          currentPath = this.#currentPath;

        if (
          cell === null ||
          currentPath === null ||
          (currentPath &&
            currentPath.status() === Status.COMPLETE &&
            !currentPath.includes(cell)) ||
          currentPath.last() === cell
        ) {
          return;
        }

        this.handleAddCellToCurrentPath(cell);
      })
    );

    this.onEach(['touchend', 'mouseup'], () => {
      if (this.#currentPath === null) {
        return;
      }

      // TODO: break crossed paths
      this.#currentPath.setStatus(Status.FINAL);

      if (this.#currentPath.length() < 2) {
        this.#currentPath.clear();

        this.#paths.delete(this.#currentPath.colour());
      }

      this.#currentPath = null;
    });
  }

  cells(): Cell[] {
    return Array.from(this.#cellMap.values());
  }

  private cellFromEvent(event: MouseEvent | TouchEvent): Cell | null {
    if (event instanceof MouseEvent) {
      return (
        this.#cellMap.get(
          (event.relatedTarget as HTMLElement) || (event.target as HTMLElement)
        ) ?? null
      );
    }

    return (
      this.#cellMap.get(
        document.elementFromPoint(
          event.touches[0].pageX,
          event.touches[0].pageY
        ) as HTMLElement
      ) ?? null
    );
  }

  private handleAddCellToCurrentPath(cell: Cell): void {
    const otherPath = this.pathFromCell(cell),
      currentPath = this.#currentPath;

    if (otherPath && otherPath !== currentPath && !cell.point()) {
      otherPath.breakAt(cell);
      otherPath.pop();
    }

    if (currentPath.includes(cell) && currentPath.last() !== cell) {
      currentPath.breakAt(cell);
    }

    if (currentPath.canAdd(cell)) {
      currentPath.push(cell);

      return;
    }

    const pathFinder = new PathFinder(this, currentPath.last(), cell);

    if (pathFinder.isPathAvailable()) {
      pathFinder
        .shortestPath()
        .forEach((cell) => this.handleAddCellToCurrentPath(cell));
    }
  }

  height(): number {
    return this.#height;
  }

  private pathFromCell(cell: Cell): Path | null {
    let path = null;

    this.#paths.forEach((existingPath) => {
      if (path) {
        return;
      }

      if (existingPath.includes(cell)) {
        path = existingPath;
      }
    });

    if (path === null && cell.point() && this.#paths.has(cell.colour())) {
      path = this.#paths.get(cell.colour());

      if (!path.canAdd(cell)) {
        path.clear();
      }
    }

    return path;
  }

  private setSize(height: number, width: number): void {
    this.#height = height;
    this.#width = width;

    this.element().style.setProperty('--height', height.toString());
    this.element().style.setProperty('--width', width.toString());
  }

  width(): number {
    return this.#width;
  }
}

export default Grid;
