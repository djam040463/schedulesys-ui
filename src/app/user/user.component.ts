import { AuthClaim } from '../login/authclaim';
import { LoginService } from '../login/login.service';
import { UserProfile } from '../profile/userprofile';
import { UserRole } from '../profile/userrole';
import { Common } from '../shared/common';
import { UserService } from './user.service';
import { UserProfileVM } from './userprofilevm';
import { UserRoleService } from './userrole.service';
import { Validation } from './validation';
import { Component, OnInit, ViewChild, AfterViewChecked } from '@angular/core';
import { NgForm, FormBuilder, FormGroup } from '@angular/forms';
import { MenuItem, ConfirmationService, Message, SelectItem } from 'primeng/primeng';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent extends Common implements OnInit, AfterViewChecked {

  @ViewChild('userForm') userForm: NgForm;
  users: UserProfile[];
  selectedUser: UserProfile;
  user: UserProfile;
  contextMenuItems: MenuItem[];
  msgs: Message[] = [];
  display = false;
  editing: boolean;
  userRoles: SelectItem[] = [];
  validation: Validation;
  authClaim: AuthClaim;

  // TODO Use same type for creating and fetching data from server
  constructor(
      private userService: UserService,
      private confirmationService: ConfirmationService,
      private userRoleService: UserRoleService,
      private loginService: LoginService
    ) {super();  this.authClaim = this.loginService.getAuthenticatedUser(); }

  ngOnInit() {
    this.getAllUsers();
    this.getAllUserRoles();
    this.buildContextMenuItems();
    this.user = new UserProfile(null);
    this.validation = new Validation();
  }

  ngAfterViewChecked() {
    this.formChanged(this.userForm, this.validation.formErrors,
       this.validation.validationMessages);
  }

  private getAllUsers() {
    this.userService.getAllUsers()
          .subscribe(response => {this.users = response});
  }

  private getAllUserRoles() {
    this.userRoleService.getAllUserRoles()
        .subscribe(
          response => {
            for (let i = 0; i < response.length; i++) {
               this.userRoles.push({label: response[i].name, value: response[i].name});
            }
          });
  }

  deleteUser() {
    if (this.authClaim.sub === this.selectedUser.username) {
      this.displayMessage({ severity: 'error', summary: '',
        detail: 'Cannot delete account of authenticated user'}, this.msgs);
      return;
    }
    this.confirmationService.confirm({
       message: 'Are you sure you want to delete this user ?',
       accept: () => { console.log('Deleting user');
        this.userService.deleteUser(this.selectedUser.username)
          .subscribe(
            response  => {
              this.displayMessage(
                { severity: 'success', summary: '', detail: 'User successfully deleted'}, this.msgs);
                // this.selectedUser = undefined; // Disables 'Edit' and 'Delete' buttons
                this.getAllUsers() // Refreshes dataTable
            },
            error => {
                this.displayMessage({ severity: 'error', summary: '', detail: error}, this.msgs);
            }
          );
       }
    });
  }

  /**
   * Update or Create a new ScheduleSys User
   */
  createOrUpdateUser() {
    // Maps UserProfileVM to UserProfile
    const userVm: UserProfileVM = {... this.user, role: this.user.userRole.name};
    if (this.editing) {
      this.updateUser(userVm);
    } else {
      this.createUser(userVm);
    }
  }

  private createUser (userVm: UserProfileVM): void {
     this.userService.createUser(userVm)
          .subscribe(
            response => {
              this.displayMessage(
                 { severity: 'success', summary: '', detail: response }, this.msgs);
              this.hideDialog();
              this.getAllUsers();
            },
            error => { console.log(error);
              this.displayMessage(
                 { severity: 'error', summary: '', detail: error }, this.msgs);
            }
     );
  }

  private updateUser(userVm: UserProfileVM): void {
    this.userService.updateUser(userVm)
        .subscribe(
            response => {
              this.displayMessage(
                { severity: 'success', summary: '', detail: response }, this.msgs);
              this.hideDialog();
              this.getAllUsers();
            },
            error => { console.log(error);
              this.displayMessage(
                 { severity: 'error', summary: '', detail: error }, this.msgs);
            }
    );
  }

  showDialog(editing: boolean) {
    this.display = true;
    this.editing = editing;
    // When editing, populate form with selected User
    this.user = editing ? {... this.selectedUser,
       userRole: {... this.selectedUser.userRole}} : new UserProfile(null);
  }

  hideDialog() {
    this.display = false;
    if (this.editing) {
      this.selectedUser = {... this.user,
          userRole: {... this.user.userRole}}; // Refresh dataTable after user update
    }
    this.userForm.resetForm();
  }

  onDuplicates(event: any) {
    this.validation.formErrors[event.field] = event.message;
  } // TODO Move to Common

  private buildContextMenuItems () {
    this.contextMenuItems = [
            { label: 'Edit'  , icon: 'fa-edit' , command: (event) => {this.showDialog(true)}},
            { label: 'Delete', icon: 'fa-close', command: (event) => {this.deleteUser()}    }
        ];
  } // TODO Move logic into Common

}
