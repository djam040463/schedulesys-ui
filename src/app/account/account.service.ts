import { environment } from '../../environments/environment';
import { KeyAndPasswordVM } from './keyandpasswordvm';
import { Injectable } from '@angular/core';
import { Http, RequestOptions, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class AccountService {

  private options = new RequestOptions({ headers: new Headers({ 'Content-Type': 'application/json' }) });
  resourceUrl = environment.apiBaseUrl + '/api/account/reset_password/finish';

  constructor(private http: Http) { }

  resetPassword(keyAndPassword: KeyAndPasswordVM): Observable<string> {
    return this.http.post(this.resourceUrl, keyAndPassword, this.options)
            .map(response => response.toString());
  }

}
