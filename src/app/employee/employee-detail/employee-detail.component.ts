import { LicenseTypeService } from '../../license-type/license-type.service';
import { License } from '../../license/license';
import { LicenseComponent } from '../../license/license.component';
import { LicenseService } from '../../license/license.service';
import { PhoneNumber } from '../../phone-number/phone-number';
import { PhoneNumberComponent } from '../../phone-number/phone-number.component';
import { PhoneNumberService } from '../../phone-number/phone-number.service';
import { PhoneNumberType } from '../../phone-number/phone-number.type';
import { PhoneNumberLabel } from '../../phone-number/phone-number.label';
import { CommonComponent } from '../../shared/common';
import { Employee } from '../employee';
import { EmployeeService } from '../employee.service';
import { Component, OnInit, ChangeDetectorRef, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MenuItem, ConfirmationService, Message, SelectItem } from 'primeng/primeng';
import * as _ from 'lodash';

@Component({
  selector: 'app-employee-detail',
  templateUrl: './employee-detail.component.html',
  styleUrls: ['./employee-detail.component.css']
})
export class EmployeeDetailComponent extends CommonComponent implements OnInit {

  employee: Employee;

  @ViewChild(PhoneNumberComponent)
  phoneNumberComponent: PhoneNumberComponent;

  @ViewChild(LicenseComponent)
  licenseComponent: LicenseComponent;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private employeeService: EmployeeService
  ) { super(null); }

  ngOnInit() {
    this.route.params
      .map(params => params['employeeId'])
      .subscribe(employeeId => {
        this.employeeService.getOne(employeeId)
          .subscribe(
            result => {
              this.employee = result;
          });
      });
  }

  onTabOpen(e) {
    if (e.index === 0 && this.phoneNumberComponent.phoneNumbers.length === 0) {
      this.phoneNumberComponent.getPhoneNumbers();
    } else if (e.index === 3 && this.licenseComponent.licenses.length === 0) {// The License component is loaded 3rd
      this.licenseComponent.getLicenses();
    }
  }

  onEntityEvent(e: Message) {
    this.displayMessage(e);
  }

  onBackClick(): void {
    this.router.navigate(['../../employees', { 'id': this.employee.id }], { relativeTo: this.route });
  }

}
