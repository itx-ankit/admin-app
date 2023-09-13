import { ELEMENT_DATA, USER_LIST_DATA } from '../response';
import { ITableData } from '../shared/Interface/ITableData';
import { CacheData } from '../shared/classes/cacheData';
import { TABLE_DATA_KEY, USER_LIST_KEY } from '../shared/classes/cacheKeys';
import { UserActionEnum } from './user.action';
import { cloneDeep } from 'lodash';

let defaultTableValue: ITableData[] = [];

// Set Default UserList if needed
(function checkStorage() {
  if (!CacheData.fetch(TABLE_DATA_KEY)?.length) {
    CacheData.store(TABLE_DATA_KEY, ELEMENT_DATA);
  }
  defaultTableValue = CacheData.fetch(TABLE_DATA_KEY);
})();

// Setting Userlist for login & Logout purpose
(function setUserList() {
  CacheData.store(USER_LIST_KEY, USER_LIST_DATA);
})();

export function UserReducer(
  state = defaultTableValue,
  action: any
): ITableData[] {
  switch (action.type) {
    case UserActionEnum.EDIT_USER: {
      const updatedState = [...state];
      if (action.data?.index !== undefined) {
        updatedState[action.data.index] = action.data.tableData;
      }
      CacheData.store(TABLE_DATA_KEY, updatedState);
      return updatedState;
    }

    case UserActionEnum.DELETE_USER: {
      let updatedState: any[] = cloneDeep(state);
      const index = action.index;
      if (index !== undefined) {
        updatedState.splice(index, 1);
      }

      updatedState.map((userData, index) => {
        userData.userId = index + 1;
        return userData;
      });

      CacheData.store(TABLE_DATA_KEY, updatedState);
      return updatedState;
    }
    default:
      return state;
  }
}
