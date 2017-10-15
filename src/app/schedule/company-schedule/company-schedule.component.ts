import { CareCompany } from '../../company/care-company';
import { CareCompanyService } from '../../company/care-company.service';
import { Employee } from '../../employee/employee';
import { EmployeeService } from '../../employee/employee.service';
import { CommonComponent } from '../../shared/common';
import { Schedule } from '../schedule';
import { SchedulePostStatusService } from '../schedule-post-status.service';
import { ScheduleStatusService } from '../schedule-status.service';
import { ScheduleService } from '../schedule.service';
import { SchedulePostStatus } from '../schedulepoststatus';
import { ScheduleStatus } from '../schedulestatus';
import { ScheduleType } from '../scheduletype';
import { Component, OnInit, Input, AfterViewInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MenuItem, ConfirmationService, Message, SelectItem, LazyLoadEvent } from 'primeng/primeng';
import * as _ from 'lodash';

@Component({
  selector: 'app-company-schedule',
  templateUrl: './company-schedule.component.html',
  styleUrls: ['./company-schedule.component.css']
})
export class CompanyScheduleComponent extends CommonComponent implements OnInit {

  schedules: Schedule[] = [];
  selectedSchedule: Schedule;
  schedule: Schedule;
  editing = false;
  displayDialog = false;
  showScheduleDetail = false
  employees: Employee[] = [];
  scheduleStatuses: SelectItem[] = [];
  schedulePostStatuses: SelectItem[] = [];
  dialogMsgs: Message[] = [];
  minSelectableDate = new Date();
  defaultDate = new Date();
  scheduleType = ScheduleType.COMPANY;

  @ViewChild(NgForm)
  scheduleForm: NgForm;

  @Input()
  careCompany: CareCompany;

  constructor(
    private changeDetector: ChangeDetectorRef,
    private careCompanyService: CareCompanyService,
    private confirmationService: ConfirmationService,
    private scheduleService: ScheduleService,
    private employeeService: EmployeeService,
    private scheduleStatusService: ScheduleStatusService,
    private schedulePostStatusService: SchedulePostStatusService
  ) { super(null); }

  ngOnInit() {
    this.getSchedules();
    this.schedule = new Schedule();
    this.getScheduleStatuses();
    this.getSchedulePostStatuses();
    this.defaultDate.setMinutes(0); // Reset minutes of current date so that shift times are 30 minutes apart
  }

  getSchedules() {
    this.careCompanyService.getSchedules(this.careCompany.id, this.tableCurrentPage, this.tableCurrentRowCount)
        .subscribe(response => {this.schedules = response.schedules, this.tableItemsCount = response.count});
  }

  getScheduleStatuses() {
    this.scheduleStatusService.getAll()
      .subscribe(response => {
        response.forEach((status, i) => {
          this.scheduleStatuses.push({label: status.name, value: status.name});
        });
      });
  }

  getSchedulePostStatuses() {
    this.schedulePostStatusService.getAll()
      .subscribe(response => {
        response.forEach((status, i) => {
          this.schedulePostStatuses.push({label: status.name, value: status.name});
        });
      });
  }

  create() {
  // TODO Add support for schedules that span on multiple days
    if (!this.validateShiftDates()) {
      return;
    }
    this.schedule.careCompany = this.careCompany;
    this.scheduleService.update(this.schedule)
      .subscribe(
        response => {
          if (!this.editing) {
            this.schedules.push(response);
            this.schedules = this.schedules.slice();
            this.changeDetector.markForCheck();
            // Update number of items so that the paginator displays the correct number of pages
            this.tableItemsCount++;
         } else {
            this.refreshOnEdit(this.schedule, this.selectedSchedule);
         }
         this.displayDialog = false;
         this.displayMessage({severity: 'success', summary: '', detail: 'Schedule successfully saved'});
        },
        error => {
           this.displayMessage({severity: 'error', summary: '', detail: error}, this.dialogMsgs);
        }
      );
    console.log('Schedule : ' + JSON.stringify(this.schedule));
    console.log('Hours : ' + new Date(this.schedule.shiftEndTime));
  }

   deleteSchedule () {
     this.confirmationService.confirm({
       message: 'Are you sure you want to delete this schedule ?',
       accept: () => {
        this.scheduleService.deleteOne(this.selectedSchedule.id)
          .subscribe(
            response  => {
              this.displayMessage({ severity: 'success', summary: '', detail: response});
                this.schedules = this.schedules.filter((val, i) => val.id !== this.selectedSchedule.id); // Refreshes dataTable
                this.selectedSchedule = undefined; // Disables 'Edit' and 'Delete' buttons
                // Update number of items so that the paginator displays the correct number of pages
                this.tableItemsCount--;
                if (this.schedules.length === 0) {
                  // Goes back to adjacent page when the last item in the list is deleted
                  this.getAll(this.tableCurrentPage - 1, this.tableCurrentRowCount);
                }
            },
            error => {
                this.displayMessage({ severity: 'error', summary: '', detail: error });
            }
          );
       }
    });
  }

  showOrHideDialog(editing: boolean) {
      this.editing = editing;
      this.displayDialog = !this.displayDialog;
      if (editing) {
        this.schedule = _.cloneDeep(this.selectedSchedule);
      } else {
        this.schedule = new Schedule();
        this.scheduleForm.resetForm();
      }
  }

  onRowDblClick() {
    this.changeDisplayPreference();
  }

  onBackBtnClick() {
    this.changeDisplayPreference();
  }

  private changeDisplayPreference() {
    this.showScheduleDetail = !this.showScheduleDetail;
  }

  searchEmployees(event) {
    const query = event.query;
    this.employeeService.search(query)
      .subscribe(response => {
        response.forEach((employee , i) => {
          employee.firstName += ' ' + employee.lastName; // Combine first and last names for easy display
        });
        this.employees = response;
        // TODO Revise this ? Use a ViewModel wrapping 'Employee'
      });
  }

  validateShiftDates(): boolean {
    if (this.schedule.shiftEndTime.getTime() <= this.schedule.shiftStartTime.getTime()) {
        this.displayMessage({severity: 'error', summary: 'Invalid shift times', detail: 'Start Time must be before End Time'}
        , this.dialogMsgs);
      return false;
    }
    return true;
  }

}
