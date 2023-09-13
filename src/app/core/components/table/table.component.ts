import { Component, ElementRef, TemplateRef, ViewChild } from '@angular/core';
import { IModalData } from 'src/app/shared/Interface/IModalData';
import {
  MatDialog,
  MatDialogConfig,
  MatDialogRef,
} from '@angular/material/dialog';
import { IFormField } from 'src/app/shared/Interface/IFormData';
import { Store } from '@ngrx/store';
import { getData } from 'src/app/state/user.selector';
import { FormGroup } from '@angular/forms';
import { map } from 'rxjs';
import { DeleteUser, EditUser } from 'src/app/state/user.action';
import { MatTableDataSource } from '@angular/material/table';
import { ITableData } from 'src/app/shared/Interface/ITableData';
import { AuthenticationService } from '../../services/authentication.service';
import { CURRENT_USER_KEY } from 'src/app/shared/classes/cacheKeys';
import { CacheData } from 'src/app/shared/classes/cacheData';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
})
export class TableComponent {
  modalRef: MatDialogRef<any> | undefined;
  displayedColumns: string[] = ['index', 'name', 'Phone no.', 'actions'];
  dataSource: MatTableDataSource<ITableData> | undefined;
  editForm!: IFormField[];
  currentEditIndex: number | undefined;
  isEditable: boolean = false;
  @ViewChild('editModal') editModalElement!: TemplateRef<ElementRef>;
  @ViewChild('deleteModal') deleteModalElement!: TemplateRef<ElementRef>;

  constructor(
    private dialog: MatDialog,
    private store: Store,
    private auth: AuthenticationService
  ) {
    this.isEditable = this.auth.currentUserData?.isUserAdmin ?? false;
    this.store
      .select(getData)
      .pipe(map((data) => data.user))
      .subscribe((data) => {
        this.dataSource = new MatTableDataSource<any>(data);
        this.dataSource._updateChangeSubscription();
      });
  }

  logout() {
    this.auth.logoutUser();
  }

  editData(data: any) {
    this.prepareEditForm(data);
    this.currentEditIndex = data['index'] - 1;
    const modalData: IModalData = {
      modalName: 'Edit',
      componentToLoad: this.editModalElement,
    };
    this.openModal(modalData);
  }

  deleteUserModal(data: any) {
    this.currentEditIndex = data['index'] - 1;
    const modalData: IModalData = {
      modalName: 'Edit',
      componentToLoad: this.deleteModalElement,
    };
    this.openModal(modalData);
  }

  deleteUserData() {
    if (
      this.currentEditIndex !== undefined &&
      this.dataSource !== undefined &&
      this.dataSource.data[this.currentEditIndex]
    ) {
      this.store.dispatch(new DeleteUser(<number>this.currentEditIndex));
      this.closeModal();
    }
  }

  closeModal() {
    this.modalRef?.close();
  }

  updateData(formGroup: FormGroup) {
    if (this.currentEditIndex !== undefined && this.dataSource !== undefined) {
      const data = this.dataSource.data[this.currentEditIndex];
      this.store.dispatch(
        new EditUser({
          index: <number>this.currentEditIndex,
          tableData: { ...data, ...formGroup.value },
        })
      );
      this.closeModal();
    }
  }

  openModal(modalData: IModalData) {
    if (!modalData) {
      return;
    }
    const modalConf: MatDialogConfig = {
      data: {
        modalData: modalData,
      },
      height: '200px',
      width: '400px',
    };
    this.modalRef = this.dialog.open(modalData.componentToLoad, modalConf);

    this.modalRef.afterClosed().subscribe(() => {
      this.currentEditIndex = undefined;
    });
  }

  prepareEditForm(data: any) {
    this.editForm = [
      {
        type: 'text',
        name: 'name',
        placeholder: 'Modify Name',
        value: data.name,
      },
      {
        type: 'number',
        name: 'phone',
        placeholder: 'Modify Phone Number',
        value: data['Phone no.'],
      },
    ];
  }
}
