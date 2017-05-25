import { UserProfile } from '../profile/userprofile';
import { UserService } from './user.service';
import { UserProfileVM } from './userprofilevm';
import { Component, OnInit } from '@angular/core';
import { MenuItem, ConfirmationService, Message } from 'primeng/primeng';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  public users: UserProfile[];
  public selectedUser: UserProfile;
  public user: UserProfile = new UserProfile(null);
  contextMenuItems: MenuItem[];
  msgs: Message[] = [];
  display = false;
  editing: boolean;

  constructor(
      private userService: UserService,
      private confirmationService: ConfirmationService
    ) { }

  ngOnInit() {
    this.getAllUsers();
    this.contextMenuItems = [
            { label: 'View', icon: 'fa-search', command: (event) => {this.viewUser(this.selectedUser)} },
            { label: 'Edit', icon: 'fa-edit' , command: (event) => {this.showDialog(true)}},
            { label: 'Delete', icon: 'fa-close', command: (event) => {this.deleteUser()} }
        ];
  }

  onRowDblclick(event) {
    console.log('Selected user : ' + event.data.username);
  }

  private getAllUsers() {
    this.userService.getAllUsers()
          .subscribe(
            response => {this.users = response},
            error => {console.log('Something unexpected happenned while getting all users')});
  }

  deleteUser() {
    this.confirmationService.confirm({
       message: 'Are you sure you want to delete this user ?',
       accept: () => { console.log('Deleting user');
        this.userService.deleteUser(this.selectedUser.username)
          .subscribe(
            response  => {
              this.displayNotification({
                severity: 'success',
                summary: '',
                detail: 'User successfully deleted'});
                this.selectedUser = undefined;
                this.getAllUsers()
            },
            error => {
                this.displayNotification({
                  severity: 'error',
                  summary: '',
                  detail: 'Unable to delete user.'}); }
          );
       }
    });
  }

  viewUser(user: UserProfile) {

  }

  createOrUpdateUser() {
    // const userVm: UserProfileVM = {... this.user, role: this.user.userRole.name};
    const userVm: UserProfileVM = {... this.user, role: 'ADMIN'};
    if (this.editing) {
      this.userService.updateUser(userVm);
    } else {
      this.userService.createUser(userVm)
          .subscribe(
            response => {
              this.displayNotification({
                severity: 'success',
                summary: '',
                detail: response
              });
              console.log('User created');
              this.hideDialog();
              this.getAllUsers();
            },
            error => { console.log(error);
              this.displayNotification({
                severity: 'error',
                summary: '',
                detail: 'Unable to create user'
              });
            }
          );
    }
  }
  showDialog(editing: boolean) {
    this.display = true;
    this.editing = editing;
    this.user = editing ? {... this.selectedUser} : new UserProfile(null);
  }

  hideDialog() {
    this.display = false;
  }

  private displayNotification(msg: Message): void {
      this.msgs.push(msg);
      setTimeout(() => {this.msgs = []}, 3000); // Growl does not disappear automatically
  }

}
