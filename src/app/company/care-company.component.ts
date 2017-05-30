import { Common } from '../shared/common';
import { CareCompany } from './care-company';
import { CareCompanyTypeService } from './care-company-type.service';
import { CareCompanyService } from './care-company.service';
import { Validation } from './validation';
import { Component, OnInit, ViewChild, AfterViewChecked } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router, ActivatedRoute, Params } from '@angular/router';
import 'rxjs/add/operator/switchMap';
import { MenuItem, ConfirmationService, Message, SelectItem, LazyLoadEvent } from 'primeng/primeng';

@Component({
  selector: 'care-company',
  templateUrl: './care-company.component.html',
  styleUrls: ['./care-company.component.css']
})
export class CareCompanyComponent extends Common implements OnInit, AfterViewChecked {

  @ViewChild('companyForm') companyForm: NgForm;
  careCompanies: CareCompany[];
  msgs: Message[] = [];
  selectedCompany: CareCompany;
  contextMenuItems: MenuItem[];
  display: boolean;
  editing: boolean;
  validation: Validation;
  careCompany: CareCompany;
  careCompanyTypes: SelectItem[] = [];
  companiesCount: number;
  tableCurrentPage = 0;
  tableCurrentRowCount = 10;

  phoneNumberMask =  ['(', /[1-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/];

  constructor(
      private careCompanyService: CareCompanyService,
      private careCompanyTypeService: CareCompanyTypeService,
      private confirmationService: ConfirmationService,
      private router: Router,
      private route: ActivatedRoute) { super(); }

  ngOnInit() {
    this.getAll(this.tableCurrentPage, this.tableCurrentRowCount);
    this.buildContextMenuItems();
    this.getAllCareCompanyTypes();
    this.validation = new Validation();
    this.careCompany = new CareCompany(null);
  }

  ngAfterViewChecked(): void {
    this.formChanged(this.companyForm, this.validation.formErrors,
      this.validation.validationMessages);
  }

  private buildContextMenuItems () {
    this.contextMenuItems = [
            { label: 'Edit'     , icon: 'fa-edit'          , command: (event) => {this.showDialog(true)}       },
            { label: 'Delete'   , icon: 'fa-close'         , command: (event) => {this.deleteCareCompany()}    },
            { label: 'Schedules', icon: 'fa-calendar'      , command: (event) => {this.navigateTo('../schedules')}},
            { label: 'Contacts' , icon: 'fa-address-book-o', command: (event) => {this.navigateTo('../contacts')} }
        ];
  } // TODO Move logic into Common

  createOrUpdateCareCompany() {
    this.careCompany.phoneNumber = this.unmaskNumber(this.careCompany.phoneNumber);
    this.careCompany.fax = this.unmaskNumber(this.careCompany.fax);
    if (this.editing) {
      this.update();
    } else {
      this.create();
    }
  }
// TODO Use Only one method for creating and updating
  update() {
    this.careCompanyService.update(this.careCompany)
      .subscribe(
        response => {
          this.displayMessage({severity: 'success', summary: '', detail: response}, this.msgs);
           this.hideDialog();
           this.getAll(this.tableCurrentPage, this.tableCurrentRowCount);
        },
        error => {
          this.displayMessage({severity: 'error', summary: '', detail: error}, this.msgs);
        });
  }

  create() {
     this.careCompanyService.update(this.careCompany)
      .subscribe(
        response => {
          this.displayMessage({severity: 'success', summary: '', detail: response}, this.msgs);
           this.hideDialog();
           this.getAll(this.tableCurrentPage, this.tableCurrentRowCount);
        },
        error => {
          this.displayMessage({severity: 'error', summary: '', detail: error}, this.msgs);
     });
  }

  deleteCareCompany () {
     this.confirmationService.confirm({
       message: 'Are you sure you want to delete this company ?',
       accept: () => { console.log('Deleting user');
        this.careCompanyService.deleteCareCompany(this.selectedCompany.id)
          .subscribe(
            response  => {
              this.displayMessage(
                { severity: 'success', summary: '', detail: 'User successfully deleted'}, this.msgs);
                this.selectedCompany = undefined; // Disables 'Edit' and 'Delete' buttons
                console.log('Row count : ' + this.tableCurrentRowCount);
                this.getAll(this.tableCurrentPage, this.tableCurrentRowCount) // Refreshes dataTable
            },
            error => {
                this.displayMessage({ severity: 'error', summary: '', detail: error}, this.msgs);
            }
          );
       }
    });
  }

  showDialog(editing: boolean) {
     this.display = true;
     this.editing = editing;
    // When editing, populate form with selected User
     this.careCompany = editing ? {... this.selectedCompany,
       careCompanyType: {... this.selectedCompany.careCompanyType}} : new CareCompany(null);
  }

   hideDialog() {
    this.display = false;
    if (this.editing) {
      this.selectedCompany = {... this.careCompany,
          careCompanyType: {... this.careCompany.careCompanyType}}; // Refresh dataTable after user update
    }
    this.companyForm.resetForm();
  }

  private getAllCareCompanyTypes() {
    this.careCompanyTypeService.getAllCareCompanyTypes()
        .subscribe(
          response => {
            for (let i = 0; i < response.length; i++) {
               this.careCompanyTypes.push({label: response[i].name, value: response[i].name});
            }
          });
  }

  private getAll(page: number, size: number) {
     this.careCompanyService.getAllCareCompanies(page, size)
          .subscribe(response => {
              this.careCompanies = response.companies;
              this.companiesCount = response.count;
          });
  }

  loadCompanyLazy(event: LazyLoadEvent) {
    this.tableCurrentPage = (event.first / event.rows);
    this.tableCurrentRowCount = event.rows;
   // this.selectedCompany = undefined;
    this.getAll(this.tableCurrentPage, this.tableCurrentRowCount);
  }

 onDuplicates(event: any) {
    this.validation.formErrors[event.field] = event.message;
  } // TODO Move to Common

  navigateTo(destionation: string) {
    this.router.navigate([destionation, this.selectedCompany.id], {relativeTo: this.route})
  }

}
