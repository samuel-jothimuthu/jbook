import produce from 'immer';
import { ActionType, Action } from '../state/action-types';

interface BundlesState {
  [key: string]:
    | {
        loading: boolean;
        code: string;
        err: string;
      }
    | undefined;
}

const defaultState = (): BundlesState => {
  return {};
};

const reducer = produce(
  (state = defaultState(), action: Action): BundlesState => {
    switch (action.type) {
      case ActionType.BUNDLE_START:
        state[action.payload.cellId] = {
          loading: true,
          code: '',
          err: '',
        };
        return state;
      case ActionType.BUNDLE_COMPLETE:
        state[action.payload.cellId] = {
          loading: false,
          code: action.payload.bundle.code,
          err: action.payload.bundle.err,
        };
        return state;
      default:
        return state;
    }
  }
);

export default reducer;
