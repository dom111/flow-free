import './app.scss';
import Cell from './components/Cell';
import Grid from './components/Grid';
import LevelProvider from './lib/LevelProvider';
import Point from './components/Point';

const levelProvider = new LevelProvider(location),
  [height, width, levelData] =
    location.hash.length > 1
      ? levelProvider.fromURL()
      : levelProvider.generate();

const grid = new Grid(
    height,
    width,
    levelData.map((pointColour, index) =>
      pointColour === null ? new Cell(index) : new Point(index, pointColour)
    )
  ),
  appContainer = document.getElementById('app');

appContainer.append(grid.element());
