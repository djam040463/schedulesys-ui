import { environment } from '../../environments/environment';
import { LoginService } from '../login/login.service';
import { CommonService } from '../shared/commonservice';
import { EmployeeType } from './employee-type';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class EmployeeTypeService extends CommonService {

  resourceUrl = environment.apiBaseUrl + '/api/employee-types';

  constructor(
    private http: Http,
    private loginService: LoginService
  ) { super(); }


  getAll(page: number, size: number): Observable<{'result': EmployeeType[], 'count': number}> ;

  getAll(): Observable<EmployeeType[]> ;

  getAll(page?: number, size?: number) {
    const pageable = (page != null && size != null);
    const result: Observable<any> =  pageable ?
        this.http.get(this.resourceUrl + this.formatRequestParams(page, size)
      , this.loginService.getRequestOptions()) :
        this.http.get(this.resourceUrl, this.loginService.getRequestOptions());
    return result.map(
        response => {
            return pageable ? {'result': EmployeeType.toArray(response.json()),
                   'count': +response.headers.get(this.countHeaderName)}
                   :  EmployeeType.toArray(response.json())
        }
      ).catch(this.handleError);
  }

}
