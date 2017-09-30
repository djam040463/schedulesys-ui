import { environment } from '../../environments/environment';
import { License } from '../license/license';
import { CommonService } from '../shared/commonservice';
import { Employee } from './employee';
import { PhoneNumber } from '../phone-number/phone-number';
import { TestOccurrence } from '../test-occurrence/testoccurrence';
import { Test } from '../test/test';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class EmployeeService extends CommonService {

  resourceUrl = environment.apiBaseUrl + '/api/employees';

  constructor(private http: HttpClient) { super(); }

  getAll(page: number, size: number): Observable<{'result': Employee[], 'count': number}> {
    return this.http.get(this.resourceUrl + this.formatRequestParams(page, size), {observe: 'response'})
        .map(response => {
          return {'result': response.body as Employee[], 'count': +response.headers.get(this.countHeaderName) }
        }).catch(this.handleError);
  }

  create(employee: Employee): Observable<{'result': Employee, 'message': string}> {
    return this.http.post(this.resourceUrl, employee)
       .map(
          response => {
            return {'result': response as Employee, 'message': 'Employee successfully created' }
       }).catch(this.handleError);
  }

  update(employee: Employee): Observable<{'result': Employee, 'message': string}> {
    return this.http.put(this.resourceUrl, employee)
        .map(
          response => {
            return {'result': response as Employee, 'message': 'Employee successfully updated' }
       }).catch(this.handleError);
  }

  deleteOne(id: number) {
    return this.http.delete(this.resourceUrl + '/' + id)
          .map(response => {return 'Employee successfully deleted'})
          .catch(this.handleError);
  }

  getOne(id: number): Observable<Employee> {
    return this.http.get(this.resourceUrl + '/' + id)
        .map(response => response as Employee)
        .catch(this.handleError);
  }

  getPhoneNumbers(id: number): Observable<PhoneNumber[]> {
    return this.http.get(this.resourceUrl + '/' + id + '/phone-numbers')
      .map(response => response as PhoneNumber[])
      .catch(this.handleError);
  }

  getLicenses(id: number): Observable<License[]> {
     return this.http.get(this.resourceUrl + '/' + id + '/licenses')
      .map(response => response as License[])
      .catch(this.handleError);
  }

   getTests(id: number): Observable<TestOccurrence[]> {
     return this.http.get(this.resourceUrl + '/' + id + '/tests')
      .map(response => response as TestOccurrence[])
      .catch(this.handleError);
  }

  search(query: string): Observable<Employee[]> {
    return this.http.get(this.resourceUrl + '/search' + this.formatSearchRequestParam(query))
        .map(response => response as Employee[])
        .catch(this.handleError);
  }

}
