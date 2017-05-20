import { PasswordResetRequestService } from './passwordresetrequest.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {Message} from 'primeng/primeng';

@Component({
  selector: 'app-passwordresetrequest',
  templateUrl: './passwordresetrequest.component.html',
  styleUrls: ['./passwordresetrequest.component.css']
})
export class PasswordResetRequestComponent implements OnInit {

  email: string;
  msgs: Message[] = [];

  constructor(
    private passwordResetRequestService: PasswordResetRequestService,
    private router: Router
  ) { }

  ngOnInit() {
  }

  sendResetRequest() {
    this.msgs = [];
    this.passwordResetRequestService.sendPasswordResetRequest(this.email)
        .subscribe(
          response => {
               this.msgs.push({severity: 'success',
                   summary: '',
                   detail: 'Password reset email successfully sent'});
               this.email = '';
          },
          error => {
                this.msgs.push({severity: 'error',
                   summary: 'Something unexpected occurred',
                   detail: 'Unable to send reset email. No account found with email address \'' + this.email + '\''});
          });
  }

  /**
   * Handles password reset request cancellation
   */
  onCancelBtnClick() {
    this.router.navigate(['']);
  }

}
