import { GridLoader } from './kernel/Grid/GridLoader.js';
import { GridGenerator } from './kernel/Grid/GridGenerator.js';

GridLoader.load();

let initTime = Date.now();
GridGenerator.generator(GridLoader.getParams());
console.log(Date.now() - initTime);