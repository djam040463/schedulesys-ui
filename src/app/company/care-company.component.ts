import { CommonComponent } from '../shared/common';
import { CareCompany } from './care-company';
import { CareCompanyTypeService } from './care-company-type.service';
import { CareCompanyService } from './care-company.service';
import { CareCompanyValidation } from './validation';
import { Component, OnInit, ViewChild, AfterViewChecked } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router, ActivatedRoute, Params } from '@angular/router';
import 'rxjs/add/operator/switchMap';
import { MenuItem, ConfirmationService, Message, SelectItem, LazyLoadEvent } from 'primeng/primeng';
import * as _ from 'lodash';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'care-company',
  templateUrl: './care-company.component.html',
  styleUrls: ['./care-company.component.css']
})
export class CareCompanyComponent extends CommonComponent implements OnInit, AfterViewChecked {

  @ViewChild('companyForm') companyForm: NgForm;
  careCompanies: CareCompany[];
  selectedCompany: CareCompany;
  careCompany: CareCompany;
  careCompanyTypes: SelectItem[] = [];

  constructor(
      private careCompanyService: CareCompanyService,
      private careCompanyTypeService: CareCompanyTypeService,
      private confirmationService: ConfirmationService,
      private router: Router,
      private route: ActivatedRoute) {
        super(new CareCompanyValidation());
      }

  ngOnInit() {
    this.getAll(this.tableCurrentPage, this.tableCurrentRowCount);
    this.buildContextMenuItems();
    this.getAllCareCompanyTypes();
    this.careCompany = new CareCompany(null);
  }

  ngAfterViewChecked(): void {
    if (this.dialogDisplayed) {
      this.formChanged(this.companyForm);
    }
  }

  private buildContextMenuItems () {
    this.contextMenuItems = [
            { label: 'Edit'     , icon: 'fa-edit'          , command: (event) => {this.showDialog(true)}       },
            { label: 'Delete'   , icon: 'fa-close'         , command: (event) => {this.deleteCareCompany()}    },
            { label: 'Schedules', icon: 'fa-calendar'      , command: (event) => {this.navigateTo('../schedules')}},
            { label: 'Contacts' , icon: 'fa-address-book-o', command: (event) => {this.navigateTo('../contacts')} }
        ];
  }
// TODO Add http wrapper and check 401 errors. If jwt has expired, then redirect to login
  // TODO 'New' does not refresh data table
  create() {
    this.careCompany.phoneNumber = this.unmaskNumber(this.careCompany.phoneNumber);
    this.careCompany.fax = this.unmaskNumber(this.careCompany.fax);
    const result: Observable<string> = this.editing ? this.careCompanyService.update(this.careCompany)
      : this.careCompanyService.create(this.careCompany);
    result.subscribe(
       response => {
         this.displayMessage({severity: 'success', summary: '', detail: response});
         this.hideDialog();
         if (!this.editing) {
            this.careCompanies.push(this.careCompany);
            // Update number of items so that the paginator displays the correct number of pages
            this.tableItemsCount++;
         }
       },
       error => {
        this.displayMessage({severity: 'error', summary: '', detail: error});
      }
     );
  }

  deleteCareCompany () {
     this.confirmationService.confirm({
       message: 'Are you sure you want to delete this company ?',
       accept: () => {
        this.careCompanyService.deleteCareCompany(this.selectedCompany.id)
          .subscribe(
            response  => {
              this.displayMessage(
                { severity: 'success', summary: '', detail: 'User successfully deleted'});
                const selectedCompanyIndex = this.findSelectedCompanyIndex();
                this.careCompanies = this.careCompanies.filter((val, i) =>  i !== selectedCompanyIndex); // Refreshes dataTable
                this.selectedCompany = undefined; // Disables 'Edit' and 'Delete' buttons
                // Update number of items so that the paginator displays the correct number of pages
                this.tableItemsCount--;
                if (this.careCompanies.length === 0) {
                  // Goes back to first page when the last item in the list is deleted
                  this.getAll(0, this.tableCurrentRowCount);
                }
            },
            error => {
                this.displayMessage({ severity: 'error', summary: '', detail: error });
            }
          );
       }
    });
  }

  showDialog(editing: boolean) {
     this.dialogDisplayed = true;
     this.editing = editing;
    // When editing, populate form with selected User
     this.careCompany = editing ? _.cloneDeep(this.selectedCompany)
       : new CareCompany(null);
  }

   hideDialog() {
    this.dialogDisplayed = false;
    if (this.editing) {
      this.refreshOnEdit(this.careCompany, this.selectedCompany) // Refresh dataTable after company update
    }
    this.companyForm.resetForm();
  }

  private getAllCareCompanyTypes() {
    this.careCompanyTypeService.getAll()
        .subscribe(
          response => {
            response.forEach((careCompanyType, i) => {
              this.careCompanyTypes.push({label: careCompanyType.name, value: careCompanyType.name});
            });
          });
  }

  getAll(page: number, size: number) {
     this.careCompanyService.getAllCareCompanies(page, size)
          .subscribe(response => {
              this.careCompanies = response.companies;
              this.tableItemsCount = response.count;
          });
  }

  navigateTo(destionation: string) {
    this.router.navigate([destionation, this.selectedCompany.id], {relativeTo: this.route})
  }

  findSelectedCompanyIndex() {
     let index = -1;
     this.careCompanies.forEach((careCompany, i) => {
      if (this.selectedCompany.id === careCompany.id) {
        index = i;
      }
     });
    return index;
  }
}
