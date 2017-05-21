import { AuthClaim } from '../login/authclaim';
import { LoginService } from '../login/login.service';
import { MenuBar } from './menuitems';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem } from 'primeng/primeng';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  items: MenuItem[];
  profile: AuthClaim;

  constructor(
    private loginService: LoginService,
    private router: Router) { }

  ngOnInit() {
    this.items = MenuBar.items;
    this.profile = this.loginService.getAuthenticatedUser();
  }

  logout(): void {
     this.loginService.logout();
     this.navigateToLogin();
  }

  private navigateToLogin(): void {
    this.router.navigate(['']);
  }

}
