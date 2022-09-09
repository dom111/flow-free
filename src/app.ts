import './app.scss';
import Cell from './components/Cell';
import Grid from './components/Grid';
import LevelProvider from './lib/LevelProvider';
import Point from './components/Point';

const levelProvider = new LevelProvider(),
  [width, height, levelData] = levelProvider.generate(),
  grid = new Grid(
    width,
    height,
    levelData.map((pointColour, index) =>
      pointColour === null ? new Cell(index) : new Point(index, pointColour)
    )
  ),
  appContainer = document.getElementById('app');

appContainer.append(grid.element());
