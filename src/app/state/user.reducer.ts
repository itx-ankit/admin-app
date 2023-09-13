import { Action } from '@ngrx/store';
import { UserActionEnum } from './user.action';

export function UserReducer(state = {}, action: Action) {
  switch (action.type) {
    case UserActionEnum.EDIT_USER: {
      return { ...state };
    }
    case UserActionEnum.DELETE_USER: {
      return { ...state };
    }
    default:
      return state;
  }
}
