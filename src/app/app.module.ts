import { AppRoutingModule } from './app-routing.module';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ErrorHandler } from '@angular/core';
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
import { DropdownModule } from 'primeng/primeng';
import { TextMaskModule } from 'angular2-text-mask';
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
import { CareCompanyTypeService } from './company/care-company-type.service';
import { HomeComponent } from './home/home.component';
import { AuthGuard } from './login/auth-guard.service';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProfileComponent } from './profile/profile.component';
import { ProfileService } from './profile/profile.service';
import { EmailAddressInUseValidatorDirective } from './shared/emailaddress-in-use.directive';
import { GlobalErrorHandler } from './shared/global-error.handler';
import { InputRegexDirective } from './shared/input-regex.directive';
import { UsernameInUseValidatorDirective } from './shared/username-in-use.directive';
import { UserComponent } from './user/user.component';
import { UserService } from './user/user.service';
import { UserRoleService } from './user/userrole.service';
import { CareCompanyComponent } from './company/care-company.component';
import { CareCompanyService } from './company/care-company.service';
import { CareCompanyNameInUseDirective } from './shared/care-company-name-in-usedirective';
import { PhoneNumberPipe } from './shared/phonenumber.pipe';
import { ContactComponent } from './contact/contact.component';
import { ContactService } from './contact/contact.service';
import { DataTableCrudComponent } from './data-table-crud/data-table-crud.component';
import { DialogCrudComponent } from './dialog-crud/dialog-crud.component';
import { EmployeeComponent } from './employee/employee.component';
import { PositionComponent } from './position/position.component';
import { EmployeeTypeComponent } from './employee-type/employee-type.component';
import { EmployeeTypeService } from './employee-type/employee-type.service';
import { EmployeeService } from './employee/employee.service';
import { PositionService } from './position/position.service';


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
    UserComponent,
    UsernameInUseValidatorDirective,
    EmailAddressInUseValidatorDirective,
    InputRegexDirective,
    CareCompanyNameInUseDirective,
    PhoneNumberPipe,
    CareCompanyComponent,
    ContactComponent,
    DataTableCrudComponent,
    DialogCrudComponent,
    EmployeeComponent,
    PositionComponent,
    EmployeeTypeComponent
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
    DropdownModule,
    TextMaskModule,
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
    UserRoleService,
    CareCompanyService,
    CareCompanyTypeService,
    ContactService,
    EmployeeService,
    EmployeeTypeService,
    PositionService,
    PasswordResetRequestService,
    {
      provide: ErrorHandler,
      useClass: GlobalErrorHandler
    }
    ],
  bootstrap: [AppComponent]
})
export class AppModule { }
