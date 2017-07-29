import { environment } from '../../environments/environment';
import { License } from '../license/license';
import { LoginService } from '../login/login.service';
import { CommonService } from '../shared/commonservice';
import { Employee } from './employee';
import { PhoneNumber } from '../phone-number/phone-number';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class EmployeeService extends CommonService {

  resourceUrl = environment.apiBaseUrl + '/api/employees';

  constructor(
    private http: Http,
    private loginService: LoginService
  ) { super(); }

  getAll(page: number, size: number): Observable<{'result': Employee[], 'count': number}> {
    return this.http.get(this.resourceUrl + this.formatRequestParams(page, size)
      , this.loginService.getRequestOptions())
        .map(response => {
          return {'result': Employee.toArray(response.json()), 'count': +response.headers.get(this.countHeaderName) }
        }).catch(this.handleError);
  }

  create(employee: Employee): Observable<{'result': Employee, 'message': string}> {
    return this.http.post(this.resourceUrl, employee, this.loginService.getRequestOptions())
       .map(
          response => {
            return {'result': new Employee(response.json()), 'message': 'Employee successfully created' }
       }).catch(this.handleError);
  }

  update(employee: Employee): Observable<{'result': Employee, 'message': string}> {
    return this.http.put(this.resourceUrl, employee, this.loginService.getRequestOptions())
        .map(
          response => {
            return {'result': new Employee(response.json()), 'message': 'Employee successfully updated' }
       }).catch(this.handleError);
  }

  deleteOne(id: number) {
    return this.http.delete(this.resourceUrl + '/' + id, this.loginService.getRequestOptions())
          .map(response => {return 'Employee successfully deleted'})
          .catch(this.handleError);
  }

  getOne(id: number): Observable<Employee> {
    return this.http.get(this.resourceUrl + '/' + id, this.loginService.getRequestOptions())
        .map(response => new Employee(response.json()))
        .catch(this.handleError);
  }

  getPhoneNumbers(id: number): Observable<PhoneNumber[]> {
    return this.http.get(this.resourceUrl + '/' + id + '/phone-numbers', this.loginService.getRequestOptions())
      .map(response => PhoneNumber.toArray(response.json()))
      .catch(this.handleError);
  }

  getLicenses(id: number): Observable<License[]> {
     return this.http.get(this.resourceUrl + '/' + id + '/licenses', this.loginService.getRequestOptions())
      .map(response => License.toArray(response.json()))
      .catch(this.handleError);
  }
}
