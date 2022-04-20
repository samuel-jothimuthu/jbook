import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from '@redux-devtools/extension';
import thunk from 'redux-thunk';
import reducers from '../reducers';
import { persistMiddleware } from './middlewares/persist-middlewares';

export const store = createStore(
  reducers,
  {},
  composeWithDevTools(applyMiddleware(persistMiddleware, thunk))
);
