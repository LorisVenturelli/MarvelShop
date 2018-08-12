// SIMPLE REDUCER
import {UI_ACTIONS} from '../constants/action_types';

export default (state = {count: 1}, action) => {
  switch (action.type) {
  case UI_ACTIONS.INCREMENT_COUNT:
    return {...state, count: action.data};
  default:
    return state;
  }
};
