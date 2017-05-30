import { environment } from '../../environments/environment';
import { LoginService } from '../login/login.service';
import { CommonService } from '../shared/commonservice';
import { CareCompany } from './care-company';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class CareCompanyService extends CommonService {

  private resourceUrl = environment.apiBaseUrl + '/api/care-companies';

  constructor(
    private http: Http,
    private loginService: LoginService) {super(); }

  getAllCareCompanies(page: number, size: number): Observable<{'companies': CareCompany[], 'count': number}> {
    return this.http.get(this.resourceUrl + '?page=' + page + '&size=' + size, this.loginService.getRequestOptions())
          .map(response =>  {
            return {'companies': CareCompany.toArray(response.json()), 'count': response.headers.get(this.countHeaderName)}
            })
          .catch(this.handleError);
  }

  create(careCompany: CareCompany): Observable<string> {
    return this.http.post(this.resourceUrl, careCompany, this.loginService.getRequestOptions())
          .map(response => {return 'Care Company successfully created'})
          .catch(this.handleError);
  }

  update(careCompany: CareCompany): Observable<string> {
    return this.http.put(this.resourceUrl, careCompany, this.loginService.getRequestOptions())
          .map(response => {return 'Care Company successfully updated'})
          .catch(this.handleError);
  }

  deleteCareCompany(id: number): Observable<string> {
    return this.http.delete(this.resourceUrl + '/' + id, this.loginService.getRequestOptions())
          .map(response => {return 'Care Company successfully deleted'})
          .catch(this.handleError);
  }

  getCareCompany(idOrname: string): Observable<CareCompany> {
    return this.http.get(this.resourceUrl + '/' + idOrname, this.loginService.getRequestOptions())
           .map(response => new CareCompany(response.json()))
           .catch(this.handleError);
  }


}
