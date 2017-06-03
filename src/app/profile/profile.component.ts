import { LoginService } from '../login/login.service';
import { CommonComponent } from '../shared/common';
import { Validation } from '../user/validation';
import { ProfileService } from './profile.service';
import { UserProfile } from './userprofile';
import { Component, OnInit, AfterViewChecked, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Message } from 'primeng/primeng';
import * as _ from 'lodash';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent extends CommonComponent implements OnInit, AfterViewChecked {

  @ViewChild('profileForm') profileForm: NgForm;
  user: UserProfile;
  userProfile: UserProfile;
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
      .subscribe(response => {this.user = response});
  }

  ngAfterViewChecked(): void {
    if (this.display) {
      this.formChanged(this.profileForm);
    }
  }

  onEdit(): void {
    this.userProfile = _.cloneDeep(this.user);
    this.setDisplay(true);
  }

  onEditCancel(): void {
    this.setDisplay(false);
  }

  updateProfile(): void {
    this.profileService.update(this.userProfile)
      .subscribe(
        response => {
          this.displayMessage({severity: 'success', summary: '', detail: response});
          // Set whatever user_role we previously had because it hasn't been updated
          if ((this.userProfile.username !== this.userProfile.username)
            || this.userProfile.emailAddress !== this.userProfile.emailAddress) {
              this.loginService.logout(); // Users are logged out when username or email address updated
              this.router.navigate(['../../'], {relativeTo: this.route});
          }
          this.user = _.cloneDeep(this.userProfile); // Update the profile UI with the new values
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
