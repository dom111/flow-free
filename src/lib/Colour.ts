export enum Colour {
  NONE,
  RED = 'a',
  GREEN = 'b',
  BLUE = 'c',
  YELLOW = 'd',
  ORANGE = 'e',
  LIGHT_BLUE = 'f',
  PINK = 'g',
  MAROON = 'h',
  PURPLE = 'i',
  WHITE = 'j',
  GREY = 'k',
  LIGHT_GREEN = 'l',
  BEIGE = 'm',
  DARK_BLUE = 'n',
  TEAL = 'o',
  DARK_PINK = 'p',
}

const colourToClassNameLookup = {
  [Colour.RED]: 'red',
  [Colour.GREEN]: 'green',
  [Colour.BLUE]: 'blue',
  [Colour.YELLOW]: 'yellow',
  [Colour.ORANGE]: 'orange',
  [Colour.LIGHT_BLUE]: 'light-blue',
  [Colour.PINK]: 'pink',
  [Colour.MAROON]: 'maroon',
  [Colour.PURPLE]: 'purple',
  [Colour.WHITE]: 'white',
  [Colour.GREY]: 'grey',
  [Colour.LIGHT_GREEN]: 'light-green',
  [Colour.BEIGE]: 'beige',
  [Colour.DARK_BLUE]: 'dark-blue',
  [Colour.TEAL]: 'teal',
  [Colour.DARK_PINK]: 'dark-pink',
};

export const assertIsColour = (colour: any): Colour => {
  if (!Object.values(Colour).includes(colour)) {
    throw new TypeError(`Unknown Colour '${colour}'.`);
  }

  return colour;
};

export const colourToClassName = (...colours: Colour[]): string[] =>
  colours
    .filter((colour) => colour !== Colour.NONE)
    .map((colour) => colourToClassNameLookup[colour]);

export default Colour;
