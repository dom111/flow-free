export class LevelGenerator {
  #flows: number;
  #height: number;
  #width: number;

  constructor(height: number, width: number, flows: number) {
    this.#flows = flows;
    this.#height = height;
    this.#width = width;
  }

  generate(): number[] {
    const data = new Array(this.#height * this.#width).fill(null);
    const available = Object.keys(data);

    const points = new Array(this.#flows)
      .fill(null)
      .flatMap((_, index) => [index + 1, index + 1]);

    points.forEach((point) => {
      const randomKey = available[Math.floor(available.length * Math.random())];

      data[randomKey] = point;

      const index = available.indexOf(randomKey);

      available.splice(index, 1);
    });

    // TODO: check this is solvable and iterate

    return data;
  }
}

export default LevelGenerator;
