import Colour, { assertIsColour } from './Colour';

const levels: [number, number, string][] = [
  [3, 3, 'a1abc2bc'],
  [8, 8, '2b7gfe5d10d1f3b1g2e1c2ca1h3a5h'],
  [15, 15, '4o1i9l6a11eb5g5e20j2g26n9f1f9l7h1o7n10j7c6pd3mc4h5p6im3kad23b2k]'],
  [6, 5, '1d2a4b2b1c2c10da'],
];

type LevelData = [number, number, Colour[]];

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
  const matches = gridDefinition.match(/\d+|[a-z]/gi);

  if (matches === null) {
    throw new TypeError('Invalid level definition');
  }

  const cells = matches.flatMap((value: string): Colour | Colour[] => {
    if (/^\d+$/.test(value)) {
      return new Array(parseInt(value, 10)).fill(Colour.NONE);
    }

    if (/^[a-z]$/i.test(value)) {
      return assertIsColour(value);
    }

    throw new TypeError(`Unknown level data '${value}'.`);
  });

  const area = height * width;

  if (cells.length < area) {
    cells.push(...new Array(area - cells.length).fill(Colour.NONE));
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

  fromURL(): LevelData | null {
    const hashData = decodeURIComponent(this.#location.hash.slice(1));

    if (hashData.length < 2) {
      return null;
    }

    let jsonData: string;

    try {
      jsonData = atob(hashData);
    } catch (e) {
      if (!(e instanceof DOMException)) {
        throw e;
      }

      jsonData = hashData;
    }

    if (!jsonData) {
      return null;
    }

    let rawHashData: [number, number, string];

    try {
      rawHashData = JSON.parse(jsonData.replace(/'/g, '"'));
    } catch (e) {
      if (!(e instanceof SyntaxError)) {
        throw e;
      }

      console.warn('Invalid JSON data provided: ' + jsonData);
      return null;
    }

    if (
      !(rawHashData instanceof Array) ||
      rawHashData.length !== 3 ||
      typeof rawHashData[0] !== 'number' ||
      typeof rawHashData[1] !== 'number' ||
      typeof rawHashData[2] !== 'string'
    ) {
      return null;
    }

    const [height, width, levelString] = rawHashData;

    return loadFromString(height, width, levelString);
  }
}

export default LevelProvider;
