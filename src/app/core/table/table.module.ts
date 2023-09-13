import { NgModule } from '@angular/core';
import { MatDialogModule } from '@angular/material/dialog';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { TableComponent } from './table.component';
import { FormFieldComponent } from 'src/app/shared/form-field/form-field.component';
import { MatTooltipModule } from '@angular/material/tooltip';

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
  MatTooltipModule,
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormFieldComponent,
    ...matModules,
  ],
  declarations: [TableComponent],
})
export class TableModule {}
