import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {TableModule} from "primeng/table";
import {ToastModule} from "primeng/toast";
import {DynamicDialogModule} from "primeng/dynamicdialog";
import {SharedModule} from "../shared/shared.module";
import {ReactiveFormsModule} from "@angular/forms";
import {ConfirmDialog, ConfirmDialogModule} from "primeng/confirmdialog";



@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
    TableModule,
    ToastModule,
    DynamicDialogModule,
    ReactiveFormsModule,
    ConfirmDialogModule
  ],
  exports: [
    TableModule,
    ToastModule,
    DynamicDialogModule,
    ReactiveFormsModule
  ]
})
export class PrimeModule { }
