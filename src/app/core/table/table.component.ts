import { Component, ElementRef, TemplateRef, ViewChild } from '@angular/core';
import { IModalData } from 'src/app/shared/Interface/IModalData';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
})
export class TableComponent {
  displayedColumns: string[] = ['userId', 'name', 'Phone no.', 'actions'];
  dataSource = ELEMENT_DATA;

  @ViewChild('deleteModal') deleteElement!: TemplateRef<ElementRef>;

  constructor(private dialog: MatDialog) {}

  delete(data: any) {
    const modalUniqueId = Symbol();
    const modalData: IModalData = {
      modalName: 'Edit',
      componentToLoad: this.deleteElement,
      modalId: modalUniqueId,
      modalHeightVh: 12,
    };
    this.openModal(modalData);
  }

  openModal(modalData: IModalData) {
    if (!modalData) {
      return;
    }
    const modalConf = {
      data: {
        modalData: modalData,
      },
    };
    this.dialog.open(modalData.componentToLoad, modalConf);
    return modalData.modalId;
  }
}

const ELEMENT_DATA: any[] = [
  { userId: 1, name: 'Amit', 'Phone no.': 284561299 },
  { userId: 2, name: 'Sumit', 'Phone no.': 437340026 },
  { userId: 3, name: 'Raj', 'Phone no.': 650683941 },
  { userId: 4, name: 'Aman', 'Phone no.': 929470122 },
  { userId: 5, name: 'Harry', 'Phone no.': 1048585811 },
  { userId: 6, name: 'Hitesh', 'Phone no.': 1239580107 },
  { userId: 7, name: 'Saurabh', 'Phone no.': 144850067 },
  { userId: 8, name: 'Naveen', 'Phone no.': 1559499994 },
  { userId: 9, name: 'Manu', 'Phone no.': 183949984 },
  { userId: 10, name: 'Alok', 'Phone no.': 20334797 },
];
