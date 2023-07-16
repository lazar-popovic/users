import {Component, OnInit} from '@angular/core';
import {UserFormComponent} from "../user-form/user-form.component";
import {ConfirmationService, LazyLoadEvent, MessageService} from "primeng/api";
import  {DialogService, DynamicDialogRef} from "primeng/dynamicdialog";
import {User} from "../../../shared/models/user-model";
import {UserAdministrationService} from "../../services/user-administration/user-administration.service";
import {TableLazyLoadEvent} from "primeng/table";

@Component({
  selector: 'app-user-administration',
  templateUrl: './user-administration.component.html',
  styleUrls: ['./user-administration.component.scss'],
  providers: [DialogService, MessageService, ConfirmationService]
})
export class UserAdministrationComponent implements OnInit{

  ref: DynamicDialogRef | undefined;
  users: User[] = [];
  totalRecords: number;
  loading: boolean;
  searchTerm: string;


  //first = 0;
  rows = 10;

  constructor(
    private userService: UserAdministrationService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
    private dialogService: DialogService
  ) {}
  ngOnInit(): void {
    //this.getUsers();
    this.loadUsersLazy();
  }

  loadUsersLazy(event?: TableLazyLoadEvent) {
    this.loading = true;
    const page = event ? event.first / event.rows + 1 : 1;
    const limit = event ? event.rows : 10;

    this.userService.getUsers(page, limit, this.searchTerm).subscribe(
      (response) => {
        this.users = response.data;
        this.totalRecords = response.totalRecords;
        this.loading = false;
      },
      (error) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Failed to fetch users.'
        });
        this.loading = false;
      }
    );
  }

  searchUsers() {
    this.loadUsersLazy();
  }

  /*show(): User {
    this.ref = this.dialogService.open(UserFormComponent, {
      header: 'Select a Product',
      width: '30%',
      contentStyle: {overflow: 'auto'},
      baseZIndex: 10000,
      maximizable: true
    });

    this.ref.onClose.subscribe((user: User) => {
      console.log("pozvan onClose")
      if (user) {
        //ovde dobijam usera iz child comp kojeg cuvam dalje u bazi
        return user;
      }
    });
  } */

  addUser() {
    const ref = this.dialogService.open(UserFormComponent, {
      header: 'Add User',
      width: '400px'
    });

    ref.onClose.subscribe((user: User) => {
      if (user) {
        this.userService.addUser(user).subscribe(
          (response) => {
            if (response.success) {
              //this.users.push(response.data);
              this.messageService.add({
                severity: 'success',
                summary: 'Success',
                detail: 'User added successfully.'
              });
            } else {
              this.messageService.add({
                severity: 'error',
                summary: 'Error',
                detail: 'Failed to add user. ' + response.errors.join(', ')
              });
            }
          },
          (error) => {
            this.messageService.add({
              severity: 'error',
              summary: 'Error',
              detail: 'Failed to add user.'
            });
          }
        );
      }
    });
  }

  deleteUser(user: User) {
    this.confirmationService.confirm({
      message: `Are you sure you want to delete ${user.firstName} ${user.lastName}?`,
      accept: () => {
        this.userService.deleteUser(user.id).subscribe(
          (response) => {
            if (response.success) {
              //this.users = this.users.filter((u) => u.id !== user.id);
              this.messageService.add({
                severity: 'success',
                summary: 'Success',
                detail: response.data
              });
              //this.getUsers();
            } else {
              this.messageService.add({
                severity: 'error',
                summary: 'Error',
                detail: 'Failed to delete user. ' + response.errors.join(', ')
              });
            }
          },
          (error) => {
            this.messageService.add({
              severity: 'error',
              summary: 'Error',
              detail: 'Failed to delete user.'
            });
          }
        );
      }
    });
  }

  updateUser(user: User) {
    const ref = this.dialogService.open(UserFormComponent, {
      header: 'Update User',
      width: '400px',
      data: user
    });

    ref.onClose.subscribe((updatedUser: User) => {
      if (updatedUser) {
        this.userService.updateUser(updatedUser).subscribe(
          (response) => {
            if (response.success) {
             /* const index = this.users.findIndex((u) => u.id === response.data.id);
              if (index !== -1) {
                this.users[index] = response.data;*/
                this.messageService.add({
                  severity: 'success',
                  summary: 'Success',
                  detail: 'User updated successfully.'
                });
            } else {
              this.messageService.add({
                severity: 'error',
                summary: 'Error',
                detail: 'Failed to update user. ' + response.errors.join(', ')
              });
            }
          },
          (error) => {
            this.messageService.add({
              severity: 'error',
              summary: 'Error',
              detail: 'Failed to update user.'
            });
          }
        );
      }
    });
  }

}
