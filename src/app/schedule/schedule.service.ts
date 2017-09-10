import { environment } from '../../environments/environment';
import { LoginService } from '../login/login.service';
import { CommonService } from '../shared/commonservice';
import { Schedule } from './schedule';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class ScheduleService extends CommonService {

  private resourceUrl = environment.apiBaseUrl + '/api/schedules'
  constructor(
    private http: Http,
    private loginService: LoginService
  ) { super(); }

  deleteOne(id: number): Observable<string> {
    return this.http.delete(this.resourceUrl + '/' + id, this.loginService.getRequestOptions())
        .map(response => 'Schedule Successfully Deleted')
        .catch(this.handleError);
  }

  update(schedule: Schedule): Observable<Schedule> {
    return this.http.put(this.resourceUrl, schedule, this.loginService.getRequestOptions())
      .map(response => new Schedule(response.json()))
      .catch(this.handleError);
  }
}
