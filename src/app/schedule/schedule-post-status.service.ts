import { environment } from '../../environments/environment';
import { LoginService } from '../login/login.service';
import { CommonService } from '../shared/commonservice';
import { SchedulePostStatus } from './schedulepoststatus';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class SchedulePostStatusService extends CommonService {

  resourceUrl = environment.apiBaseUrl + '/api/schedule-post-statuses';

  constructor(
    private http: Http,
    private loginService: LoginService
  ) { super(); }

  getAll(): Observable<SchedulePostStatus[]> {
    return this.http.get(this.resourceUrl, this.loginService.getRequestOptions())
        .map(response => SchedulePostStatus.toArray(response.json()))
        .catch(this.handleError);
  }

}
