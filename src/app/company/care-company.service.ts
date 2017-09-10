import { environment } from '../../environments/environment';
import { LoginService } from '../login/login.service';
import { Schedule } from '../schedule/schedule';
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

  getAll(page: number, size: number): Observable<{'companies': CareCompany[], 'count': number}> {
    return this.http.get(this.resourceUrl + this.formatRequestParams(page, size), this.loginService.getRequestOptions())
          .map(response =>  {
            return {'companies': CareCompany.toArray(response.json()), 'count': response.headers.get(this.countHeaderName)}
            })
          .catch(this.handleError);
  }

  create(careCompany: CareCompany): Observable<{'result': CareCompany, 'message': string}> {
    return this.http.post(this.resourceUrl, careCompany, this.loginService.getRequestOptions())
          .map(response =>  {
              return {'result': new CareCompany(response.json()), 'message': 'Care Company successfully created'}
            })
          .catch(this.handleError);
  }

  update(careCompany: CareCompany): Observable<{'result': CareCompany, 'message': string}> {
    return this.http.put(this.resourceUrl, careCompany, this.loginService.getRequestOptions())
          .map(response =>  {
              return {'result': new CareCompany(response.json()), 'message': 'Care Company successfully updated'}
            })
  }

  deleteOne(id: number): Observable<string> {
    return this.http.delete(this.resourceUrl + '/' + id, this.loginService.getRequestOptions())
          .map(response => {return 'Care Company successfully deleted'})
          .catch(this.handleError);
  }

  getOne(idOrname: string): Observable<CareCompany> {
    return this.http.get(this.resourceUrl + '/' + idOrname, this.loginService.getRequestOptions())
           .map(response => new CareCompany(response.json()))
           .catch(this.handleError);
  }

  getSchedules(id: number, page: number, size: number): Observable<{'schedules': Schedule[], 'count': number}> {
    return this.http.get(this.resourceUrl + '/' + id + '/schedules' + this.formatRequestParams(page, size),
       this.loginService.getRequestOptions())
          .map(response => { return {'schedules': Schedule.toArray(response.json()), 'count': response.headers.get(this.countHeaderName)}
          }).catch(this.handleError);
  }


}
