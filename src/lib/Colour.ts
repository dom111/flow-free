export enum Colour {
  NONE = 0,
  RED = 1,
  GREEN = 2,
  BLUE = 4,
  YELLOW = 8,
  ORANGE = 16,
  LIGHT_BLUE = 32,
  PINK = 64,
  MAROON = 128,
  PURPLE = 256,
  WHITE = 512,
  GREY = 1024,
  LIGHT_GREEN = 2048,
  BEIGE = 4096,
  DARK_BLUE = 8192,
  TEAL = 16384,
  DARK_PINK = 32768,
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

export const colourToClassName = (colours: number): string[] =>
  Object.entries(colourToClassNameLookup)
    .filter(([colour]) => colours & parseInt(colour, 10))
    .map(([, className]) => className);

export const allColourClasses = Object.values(colourToClassNameLookup);

export default Colour;
