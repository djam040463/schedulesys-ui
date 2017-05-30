import { environment } from '../../environments/environment';
import { KeyAndPasswordVM } from './keyandpasswordvm';
import { Injectable } from '@angular/core';
import { Http, RequestOptions, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class AccountService {

  private options = new RequestOptions({ headers: new Headers({ 'Content-Type': 'application/json' }) });
  pwdResetUrl = environment.apiBaseUrl + '/api/account/reset_password/finish';
  acntActivationUrl = environment.apiBaseUrl + '/api/account/activate';

  constructor(private http: Http) { }

  resetPassword(keyAndPassword: KeyAndPasswordVM): Observable<string> {
    return this.http.post(this.pwdResetUrl, keyAndPassword, this.options)
            .map(response => response.toString());
  }

  activateAccount(keyAndPassword: KeyAndPasswordVM): Observable<string> {
     return this.http.post(this.acntActivationUrl, keyAndPassword, this.options)
            .map(response => 'Account successfully activated');
  }

}
