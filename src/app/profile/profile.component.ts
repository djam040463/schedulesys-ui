import { LoginService } from '../login/login.service';
import { UserProfileVM } from '../user/userprofilevm';
import { ProfileService } from './profile.service';
import { UserProfile } from './userprofile';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Message } from 'primeng/primeng';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  userProfile: UserProfile;
  userProfileVm: UserProfileVM;
  displayProfileEditpanel = false;
   msgs: Message[] = [];

  constructor(
    private profileService: ProfileService,
    private loginService: LoginService,
    private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit() {
    this.profileService.getUserProfile()
      .subscribe(
        response => {this.userProfile = response},
        error => {console.log('Something Unexpected happenned')});
  }

  onEditBtnClick(): void {
    this.userProfileVm = {... this.userProfile, role: this.userProfile.userRole.name}
    this.setDisplayProfileEditpanel(true);
  }

  onProfileEditCancelbtnClick(): void {
    this.setDisplayProfileEditpanel(false);
  }

  updateProfile(): void {
    this.profileService.updateUserProfile(this.userProfileVm)
      .subscribe(
        response => {
         this.msgs = [];
          this.msgs.push(
            {severity: 'success', summary: '', detail: response}
          );
          // Set whatever user_role we previously had because it hasn't been updated
          if ((this.userProfile.username !== this.userProfileVm.username)
            || this.userProfile.emailAddress !== this.userProfileVm.emailAddress) {
              this.loginService.logout(); // Users are logged out when username or email address updated
              this.router.navigate(['../../'], {relativeTo: this.route});
          }
          this.userProfile = {... this.userProfileVm, userRole: this.userProfile.userRole}; // Update the profile UI with the new values
          setTimeout(() => {this.setDisplayProfileEditpanel(false); this.msgs = []}, 3000);
        },
        error => {
          this.msgs.push({severity: 'error', summary: '', detail: 'Unable to update profile'});
          console.log('Unable to update profile')
        });
  }

  private setDisplayProfileEditpanel(value: boolean): void {
    this.displayProfileEditpanel = value;
  }

}
