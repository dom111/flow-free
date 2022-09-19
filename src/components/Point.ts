import Cell from './Cell';
import Colour from '../lib/Colour';

export class Point extends Cell {
  constructor(index: number, colour: Colour) {
    super(index);

    super.setColour(colour);

    this.attr('data-id', colour.toString());
    this.attr('data-point');
  }

  setColour(colour: number | null) {
    throw new TypeError('Cannot change the colour of a Point');
  }
}

export default Point;
