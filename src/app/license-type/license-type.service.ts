import { environment } from '../../environments/environment';
import { LoginService } from '../login/login.service';
import { CommonService } from '../shared/commonservice';
import { LicenseType } from './license.type';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class LicenseTypeService extends CommonService {

  resourceUrl = environment.apiBaseUrl + '/api/license-types'
  constructor(
    private http: Http,
    private loginService: LoginService) {super(); }

  getAll(): Observable<LicenseType[]> {
    return this.http.get(this.resourceUrl, this.loginService.getRequestOptions())
        .map(response => LicenseType.toArray(response.json()))
        .catch(this.handleError);
  }
}
