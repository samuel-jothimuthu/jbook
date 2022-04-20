import { RootState } from '../../reducers';
import get from 'lodash/get';

export const getCellState = (state: RootState) => {
  return get(state, 'cells', {});
};

export const getCellsList = (state: RootState) => {
  const order = get(state, 'cells.order', []);
  const data = get(state, 'cells.data', {});
  return order.map((id: string) => {
    return data[id];
  });
};
