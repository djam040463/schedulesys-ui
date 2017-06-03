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

  getAll(page: number, size: number, companyId: number): Observable<{'result': Contact[], 'count': number}> {
    return this.http.get(this.companyResourceUrl + '/' + companyId + '/contacts' + this.formatRequestParams(page, size),
        this.loginService.getRequestOptions())
            .map(response => {return {'result': Contact.toArray(response.json()), 'count': response.headers.get(this.countHeaderName)}})
            .catch(this.handleError);
  }

  create(contact: Contact): Observable<{'result': Contact, 'message': string}> {
    return this.http.post(this.contactResourceUrl, contact, this.loginService.getRequestOptions())
          .map(response => {
            return {'result': new Contact(response.json()), 'message': 'Contact successfully created'}
          })
          .catch(this.handleError);
  }

  update(contact: Contact): Observable<{'result': Contact, 'message': string}> {
    return this.http.put(this.contactResourceUrl, contact, this.loginService.getRequestOptions())
          .map(response => {
            return {'result': new Contact(response.json()), 'message': 'Contact successfully updated'}
          })
          .catch(this.handleError);
  }

  deleteContact(id: number): Observable<string> {
    return this.http.delete(this.contactResourceUrl + '/' + id, this.loginService.getRequestOptions())
          .map(response => 'Contact successfully deleted')
          .catch(this.handleError);
  }

}
