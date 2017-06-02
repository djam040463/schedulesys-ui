import { environment } from '../../environments/environment';
import { LoginService } from '../login/login.service';
import { CareCompanyType } from './care-company-type';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class CareCompanyTypeService {

  private resourceUrl = environment.apiBaseUrl + '/api/care-company-types'

  constructor(
    private http: Http,
    private loginService: LoginService) { }

  getAll(): Observable<CareCompanyType[]> {
    return this.http.get(this.resourceUrl, this.loginService.getRequestOptions())
            .map(response => CareCompanyType.toArray(response.json()));
  }

}
