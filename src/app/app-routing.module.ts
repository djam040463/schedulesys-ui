
import { AccountComponent } from './account/account.component';
import { CareCompanyComponent } from './company/care-company.component';
import { ContactComponent } from './contact/contact.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HomeComponent } from './home/home.component';
import { AuthGuard } from './login/auth-guard.service';
import { LoginComponent } from './login/login.component';
import { PageNotFoundComponent } from './pagenotfound/pagenotfound.component';
import { PasswordResetRequestComponent } from './passwordresetrequest/passwordresetrequest.component';
import { ProfileComponent } from './profile/profile.component';
import { UserComponent } from './user/user.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const appRoutes: Routes = [
  { path: 'home', component: HomeComponent, canActivate: [AuthGuard],
    children: [
      { path: '', component: DashboardComponent },
      { path: 'profile', component: ProfileComponent },
      { path: 'users', component: UserComponent },
      { path: 'companies', component: CareCompanyComponent },
      { path: 'contacts/:companyId', component: ContactComponent }
    ]
  },
  { path: 'pwd-reset-request', component: PasswordResetRequestComponent },
  { path: 'account', component: AccountComponent },
  { path: '', component: LoginComponent },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule {

}
