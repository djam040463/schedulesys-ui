import { LoginService } from '../login/login.service';
import { CommonComponent } from '../shared/common';
import { UserProfileVM } from '../user/userprofilevm';
import { Validation } from '../user/validation';
import { ProfileService } from './profile.service';
import { UserProfile } from './userprofile';
import { Component, OnInit, AfterViewChecked, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Message } from 'primeng/primeng';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent extends CommonComponent implements OnInit, AfterViewChecked {

  @ViewChild('profileForm') profileForm: NgForm;
  userProfile: UserProfile;
  userProfileVm: UserProfileVM;
  display = false;
  msgs: Message[] = [];

  constructor(
    private profileService: ProfileService,
    private loginService: LoginService,
    private router: Router,
    private route: ActivatedRoute) {
      super(new Validation());
    }

  ngOnInit() {
    this.profileService.getUserProfile()
      .subscribe(response => {this.userProfile = response});
  }

  ngAfterViewChecked(): void {
    if (this.display) {
      this.formChanged(this.profileForm);
    }
  }

  onEdit(): void {
    this.userProfileVm = {... this.userProfile, role: this.userProfile.userRole.name}
    this.setDisplay(true);
  }

  onEditCancel(): void {
    this.setDisplay(false);
  }

  updateProfile(): void {
    this.profileService.update(this.userProfileVm)
      .subscribe(
        response => {
          this.displayMessage({severity: 'success', summary: '', detail: response});
          // Set whatever user_role we previously had because it hasn't been updated
          if ((this.userProfile.username !== this.userProfileVm.username)
            || this.userProfile.emailAddress !== this.userProfileVm.emailAddress) {
              this.loginService.logout(); // Users are logged out when username or email address updated
              this.router.navigate(['../../'], {relativeTo: this.route});
          }
          this.userProfile = {... this.userProfileVm, userRole: this.userProfile.userRole}; // Update the profile UI with the new values
          setTimeout(() => {this.setDisplay(false); this.msgs.pop()}, 3000);
        },
        error => {
          this.displayMessage({severity: 'error', summary: '', detail: error});
        });
  }

  private setDisplay(value: boolean): void {
    this.display = value;
  }

}
