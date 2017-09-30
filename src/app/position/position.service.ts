import { environment } from '../../environments/environment';
import { CommonService } from '../shared/commonservice';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Position } from './position';

@Injectable()
export class PositionService extends CommonService {

  resourceUrl = environment.apiBaseUrl + '/api/positions';

  constructor(private http: HttpClient) {super(); }

  getAll(page: number, size: number): Observable<{'result': Position[], 'count': number}>;

  getAll(): Observable<Position[]>;

  getAll(page?: number, size?: number) {
    const pageable = (page != null && size != null);
    const result: Observable<any> =  pageable ?
      this.http.get(this.resourceUrl + this.formatRequestParams(page, size), {observe: 'response'}) :
        this.http.get(this.resourceUrl);
    return result.map(
        response => {
            return pageable ? {'result': response.body as Position[],
                   'count': +response.headers.get(this.countHeaderName)}
                   :  response as Position[]
        }
      ).catch(this.handleError);
  }
}
