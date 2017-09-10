import { environment } from '../../environments/environment';
import { LoginService } from '../login/login.service';
import { CommonService } from '../shared/commonservice';
import { ScheduleStatus } from './schedulestatus';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class ScheduleStatusService extends CommonService {

  resourceUrl = environment.apiBaseUrl + '/api/schedule-statuses';

  constructor(
    private http: Http,
    private loginService: LoginService
  ) { super(); }

  getAll(): Observable<ScheduleStatus[]> {
    return this.http.get(this.resourceUrl, this.loginService.getRequestOptions())
        .map(response => ScheduleStatus.toArray(response.json()))
        .catch(this.handleError);
  }
}
