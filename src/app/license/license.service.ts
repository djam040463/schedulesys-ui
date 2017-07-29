import { environment } from '../../environments/environment';
import { LoginService } from '../login/login.service';
import { CommonService } from '../shared/commonservice';
import { License } from './license';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class LicenseService extends CommonService {

  resourceUrl = environment.apiBaseUrl + '/api/licenses';
  constructor(
    private http: Http,
    private loginService: LoginService
  ) { super(); }

  update(license: License): Observable<License> {
    return this.http.put(this.resourceUrl, license, this.loginService.getRequestOptions())
      .map(response => new License(response.json()))
      .catch(this.handleError);
  }

  deleteOne(id: number): Observable<string> {
    return this.http.delete(this.resourceUrl + '/' + id, this.loginService.getRequestOptions())
      .map(response => 'License successfully deleted')
      .catch(this.handleError);
  }
}
