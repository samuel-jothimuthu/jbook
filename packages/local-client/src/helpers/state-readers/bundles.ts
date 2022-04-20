import { RootState } from '../../reducers';
import get from 'lodash/get';

export const getBundlesState = (state: RootState) => {
  return get(state, 'bundles', []);
};

export const getBundle = (state: RootState, cellId: string) => {
  return get(state, `bundles[${cellId}]`, { code: '', err: '' });
};
