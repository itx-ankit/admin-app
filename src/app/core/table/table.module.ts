import { NgModule } from '@angular/core';
import { MatDialogModule } from '@angular/material/dialog';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { TableComponent } from './table.component';

const routes: Routes = [
  {
    path: '',
    component: TableComponent,
  },
];

const matModules = [
  MatDialogModule,
  MatTableModule,
  MatIconModule,
  CommonModule,
];

@NgModule({
  declarations: [TableComponent],
  imports: [...matModules, RouterModule.forChild(routes)],
  exports: [...matModules],
})
export class TableModule {}
