import { GridLoader } from './kernel/GridLoader.js';
import { GridGenerator } from './kernel/GridGenerator.js';

GridLoader.load();

let initTime = Date.now();
GridGenerator.generator(GridLoader.getParams());
console.log(Date.now() - initTime);