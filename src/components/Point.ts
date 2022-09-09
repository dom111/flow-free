import Cell from './Cell';

export class Point extends Cell {
  constructor(index: number, point: number) {
    super(index);

    super.setColour(point);

    this.attr('data-id', point.toString());
    this.attr('data-point');
  }

  setColour(colour: number | null) {
    throw new TypeError('Cannot change the colour of a Point');
  }
}

export default Point;
