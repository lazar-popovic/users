import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {UserAdministrationComponent} from "./user/components/user-administration/user-administration.component";

const routes: Routes = [
  {path: 'user-administration', component: UserAdministrationComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
