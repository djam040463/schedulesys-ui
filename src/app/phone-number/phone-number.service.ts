import { environment } from '../../environments/environment';
import { LoginService } from '../login/login.service';
import { CommonService } from '../shared/commonservice';
import { PhoneNumber } from './phone-number';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class PhoneNumberService extends CommonService {

  resourceUrl = environment.apiBaseUrl + '/api/phone-numbers';
  constructor(
    private http: Http,
    private loginService: LoginService) {super(); }

  update(phoneNumber: PhoneNumber): Observable<PhoneNumber> {
      return this.http.put(this.resourceUrl, phoneNumber, this.loginService.getRequestOptions())
          .map(response => new PhoneNumber(response.json()))
          .catch(this.handleError);
  }

  deleteOne(id: number) {
     return this.http.delete(this.resourceUrl + '/' + id, this.loginService.getRequestOptions())
          .map(response => {return 'Phone Number successfully deleted'})
          .catch(this.handleError);
  }
}
