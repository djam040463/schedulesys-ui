import { environment } from '../../environments/environment';
import { LoginService } from '../login/login.service';
import { CommonService } from '../shared/commonservice';
import { TestSubcategoryComponent } from '../test-subcategory/test-subcategory.component';
import { TestSubcategory } from '../test-subcategory/testsubcategory';
import { Test } from './test';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class TestService extends CommonService {

  resourceUrl = environment.apiBaseUrl + '/api/tests';

  constructor(
    private http: Http,
    private loginService: LoginService
  ) { super(); }

  update(test: Test): Observable<Test> {
    return this.http.put(this.resourceUrl, test, this.loginService.getRequestOptions())
      .map(response => new Test(response.json()))
      .catch(this.handleError);
  }

  getAll(page: number, size: number): Observable<{'result': Test[], 'count': number}>  {
    return this.http.get(this.resourceUrl + this.formatRequestParams(page, size)
      , this.loginService.getRequestOptions())
      .map(response => {
         return {'result': Test.toArray(response.json()), 'count': +response.headers.get(this.countHeaderName) }
      }).catch(this.handleError)
  }

  deleteOne(id: number): Observable<string> {
    return this.http.delete(this.resourceUrl + '/' + id, this.loginService.getRequestOptions())
       .map(response => 'Test successfully deleted')
       .catch(this.handleError);
  }

  getOne(id: string): Observable<Test> {
    return this.http.get(this.resourceUrl + '/' + id, this.loginService.getRequestOptions())
      .map(response => new Test(response.json()))
      .catch(this.handleError);
  }

  search(query: string): Observable<Test[]> {
   return this.http.get(this.resourceUrl + '/search' + this.formatSearchRequestParam(query), this.loginService.getRequestOptions())
      .map(response => Test.toArray(response.json()))
      .catch(this.handleError);
  }

  getAllSubcategories(id: number): Observable<TestSubcategory[]> {
    return this.http.get(this.resourceUrl + '/' + id + '/subcategories',
              this.loginService.getRequestOptions())
           .map(response => TestSubcategory.toArray(response.json()))
           .catch(this.handleError);
  }

  getOneByValue(value: string, fieldName?: string): Observable<Test> {
    return this.getOne(value);
  }

}
