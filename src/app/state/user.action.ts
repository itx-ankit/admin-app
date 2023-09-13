import { Action } from '@ngrx/store';
import { ITableData } from '../shared/Interface/ITableData';

export enum UserActionEnum {
  EDIT_USER = 'edit-users',
  DELETE_USER = 'delete-users',
}

export class EditUser implements Action {
  readonly type = UserActionEnum.EDIT_USER;
  constructor(
    public data: {
      index: number;
      tableData: ITableData;
    }
  ) {}
}

export class DeleteUser implements Action {
  readonly type = UserActionEnum.DELETE_USER;
  constructor(public data: any) {}
}
