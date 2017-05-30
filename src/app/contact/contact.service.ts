import { environment } from '../../environments/environment';
import { LoginService } from '../login/login.service';
import { CommonService } from '../shared/commonservice';
import { Contact } from './contact';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class ContactService extends CommonService {

  private companyResourceUrl = environment.apiBaseUrl + '/api/care-companies';
  private contactResourceUrl = environment.apiBaseUrl + '/api/contacts';

  constructor(
    private http: Http,
    private loginService: LoginService) { super(); }

  getAll(companyId: number): Observable<Contact[]> {
    return this.http.get(this.companyResourceUrl + '/' + companyId + '/contacts',
        this.loginService.getRequestOptions())
            .map(response => Contact.toArray(response.json()))
            .catch(this.handleError);
  }

  create(contact: Contact): Observable<string> {
    return this.http.post(this.contactResourceUrl, contact, this.loginService.getRequestOptions())
          .map(response => 'Contact successfully created')
          .catch(this.handleError);
  }

  update(contact: Contact): Observable<string> {
    return this.http.put(this.contactResourceUrl, contact, this.loginService.getRequestOptions())
          .map(response => 'Contact successfully updated')
          .catch(this.handleError);
  }

  deleteContact(id: number): Observable<string> {
    return this.http.delete(this.contactResourceUrl + '/' + id, this.loginService.getRequestOptions())
          .map(response => 'Contact successfully deleted')
          .catch(this.handleError);
  }

}
