import { environment } from '../../environments/environment';
import { LoginService } from '../login/login.service';
import { CommonService } from '../shared/commonservice';
import { TestOccurrence } from '../test-occurrence/testoccurrence';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class TestOccurrenceService extends CommonService {

  resourceUrl = environment.apiBaseUrl + '/api/test-occurrences'
  constructor(
    private http: Http,
    private loginService: LoginService
  ) { super(); }

  update(testOccurrence: TestOccurrence): Observable<TestOccurrence> {
    return this.http.put(this.resourceUrl, testOccurrence, this.loginService.getRequestOptions())
        .map(response => new TestOccurrence(response.json()))
        .catch(this.handleError);
  }

  deleteOne(id: number): Observable<string> {
    return this.http.delete(this.resourceUrl + '/' + id, this.loginService.getRequestOptions())
        .map(response => 'Test Occurrence Successfully Deleted')
        .catch(this.handleError);
  }
}
