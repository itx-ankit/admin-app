import { ELEMENT_DATA } from '../response';
import { ITableData } from '../shared/Interface/ITableData';
import { CacheData } from '../shared/cache.service';
import { UserActionEnum } from './user.action';
import { cloneDeep } from 'lodash';

const tableKey = 'table_data_key';
let defaultTableValue: ITableData[] = [];

(function checkStorage() {
  if (!CacheData.fetch(tableKey)?.length) {
    CacheData.store(tableKey, ELEMENT_DATA);
  }
  defaultTableValue = CacheData.fetch(tableKey);
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
      CacheData.store(tableKey, updatedState);
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

      CacheData.store(tableKey, updatedState);
      return updatedState;
    }
    default:
      return state;
  }
}
