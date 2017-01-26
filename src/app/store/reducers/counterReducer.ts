import { Reducer, Action } from 'redux';
import { IAppState } from '../index';
import {
  CounterAction
} from '../actions/index';

let initialState: IAppState = { counter: { counter: 0 }, isLoggedIn: false };

// Create our reducer that will handle changes to the state
export const counterReducer: Reducer<IAppState> =
  (state: IAppState = initialState, action: { type: string, payload?: any }): IAppState => {
    switch (action.type) {
      case CounterAction.INCREMENTSUCCESS:
        return Object.assign({}, state, { counter: { counter: action.payload } });
      case CounterAction.DECREMENTSUCCESS:
        return Object.assign({}, state, { counter: { counter: action.payload } });
      case CounterAction.USERSIGNINSUCCESS:
        return Object.assign({}, state, { isLoggedIn: action.payload });
      case CounterAction.USERLOGOUTSUCCESS:
        return Object.assign({}, state, { isLoggedIn: false });
        case CounterAction.UPDATEUSERSETTINGSSUCCESS:
        return Object.assign({}, state);
      default:
        return state;
    }
  };