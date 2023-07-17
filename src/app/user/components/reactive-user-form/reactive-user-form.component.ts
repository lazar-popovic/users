import { Component, OnInit, Inject } from '@angular/core';
import { DynamicDialogRef, DynamicDialogConfig } from 'primeng/dynamicdialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {User} from "../../../shared/models/user-model";

@Component({
  selector: 'app-reactive-user-form',
  templateUrl: './reactive-user-form.component.html',
  styleUrls: ['./reactive-user-form.component.scss']
})
export class ReactiveUserFormComponent {

  userForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    public ref: DynamicDialogRef,
    public config: DynamicDialogConfig
  ) {}

  ngOnInit() {
    this.initForm();
  }

  private initForm() {
    const user: User = this.config.data.user;

    this.userForm = this.fb.group({
      firstName: [user.firstName, Validators.required],
      lastName: [user.lastName, Validators.required],
      email: [user.email, [Validators.required, Validators.email]],
      role: [user.role, Validators.required],
      office: [user.office, Validators.required]
    });
  }

  onSaveUser() {
    if (this.userForm.valid) {
      const updatedUser: User = {
        ...this.config.data.user,
        ...this.userForm.value
      };

      this.ref.close(updatedUser);
    } else {
      this.userForm.markAllAsTouched();
    }
  }

  onCancelUserForm() {
    this.ref.close();
  }

  get firstName() {
    return this.userForm.get('firstName');
  }

  get lastName() {
    return this.userForm.get('lastName');
  }

  get email() {
    return this.userForm.get('email');
  }

  get role() {
    return this.userForm.get('role');
  }

  get office() {
    return this.userForm.get('office');
  }
}
