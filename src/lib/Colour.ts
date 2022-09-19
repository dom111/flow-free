export enum Colour {
  NONE = null,
  RED = 1,
  GREEN,
  BLUE,
  YELLOW,
  ORANGE,
  LIGHT_BLUE,
  PINK,
  MAROON,
  PURPLE,
  WHITE,
  GREY,
  LIGHT_GREEN,
  BEIGE,
  DARK_BLUE,
  TEAL,
  DARK_PINK,
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

export const colourToClassName = (...colours: number[]): string[] =>
  colours.map((colour) => colourToClassNameLookup[colour]);

export default Colour;
