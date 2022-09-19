import './app.scss';
import Cell from './components/Cell';
import Grid from './components/Grid';
import LevelProvider from './lib/LevelProvider';
import Point from './components/Point';
import Wall from './components/Wall';

const levelProvider = new LevelProvider(location),
  [height, width, levelData] =
    location.hash.length > 1
      ? levelProvider.fromURL()
      : // : levelProvider.random(7, 5);
        levelProvider.generate(7, 5);

const grid = new Grid(
    height,
    width,
    levelData.map((cellDetail, index) =>
      cellDetail === null
        ? new Cell(index)
        : cellDetail === '#'
        ? new Wall(index)
        : new Point(index, cellDetail)
    )
  ),
  appContainer = document.getElementById('app');

appContainer.append(grid.element());
