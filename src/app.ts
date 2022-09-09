import './app.scss';
import Grid from './components/Grid';

const levels: [number, number, string][] = [
  // [3, 3, 'a1abc2bc'],
  [8, 8, '2b7gfe5d10d1f3b1g2e1c2ca1h3a5h5'],
  // [15, 15, '4o1i9l6a11eb5g5e20j2g26n9f1f9l7h1o7n10j7c6pd3mc4h5p6im3kad23b2k1]'],
];

const grid = Grid.loadFromString(
    ...levels[Math.floor(Math.random() * levels.length)]
  ),
  appContainer = document.getElementById('app');

appContainer.append(grid.element());
