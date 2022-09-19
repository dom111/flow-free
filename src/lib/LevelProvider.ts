import LevelGenerator from './LevelGenerator';

const levels: [number, number, string][] = [
  // [3, 3, 'a1abc2bc'],
  // [7, 5, 'a33a'],
  [8, 8, '2b7gfe5d10d1f3b1g2e1c2ca1h3a5h'],
  // [15, 15, '4o1i9l6a11eb5g5e20j2g26n9f1f9l7h1o7n10j7c6pd3mc4h5p6im3kad23b2k]'],
];

type LevelData = [number, number, (null | number | '#')[]];

enum Difficulty {
  SIMPLE,
  EASY,
  NORMAL,
  HARD,
  X_HARD,
}

const loadFromString = (
  height: number,
  width: number,
  gridDefinition: string
): LevelData => {
  const matches = gridDefinition.match(/\d+|[a-z#]/gi);

  if (matches === null) {
    throw new TypeError('Invalid level definition');
  }

  const cells = matches.flatMap((value: string): number | '#' | null[] => {
    if (/^\d+$/.test(value)) {
      return new Array(parseInt(value)).fill(null);
    }

    if ((['#'] as ['#']).includes(value as '#')) {
      return value as '#';
    }

    return Math.pow(2, parseInt(value, 36) - 10);
  });

  const area = height * width;

  if (cells.length < area) {
    cells.push(...new Array(area - cells.length).fill(null));
  }

  return [height, width, cells];
};

export class LevelProvider {
  #location: Location;

  constructor(location: Location) {
    this.#location = location;
  }

  generate(
    height: number = -1,
    width: number = -1,
    difficulty: Difficulty = Difficulty.NORMAL
  ): LevelData {
    return loadFromString(...levels[Math.floor(Math.random() * levels.length)]);
  }

  fromURL(): LevelData {
    const [height, width, levelString] = JSON.parse(
      atob(this.#location.hash.slice(1))
    );

    return loadFromString(height, width, levelString);
  }

  random(height: number, width: number): LevelData {
    const generator = new LevelGenerator(
      height,
      width,
      Math.floor(Math.sqrt(height * width))
    );

    return [height, width, generator.generate()];
  }
}

export default LevelProvider;
