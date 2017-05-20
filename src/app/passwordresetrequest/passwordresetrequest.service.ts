import { environment } from '../../environments/environment';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';

@Injectable()
export class PasswordResetRequestService {
  private resourceUrl = environment.apiBaseUrl + '/api/account/reset_password/init';

  constructor(private http: Http) { }

  sendPasswordResetRequest(email: string): Observable<string> {
    return this.http.post(this.resourceUrl, email)
        .map(response => response.toString());
  }
}
