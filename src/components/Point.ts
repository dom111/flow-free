import Cell from './Cell';
import Colour from '../lib/Colour';

export class Point extends Cell {
  constructor(index: number, colour: Colour) {
    super(index);

    super.setColour(colour);

    this.addClass('point');
  }

  setColour(colour: Colour): never {
    throw new TypeError('Cannot change the colour of a Point');
  }
}

export default Point;
