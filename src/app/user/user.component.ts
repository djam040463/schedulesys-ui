import { AuthClaim } from '../login/authclaim';
import { LoginService } from '../login/login.service';
import { UserProfile } from '../profile/userprofile';
import { UserRole } from '../profile/userrole';
import { CommonComponent } from '../shared/common';
import { UserService } from './user.service';
import { UserProfileVM } from './userprofilevm';
import { UserRoleService } from './userrole.service';
import { Validation } from './validation';
import { Component, OnInit, ViewChild, AfterViewChecked } from '@angular/core';
import { NgForm, FormBuilder, FormGroup } from '@angular/forms';
import { MenuItem, ConfirmationService, Message, SelectItem } from 'primeng/primeng';
import * as _ from 'lodash';
import { Observable } from 'rxjs/Observable';


@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent extends CommonComponent implements OnInit, AfterViewChecked {

  @ViewChild('userForm') userForm: NgForm;
  users: UserProfile[];
  selectedUser: UserProfile;
  user: UserProfile;
  userRoles: SelectItem[] = [];
  authClaim: AuthClaim;

  // TODO Use same type for creating and fetching data from server
  constructor(
      private userService: UserService,
      private confirmationService: ConfirmationService,
      private userRoleService: UserRoleService,
      private loginService: LoginService
    ) {
        super(new Validation());
        this.authClaim = this.loginService.getAuthenticatedUser();
  }

  ngAfterViewChecked(): void {
    if (this.dialogDisplayed) {
      this.formChanged(this.userForm);
    }
  }

  ngOnInit() {
    this.getAll(this.tableCurrentPage, this.tableCurrentRowCount);
    this.getAllUserRoles();
    this.buildContextMenuItems();
    this.user = new UserProfile(null);
  }

  getAll(page: number, size: number) {
    this.userService.getAll(page, size)
          .subscribe(response => {
            this.users = response.users;
            this.tableItemsCount = response.count;
            });
  }

  private getAllUserRoles() {
    this.userRoleService.getAll()
        .subscribe(
          response => {
            const component = this;
            response.forEach(function(userRole){
              component.userRoles.push({label: userRole.name, value: userRole.name});
            });
          });
  }

  /**
   * Update or Create a new ScheduleSys User
   */
  create() {
    // Maps UserProfileVM to UserProfile
    const user  = _.cloneDeep(this.user);
    const result: Observable<string> = this.editing ? this.userService.updateUser(user)
      : this.userService.createUser(user);
    result.subscribe(
      response => {
         this.displayMessage({ severity: 'success', summary: '', detail: response });
         this.hideDialog();
         if (!this.editing) {
           this.users.push(this.user);
           this.tableItemsCount ++;
         }
      },
      error => {
         this.displayMessage({ severity: 'error', summary: '', detail: error });
      }
    );
  }
  deleteUser() {
    if (this.authClaim.sub === this.selectedUser.username) {
      this.displayMessage({ severity: 'error', summary: '',
        detail: 'Cannot delete account of authenticated user'});
      return;
    }
    this.confirmationService.confirm({
       message: 'Are you sure you want to delete this user ?',
       accept: () => {
        this.userService.deleteUser(this.selectedUser.username)
          .subscribe(
            response  => {
              this.displayMessage({ severity: 'success', summary: '', detail: 'User successfully deleted'});
                const selectedUserIndex = this.findSelectedUserIndex();
                this.users = this.users.filter((val, i) =>  i !== selectedUserIndex); // Refreshes dataTable
                this.selectedUser = undefined; // Disables 'Edit' and 'Delete' buttons
                // Update number of items so that the paginator displays the correct number of pages
                this.tableItemsCount--;
                if (this.users.length === 0) {
                  // Goes back to first page when the last item in the list is deleted
                  this.getAll(0, this.tableCurrentRowCount);
                }
            },
            error => {
                this.displayMessage({ severity: 'error', summary: '', detail: error});
            }
          );
       }
    });
  }

  showDialog(editing: boolean) {
    this.dialogDisplayed = true;
    this.editing = editing;
    // When editing, populate form with selected User
    this.user = editing ? _.cloneDeep(this.selectedUser) : new UserProfile(null);
  }

  hideDialog() {
    this.dialogDisplayed = false;
    if (this.editing) {
      this.refreshOnEdit(this.user, this.selectedUser); // Refresh dataTable after user update
    }
    this.userForm.resetForm();
  }

  private buildContextMenuItems () {
    this.contextMenuItems = [
            { label: 'Edit'  , icon: 'fa-edit' , command: (event) => {this.showDialog(true)}},
            { label: 'Delete', icon: 'fa-close', command: (event) => {this.deleteUser()}    }
        ];
  }

  findSelectedUserIndex() {
     let index = -1;
     this.users.forEach((user, i) => {
      if (this.selectedUser.id === user.id) {
        index = i;
      }
     });
    return index;
  }

}
