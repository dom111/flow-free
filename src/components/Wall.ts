import Cell from './Cell';

export class Wall extends Cell {
  constructor(index: number) {
    super(index);

    this.addClass('wall');
  }
}

export default Wall;
