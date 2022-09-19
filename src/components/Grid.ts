import Element, { h, on } from './Element';
import Path, { Status } from '../lib/Path';
import Cell from './Cell';
import Colour from '../lib/Colour';
import PathFinder from '../lib/PathFinder';
import Point from './Point';
import PathRepository from '../lib/PathRepository';

export class Grid extends Element {
  #cellMap: Map<HTMLElement, Cell> = new Map();
  #colours: Colour[] = [];
  #currentPath: Path | null = null;
  #paths: PathRepository;
  #height: number;
  #width: number;

  constructor(height: number, width: number, cells: Cell[] = []) {
    super(h('.grid'));

    this.#paths = new PathRepository(this);

    this.setSize(height, width);

    cells.forEach((cell) => {
      this.#cellMap.set(cell.element(), cell);

      if (cell instanceof Point && !this.#colours.includes(cell.colour())) {
        this.#colours.push(cell.colour());
      }

      this.append(cell);
    });

    this.bindEvents();
  }

  private bindEvents(): void {
    this.on('pointerdown', (event) => {
      if (!event.isPrimary) {
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
        cell instanceof Point &&
        (existingPath.last() === cell || existingPath.first() === cell)
      ) {
        existingPath.clear();
        existingPath.push(cell);
      }

      if (existingPath && existingPath.last() !== cell) {
        existingPath.breakAt(cell);
      }

      if (existingPath) {
        this.#currentPath = existingPath;

        existingPath.setStatus(Status.DRAFT);

        return;
      }

      if (!(cell instanceof Point)) {
        return;
      }

      const path = this.#paths.getOrCreateByColourAndStatus(cell.colour());

      path.clear();

      this.#currentPath = path;

      path.push(cell);
    });

    this.on(
      'pointerenter',
      (event) => {
        if (!event.isPrimary) {
          return;
        }

        const cell = this.cellFromEvent(event),
          currentPath = this.#currentPath;

        if (
          cell === null ||
          currentPath === null ||
          (currentPath.status() === Status.COMPLETE &&
            !currentPath.includes(cell))
        ) {
          return;
        }

        this.handleAddCellToCurrentPath(cell);
      },
      {
        capture: true,
      }
    );

    this.on('pointerup', () => {
      if (this.#currentPath === null) {
        return;
      }

      if (this.#currentPath.length() < 2) {
        this.#currentPath.clear();

        this.#paths.remove(this.#currentPath);
      }

      this.#paths.commit();

      this.#currentPath = null;
    });
  }

  cells(): Cell[] {
    return Array.from(this.#cellMap.values());
  }

  private cellFromEvent(
    event: MouseEvent | PointerEvent | TouchEvent
  ): Cell | null {
    return (
      this.#cellMap.get(
        document.elementFromPoint(
          event instanceof TouchEvent ? event.touches[0].pageX : event.pageX,
          event instanceof TouchEvent ? event.touches[0].pageY : event.pageY
        ) as HTMLElement
      ) ?? null
    );
  }

  private handleAddCellToCurrentPath(cell: Cell): void {
    const currentPath = this.#currentPath,
      otherPath = this.pathFromCell(cell, currentPath);

    // TODO: handle bridge
    // if (cell instanceof Bridge) {
    //   // ...
    // }

    if (otherPath && otherPath !== currentPath && !(cell instanceof Point)) {
      otherPath.breakAt(cell);
      otherPath.pop();
    }

    if (currentPath.includes(cell) && currentPath.last() !== cell) {
      // TODO: check intersecting paths, before and after the move - update display
      currentPath.breakAt(cell);
    }

    if (currentPath.canAdd(cell)) {
      currentPath.push(cell);

      return;
    }

    const last = currentPath.last();

    // TODO: instead of doing this check, this should never happen...
    if (!last) {
      return;
    }

    const pathFinder = new PathFinder(this, last, cell);

    if (pathFinder.isPathAvailable()) {
      pathFinder
        .shortestPath()
        .forEach((cell) => this.handleAddCellToCurrentPath(cell));
    }
  }

  height(): number {
    return this.#height;
  }

  private pathFromCell(
    cell: Cell,
    currentPath: Path | null = null,
    status: Status = Status.DRAFT
  ): Path | null {
    const expectedStatuses: Path[] = [],
      others: Path[] = [];

    this.#paths.getAllByCell(cell).forEach((path) => {
      if (currentPath && path === currentPath) {
        return;
      }

      if (path.status() === status) {
        expectedStatuses.push(path);

        return;
      }

      others.push(path);
    });

    if (expectedStatuses.length === 1) {
      return expectedStatuses[0];
    }

    if (expectedStatuses.length > 1) {
      throw new Error('Logic missing');
    }

    if (others.length === 1) {
      return this.#paths.getOrCreateByColourAndStatus(others[0].colour());
    }

    if (others.length > 1) {
      throw new Error('Logic missing');
    }

    return null;
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
