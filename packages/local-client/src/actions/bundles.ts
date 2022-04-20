import { ActionType, Action } from '../state/action-types';
import { Dispatch } from 'redux';
import bundle from '../bundler';

export const createBundle = (cellId: string, input: string) => {
  return async (dispacth: Dispatch<Action>) => {
    dispacth({
      type: ActionType.BUNDLE_START,
      payload: {
        cellId,
      },
    });

    const result = await bundle(input);

    dispacth({
      type: ActionType.BUNDLE_COMPLETE,
      payload: {
        cellId,
        bundle: result,
      },
    });
  };
};
