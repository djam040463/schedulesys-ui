import { environment } from '../../environments/environment';
import { LoginService } from '../login/login.service';
import { UserRole } from '../profile/userrole';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class UserRoleService {

  private resourceUrl = environment.apiBaseUrl + '/api/user-roles';

  constructor(
    private http: Http,
    private loginService: LoginService) { }

  getAll(): Observable<UserRole[]> {
    return this.http.get(this.resourceUrl, this.loginService.getRequestOptions())
              .map(response => {
                  return UserRole.toArray(response.json())
              }).catch(this.handleError);
  }

  handleError(error: any) {
   const errMsg = error.headers.get('X-schedulesys-error');
   return Observable.throw(errMsg);
  }

}
