import { ELEMENT_DATA } from '../response';
import { ITableData } from '../shared/Interface/ITableData';
import { CacheData } from '../shared/cache.service';
import { UserActionEnum } from './user.action';

const tableKey = 'table_data_key';
let defaultTableValue: ITableData[] = [];

(function checkStorage() {
  if (!CacheData.fetch(tableKey)) {
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
      return state;
    }
    default:
      return state;
  }
}