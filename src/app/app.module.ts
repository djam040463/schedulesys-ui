import { AppRoutingModule } from './app-routing.module';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { PanelModule } from 'primeng/primeng';
import { ButtonModule } from 'primeng/primeng';
import { InputTextModule } from 'primeng/primeng';
import { InputSwitchModule } from 'primeng/primeng';
import { MessagesModule } from 'primeng/primeng';
import { MenubarModule } from 'primeng/primeng';
import { ScheduleModule } from 'primeng/primeng';
import { DataTableModule, SharedModule } from 'primeng/primeng';
import { ContextMenuModule } from 'primeng/primeng';
import { ConfirmDialogModule, ConfirmationService } from 'primeng/primeng';
import { GrowlModule } from 'primeng/primeng';
import { DialogModule } from 'primeng/primeng';
import { MaterialModule, MdNativeDateModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { LoginService } from './login/login.service';
import { PasswordResetRequestComponent } from './passwordresetrequest/passwordresetrequest.component';
import { LoginComponent } from './login/login.component';
import { PageNotFoundComponent } from './pagenotfound/pagenotfound.component';
import { PasswordResetRequestService } from './passwordresetrequest/passwordresetrequest.service';
import { AccountComponent } from './account/account.component';
import { AccountService } from './account/account.service';
import { HomeComponent } from './home/home.component';
import { AuthGuard } from './login/auth-guard.service';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProfileComponent } from './profile/profile.component';
import { ProfileService } from './profile/profile.service';
import { UserComponent } from './user/user.component';
import { UserService } from './user/user.service';

@NgModule({
  declarations: [
    AppComponent,
    PasswordResetRequestComponent,
    LoginComponent,
    PageNotFoundComponent,
    AccountComponent,
    HomeComponent,
    DashboardComponent,
    ProfileComponent,
    UserComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    PanelModule,
    InputSwitchModule,
    ButtonModule,
    InputTextModule,
    MaterialModule,
    MessagesModule,
    MenubarModule,
    ScheduleModule,
    DataTableModule,
    SharedModule,
    ContextMenuModule,
    ConfirmDialogModule,
    GrowlModule,
    DialogModule,
    BrowserAnimationsModule,
    AppRoutingModule
  ],
  providers: [
    LoginService,
    AccountService,
    AuthGuard,
    ProfileService,
    UserService,
    ConfirmationService,
    PasswordResetRequestService
    ],
  bootstrap: [AppComponent]
})
export class AppModule { }
