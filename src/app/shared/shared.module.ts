import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {PrimeModule} from "../prime/prime.module";



@NgModule({
  declarations: [

  ],
  imports: [
    CommonModule,
    PrimeModule
  ],
  exports: [
    CommonModule,
    PrimeModule
  ]
})
export class SharedModule { }
