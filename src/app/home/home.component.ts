import { AuthClaim } from '../login/authclaim';
import { LoginService } from '../login/login.service';
import { MenuBar } from './menuitems';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
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
    private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit() {
    this.profile = this.loginService.getAuthenticatedUser();
    this.items = new MenuBar(this.profile.auth === 'ROLE_ADMIN')
        .getMenuItems();
  }

  logout(): void {
     this.loginService.logout();
     this.navigateToLogin();
  }

  private navigateToLogin(): void {
    this.router.navigate(['']);
  }

}
