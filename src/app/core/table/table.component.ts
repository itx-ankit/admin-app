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
import { Observable, map, tap } from 'rxjs';
import { EditUser } from 'src/app/state/user.action';
import { MatTableDataSource } from '@angular/material/table';
import { ITableData } from 'src/app/shared/Interface/ITableData';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
})
export class TableComponent {
  modalRef: MatDialogRef<any> | undefined;
  displayedColumns: string[] = ['userId', 'name', 'Phone no.', 'actions'];
  dataSource: MatTableDataSource<ITableData> | undefined;
  editForm!: IFormField[];
  currentEditIndex: number | undefined;
  @ViewChild('editModal') editModalElement!: TemplateRef<ElementRef>;

  constructor(private dialog: MatDialog, private store: Store) {
    this.store
      .select(getData)
      .pipe(map((data) => data.user))
      .subscribe((data) => {
        this.dataSource = new MatTableDataSource<any>(data);
        this.dataSource._updateChangeSubscription();
      });
  }

  editData(data: any) {
    this.prepareEditForm(data);
    this.currentEditIndex = data['userId'] - 1;
    const modalUniqueId = Symbol();
    const modalData: IModalData = {
      modalName: 'Edit',
      componentToLoad: this.editModalElement,
      modalId: modalUniqueId,
      modalHeightVh: 12,
    };
    this.openModal(modalData);
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
      this.modalRef?.close();
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
