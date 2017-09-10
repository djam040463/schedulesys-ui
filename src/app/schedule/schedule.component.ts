import { CareCompany } from '../company/care-company';
import { CareCompanyService } from '../company/care-company.service';
import { EmployeeService } from '../employee/employee.service';
import { CommonComponent } from '../shared/common';
import { ScheduleType } from './scheduletype';
import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.css']
})
export class ScheduleComponent extends CommonComponent implements OnInit {

  scheduleType: string ;
  careCompany: CareCompany;

  constructor(
      private careCompanyService: CareCompanyService,
      private employeeService: EmployeeService,
      private router: Router,
      private route: ActivatedRoute,
      private changeDetector: ChangeDetectorRef
  ) { super(null); }

  ngOnInit() {
  this.route.params
      .subscribe(params => {
        if (params['id'] != null) {
          this.scheduleType = params['scheduleType'];
          if (this.scheduleType === ScheduleType.CAMPANY) {
            // Get schedules for company
            this.getCareCompany(params['id']);
          } else {
            // Get schedule for employee
          }
        } else {
          // Get schedule for all companies;
        }
      });
  }

  getCareCompany(id: string) {
    this.careCompanyService.getOne(id)
    .subscribe(response => {this.careCompany = response});
  }

}
