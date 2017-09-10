import { environment } from '../../environments/environment';
import { LoginService } from '../login/login.service';
import { CommonService } from '../shared/commonservice';
import { TestSubcategory } from './testsubcategory';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class TestSubcategoryService extends CommonService {

  resourceUrl = environment.apiBaseUrl + '/api/test-sub-categories';

  constructor(
    private http: Http,
    private loginService: LoginService
  ) { super(); }

  update(testSubcategory: TestSubcategory): Observable<TestSubcategory> {
    return this.http.put(this.resourceUrl, testSubcategory, this.loginService.getRequestOptions())
        .map(response => new TestSubcategory(response.json()))
        .catch(this.handleError);
  }

  deleteOne(id: number): Observable<string> {
    return this.http.delete(this.resourceUrl + '/' + id, this.loginService.getRequestOptions())
        .map(response => 'Test subcategory successfully deleted')
        .catch(this.handleError);
  }
}
