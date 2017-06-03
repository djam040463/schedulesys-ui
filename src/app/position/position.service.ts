import { environment } from '../../environments/environment';
import { LoginService } from '../login/login.service';
import { CommonService } from '../shared/commonservice';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Position } from './position';

@Injectable()
export class PositionService extends CommonService {

  resourceUrl = environment.apiBaseUrl + '/api/positions';

  constructor(
    private http: Http,
    private loginService: LoginService
  ) {super(); }

  getAll(page: number, size: number): Observable<{'result': Position[], 'count': number}>;

  getAll(): Observable<Position[]>;

  getAll(page?: number, size?: number) {
    const pageable = (page != null && size != null);
    const result: Observable<any> =  pageable ?
        this.http.get(this.resourceUrl + this.formatRequestParams(page, size)
      , this.loginService.getRequestOptions()) :
        this.http.get(this.resourceUrl, this.loginService.getRequestOptions());
    return result.map(
        response => {
            return pageable ? {'result': Position.toArray(response.json()),
                   'count': +response.headers.get(this.countHeaderName)}
                   :  Position.toArray(response.json())
        }
      ).catch(this.handleError);
  }
}
