import {Component, OnInit} from '@angular/core';
import {DialogService, DynamicDialogConfig, DynamicDialogRef} from 'primeng/dynamicdialog';
import {User} from "../../../shared/models/user-model";
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss'],
  providers: [DialogService, MessageService]
})
export class UserFormComponent implements OnInit{

  user: User = {
    firstName: '',
    lastName: '',
    email: '',
    role: '',
    office: ''
  };
  constructor(private dialogService: DialogService, private messageService: MessageService, public ref: DynamicDialogRef, public config: DynamicDialogConfig) {}

  ngOnInit(): void {
  }

  saveUser() {
    this.ref.close(this.user);
  }

  cancel() {
    this.ref.close();
  }
}
