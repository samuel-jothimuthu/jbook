import { combineReducers } from 'redux';
import cells from './cells';
import bundlesReducer from './bundles';

/** Code in adops-poc
 * export interface ActionInterface {
 *  type: string;
 *
 *  payload: any;
 * }
 *
 * we use rootReducer instead of reducers
 */
const reducers = combineReducers({
  cells: cells,
  bundles: bundlesReducer,
});

export default reducers;

export type RootState = ReturnType<typeof reducers>;
