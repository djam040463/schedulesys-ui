import { environment } from '../../../environments/environment';
import { LoginService } from '../../login/login.service';
import { CommonService } from '../../shared/commonservice';
import { ScheduleSummary } from './schedulesummary.model';
import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class ScheduleSummaryService extends CommonService {

  resourceUrl = environment.apiBaseUrl + '/api/schedules/summary';

  constructor(private http: HttpClient) { super(); }

  getSchedulesSummary(scheduleDate: Date): Observable<ScheduleSummary[]> {
    return this.http.get(this.resourceUrl + '?scheduleDate=' + scheduleDate)
      .map(response => response as ScheduleSummary[])
      .catch(this.handleError);
  }
}
