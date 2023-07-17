import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserAdministrationComponent } from './components/user-administration/user-administration.component';
import {FormsModule} from "@angular/forms";
import { UserFormComponent } from './components/user-form/user-form.component';
import {HttpClient, HttpClientModule} from "@angular/common/http";
import {PrimeModule} from "../prime/prime.module";
import { ReactiveUserFormComponent } from './components/reactive-user-form/reactive-user-form.component';



@NgModule({
  declarations: [
    UserAdministrationComponent,
    UserFormComponent,
    ReactiveUserFormComponent
  ],
  exports: [
    UserAdministrationComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
    PrimeModule
  ]
})
export class UserModule { }
