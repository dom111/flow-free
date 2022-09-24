import Colour, { colourToClassName } from '../lib/Colour';
import Element, { s } from './Element';

export enum Status {
  DEFAULT,
  GOOD,
  INVALID,
}

const statusLookup = {
  [Status.DEFAULT]: 'default',
  [Status.GOOD]: 'good',
  [Status.INVALID]: 'invalid',
};

const statusToClassName = (status: Status): string => statusLookup[status];

export class TouchHighlight extends Element {
  #colour: Colour = Colour.NONE;
  #status: Status = Status.DEFAULT;

  constructor(height: number, width: number) {
    super(s('<div class="touch-highlight"></div>'));

    this.element().style.setProperty('--height', height.toString());
    this.element().style.setProperty('--width', width.toString());
  }

  private getTopLeftFromEvent(
    event: TouchEvent | MouseEvent | PointerEvent
  ): [number, number] {
    if (event instanceof TouchEvent) {
      return [
        event.touches[0].pageX -
          Math.sqrt(
            event.touches[0].radiusX ** 2 + event.touches[0].radiusY ** 2
          ),
        event.touches[0].pageY -
          Math.sqrt(
            event.touches[0].radiusX ** 2 + event.touches[0].radiusY ** 2
          ),
      ];
    }

    return [event.pageX, event.pageY];
  }

  move(event: TouchEvent | MouseEvent): void {
    const [left, top] = this.getTopLeftFromEvent(event);

    this.element().style.left = left + 'px';
    this.element().style.top = top + 'px';
  }

  setColour(colour: Colour): void {
    if (this.#colour !== Colour.NONE) {
      this.removeClass(...colourToClassName(this.#colour));
    }

    this.#colour = colour;

    if (colour === Colour.NONE) {
      return;
    }

    this.addClass(...colourToClassName(colour));
  }

  setStatus(status: Status): void {
    this.removeClass(statusToClassName(this.#status));

    this.#status = status;

    this.addClass(statusToClassName(status));
  }
}

export default TouchHighlight;
