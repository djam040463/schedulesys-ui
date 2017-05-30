import { CareCompany } from '../company/care-company';
import { CareCompanyService } from '../company/care-company.service';
import { Contact } from './contact';
import { ContactService } from './contact.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {

  careCompany: CareCompany;
  contacts: Contact[];
  contactsCount: number;

  constructor(
    private careCompanyService: CareCompanyService,
    private route: ActivatedRoute,
    private contactService: ContactService) { }

  ngOnInit() {
    this.route.params
      .map(params => params['companyId'])
      .subscribe(companyId => {
        this.careCompanyService.getCareCompany(companyId)
            .subscribe(result => {
              this.careCompany = result,
              this.getContacts(result.id); });
      });

  }

  getContacts(companyId: number) {
   this.contactService.getAll(companyId)
      .subscribe(response => {this.contacts = response})

  }

}
