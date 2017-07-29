import { Employee } from '../employee/employee';
import { EmployeeService } from '../employee/employee.service';
import { LicenseTypeService } from '../license-type/license-type.service';
import { CommonComponent } from '../shared/common';
import { License } from './license';
import { LicenseService } from './license.service';
import { Component, OnInit, ChangeDetectorRef, ViewChild, Input, Output, EventEmitter } from '@angular/core';
import { MenuItem, ConfirmationService, Message, SelectItem } from 'primeng/primeng';
import { NgForm } from '@angular/forms';
import * as _ from 'lodash';

@Component({
  selector: 'app-license',
  templateUrl: './license.component.html',
  styleUrls: ['./license.component.css']
})
export class LicenseComponent extends CommonComponent implements OnInit {

  @Input() employee: Employee;
  licenses: License[] = [];
  license: License;
  selectedLicense: License;
  editing= false;
  displayDialog = false;
  licenseTypes: SelectItem[] = [];
  @ViewChild('licenseForm') licenseForm: NgForm;
  dialogMsgs: Message[] = [];
  @Output() entity_events = new EventEmitter();

  constructor(
    private employeeService: EmployeeService,
    private changeDetector: ChangeDetectorRef,
    private confirmationService: ConfirmationService,
    private licenseTypeService: LicenseTypeService,
    private licenseService: LicenseService
  ) { super(null); }

  ngOnInit() {
    this.license = new License();
  }

  getLicenses() {
    this.employeeService.getLicenses(this.employee.id)
      .subscribe(response => {
        this.licenses = response;
      });
  }

  getLicenseTypes() {
    this.licenseTypeService.getAll()
      .subscribe(response => {
          response.forEach(licenseType => {
            this.licenseTypes.push({label: licenseType.name, value: licenseType.name})
          });
      });
  }

  create() {
    this.license.employee = this.employee;
    this.licenseService.update(this.license)
      .subscribe(
        response => {
          if (!this.editing) {
            this.licenses.push(response);
            this.licenses = this.licenses.slice();
            this.changeDetector.markForCheck();
          } else {
            this.refreshOnEdit(this.license, this.selectedLicense);
          }
          this.displayDialog = false;
          this.entity_events.emit({severity: 'success', summary: '', detail: 'License successfully saved'});
        },
        error => {
          this.displayMessage({severity: 'error', summary: '', detail: error}, this.dialogMsgs);
        }
      );
  }

  deleteOne() {
     this.confirmationService.confirm({
      message: 'Are you sure you want to delete this license ?',
      accept: () => {
        this.licenseService.deleteOne(this.selectedLicense.id)
          .subscribe(
          response => {
            this.licenses = this.licenses.filter((val, i) => val.id !== this.selectedLicense.id);
            this.selectedLicense = undefined;
            this.entity_events.emit({severity: 'success', summary: '', detail: 'License successfully deleted'});
          },
          error => {
            this.entity_events.emit({severity: 'error', summary: '', detail: error});
          }
          );
      }
    });
  }

  showOrHideDialog(editing: boolean) {
    this.editing = editing;
    this.displayDialog = !this.displayDialog;
    if (editing) {
      this.license = _.cloneDeep(this.selectedLicense);
    } else {
      this.license = new License();
      this.licenseForm.resetForm();
      this.getLicenseTypes();
    }
  }

}
