import { LoginService } from './login.service';
import { LoginVM } from './loginvm';
import { Component, OnInit } from '@angular/core';
import {Message} from 'primeng/primeng';


/**
 * Manages Users authentication
 */
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent {
// TODO Redirect to home if user is already authenticated
  loginVM: LoginVM = new LoginVM();
  msgs: Message[] = [];

  constructor(private loginService: LoginService) {}

   /**
   * Authenticate a user
   */
   login() {
      this.loginService.login(this.loginVM)
        .subscribe(res => {
        // TODO Redirect to home
              console.log('Successfully logged in');
            }
            , error => {
                this.msgs = [];
                this.msgs.push({
                   severity: 'warn',
                   summary: 'Something unexpected occurred',
                   detail: 'Username or password invalid'});
            });
  }

  /**
   * Handles rememberMe button events
   */
  onRememberMeChange() {
    this.loginVM.rememberMe = !this.loginVM.rememberMe;
    console.log('Updated rememberMe : ' + this.loginVM.rememberMe);
  }

  // TODO Add method to reset all control in login form

}
