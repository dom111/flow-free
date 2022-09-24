# Level notation

As part of this project it, I felt it was necessary to have the level data stored in a compact format which can be
easily written and processed so that level packs could be stored in string formats to make it easier to share.

Currently, the format is an array containing the height as a number, the width as a number and the level layout as a
variation on a run-length encoded string that has the following properties:

- Letters represent the start/end points for each colour. `a` for red, `b` for green, etc. For a full list see
  [src/Colour.ts](https://github.com/dom111/flow-free/blob/master/src/lib/Colour.ts).
- Numbers represent that number of empty cells.
- Any undefined cells will be blank.

For example:

```json
[2, 2, "aa"]
```

generates a board like the following:

| 🔴  | 🔴  |
| --- | --- |
|     |     |

This format can be included in the URL as `#[6,5,'1d2a4b2b1c2c10da']` to quickly share playable level designs
[like this](https://dom111.github.io/flow-free#[2,2,"aa"]).

```json
[6, 5, "1d2a4b2b1c2c10da"]
```

generates:

|      | 🟡  |     |     | 🔴  |
| ---- | --- | --- | --- | --- |
|      |     |     |     | 🟢  |
|      |     | 🟢  |     | 🔵  |
|      |     | 🔵  |     |     |
|      |     |     |     |     |
|      |     |     |     |     |
|      |     |     | 🟡  | 🔴  |

[View it here](https://dom111.github.io/flow-free#[6,5,"1d2a4b2b1c2c10da"]).

## Improvements

- Wall definitions  
  Each `Cell` can have up to four walls for each edge, this will need to be supplied as separate data for each cell, or
  require a reformatting of the data.
- A definition of the level type: enclosed (default) or toroidal (warps)  
  This could always assume toroidal and require wall definitions to be surrounded although having an option would make
  the data smaller in the URL/storage.
- Allow the option to provide `Path`s in the URL too, so pre-solved grids can be shared
