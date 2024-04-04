import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableCountriesComponent } from './table.component';
import { HttpClientModule } from '@angular/common/http';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { HeaderModule } from '../header/header.module';



@NgModule({
  declarations: [
    TableCountriesComponent
  ],
  imports: [
    CommonModule,
    MatTableModule,
    MatSortModule,
    MatTableModule,
    MatPaginatorModule,
    HttpClientModule,
  ],
  exports: [
    TableCountriesComponent
  ]
})
export class TableCountriesModule { }
