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
  isUpdate: boolean = false;

  constructor(
    private fb: FormBuilder,
    public ref: DynamicDialogRef,
    public config: DynamicDialogConfig
  ) {}

  ngOnInit() {
    this.initForm();
    this.populateForm();
  }

  private initForm() {
    this.userForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      role: ['', Validators.required],
      office: ['', Validators.required]
    });
  }

  private populateForm() {
    const user: User = this.config.data.user;
    if (user) {
      this.isUpdate = true;
      this.userForm.patchValue(user);
    }
  }

  onSaveUser() {
    if (this.userForm.valid) {
      const updatedUser: User = {
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
