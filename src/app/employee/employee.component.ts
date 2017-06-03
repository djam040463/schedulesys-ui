import { EmployeeTypeService } from '../employee-type/employee-type.service';
import { PositionService } from '../position/position.service';
import { CommonComponent } from '../shared/common';
import { Employee } from './employee';
import { EmployeeValidation } from './employee-validation';
import { EmployeeService } from './employee.service';
import { Component, OnInit, ViewChild, AfterViewChecked } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MenuItem, ConfirmationService, Message, SelectItem } from 'primeng/primeng';
import * as _ from 'lodash';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent extends CommonComponent implements OnInit, AfterViewChecked {

  @ViewChild('employeeForm') employeeForm: NgForm;
  employees: Employee[];
  selectedEmployee: Employee;
  employee: Employee;
  positions: SelectItem[] = [];
  employeeTypes: SelectItem[] = [];

  constructor(
    private employeeService: EmployeeService,
    private employeeTypeService: EmployeeTypeService,
    private positionService: PositionService
  ) { super(new EmployeeValidation()); }

  ngOnInit() {
    this.employee = new Employee();
    this.getAllEmployeeTypes();
    this.getAllPositions();
    this.getAll(this.tableCurrentPage, this.tableCurrentRowCount);
  }

  ngAfterViewChecked(): void {
    if (this.dialogDisplayed) {
      this.formChanged(this.employeeForm);
    }
  }

  getAll(page: number, size: number) {
    this.tableDataLoading = true;
    this.employeeService.getAll(page, size)
        .subscribe(
            response => {
              this.employees = response.result;
              this.tableItemsCount = response.count;
              this.tableDataLoading = false;
            }
        );
  }

  getAllEmployeeTypes() {
    this.employeeTypeService.getAll()
        .subscribe(
          response => {
            response.forEach((employeeType) => {
              this.employeeTypes.push({label: employeeType.name, value: employeeType.name});
            })
          })
  }

  getAllPositions() {
    this.positionService.getAll()
         .subscribe(
            response => {
              response.forEach((position) => {
                this.positions.push({label: position.name, value: position.name});
              })
            }
         );
  }

}
