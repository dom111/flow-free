import Element, { s } from './Element';
import Path, { Status } from '../lib/Path';
import Cell from './Cell';
import Colour from '../lib/Colour';
import PathFinder from '../lib/PathFinder';
import Point from './Point';
import TouchHighlight, { Status as HighlightStatus } from './TouchHighlight';

export class Grid extends Element {
  #cellMap: Map<HTMLElement, Cell> = new Map();
  #currentPath: Path | null = null;
  #paths: Map<number, Path> = new Map();
  #height: number;
  #touchHighlight: TouchHighlight;
  #width: number;

  constructor(
    height: number,
    width: number,
    cells: Cell[],
    touchHighlight: TouchHighlight
  ) {
    super(s('<div class="grid"></div>'));

    this.setSize(height, width);

    cells.forEach((cell) => {
      this.#cellMap.set(cell.element(), cell);

      this.append(cell);
    });

    this.#touchHighlight = touchHighlight;

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
        existingPath.complete() &&
        existingPath.last() === cell
      ) {
        this.#currentPath = existingPath;

        existingPath.setStatus(Status.DRAFT);

        existingPath.clear();

        existingPath.push(cell);

        this.#touchHighlight.setColour(existingPath.colour());

        return;
      }

      if (existingPath && existingPath.last() !== cell) {
        this.#currentPath = existingPath;

        existingPath.setStatus(Status.DRAFT);

        existingPath.breakAt(cell);

        this.#touchHighlight.setColour(existingPath.colour());

        return;
      }

      if (existingPath && existingPath.last() === cell) {
        this.#currentPath = existingPath;

        existingPath.setStatus(Status.DRAFT);

        this.#touchHighlight.setColour(existingPath.colour());

        return;
      }

      if (!(cell instanceof Point)) {
        return;
      }

      const path = new Path(cell.colour(), this);

      this.#currentPath = path;

      this.#touchHighlight.setColour(path.colour());

      path.push(cell);
      this.#paths.set(path.colour(), path);
    });

    this.on('pointermove', (event) =>
      this.handleHighlight(event, this.cellFromEvent(event))
    );

    this.on('touchmove', (event) => {
      event.preventDefault();

      const cell = this.cellFromEvent(event),
        currentPath = this.#currentPath;

      this.handleHighlight(event, cell);

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
    });

    this.on(
      'pointerenter',
      (event) => {
        if (!event.isPrimary) {
          return;
        }

        event.preventDefault();

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
      },
      {
        capture: true,
      }
    );

    this.on('pointerup', (event) => {
      if (this.#currentPath === null) {
        return;
      }

      event.preventDefault();

      // TODO: break crossed paths
      this.#currentPath.setStatus(Status.FINAL);

      if (this.#currentPath.length() < 2) {
        this.#currentPath.clear();

        this.#paths.delete(this.#currentPath.colour());
      }

      this.#currentPath = null;

      this.#touchHighlight.setColour(Colour.NONE);
    });
  }

  cells(): Cell[] {
    return Array.from(this.#cellMap.values());
  }

  private cellFromEvent(event: PointerEvent | TouchEvent): Cell | null {
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
    const otherPath = this.pathFromCell(cell, this.#currentPath),
      currentPath = this.#currentPath;

    if (otherPath && otherPath !== currentPath && !(cell instanceof Point)) {
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

  private handleHighlight(
    event: TouchEvent | PointerEvent | MouseEvent,
    cell: Cell
  ): void {
    this.#touchHighlight.move(event);

    if (
      cell instanceof Point &&
      this.#currentPath?.length() > 1 &&
      this.#currentPath?.first() !== cell
    ) {
      this.#touchHighlight.setStatus(HighlightStatus.GOOD);
    }

    if (
      cell instanceof Point &&
      cell.colour() !== this.#currentPath?.colour()
    ) {
      this.#touchHighlight.setStatus(HighlightStatus.INVALID);
    }

    if (!(cell instanceof Point)) {
      this.#touchHighlight.setStatus(HighlightStatus.DEFAULT);
    }
  }

  height(): number {
    return this.#height;
  }

  private pathFromCell(
    cell: Cell,
    currentPath: Path | null = null
  ): Path | null {
    let path = null;

    this.#paths.forEach((existingPath) => {
      if (path) {
        return;
      }

      if (existingPath.includes(cell)) {
        path = existingPath;
      }
    });

    if (
      path === null &&
      cell instanceof Point &&
      this.#paths.has(cell.colour())
    ) {
      path = this.#paths.get(cell.colour());

      if (path !== currentPath && !path.canAdd(cell)) {
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
