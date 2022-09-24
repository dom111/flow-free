import './app.scss';
import Cell from './components/Cell';
import Colour from './lib/Colour';
import Grid from './components/Grid';
import LevelProvider from './lib/LevelProvider';
import Point from './components/Point';
import TouchHighlight from './components/TouchHighlight';

const levelProvider = new LevelProvider(location),
  hashLevelData = levelProvider.fromURL(),
  [height, width, levelData] = hashLevelData ?? levelProvider.generate();

const touchHighlight = new TouchHighlight(height, width),
  grid = new Grid(
    height,
    width,
    levelData.map((pointColour, index) =>
      pointColour === Colour.NONE
        ? new Cell(index)
        : new Point(index, pointColour)
    ),
    touchHighlight
  ),
  appContainer = document.getElementById('app');

appContainer.append(grid.element(), touchHighlight.element());
