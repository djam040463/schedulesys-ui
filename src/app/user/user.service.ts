import { environment } from '../../environments/environment';
import { LoginService } from '../login/login.service';
import { UserProfile } from '../profile/userprofile';
import { UserProfileVM } from './userprofilevm';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class UserService {

  private resourceUrl = environment.apiBaseUrl + '/api/users';

  constructor(
    private http: Http,
    private loginService: LoginService) { }

  createUser(user: UserProfileVM): Observable<string> {
    return this.http.post(this.resourceUrl, user, this.loginService.getRequestOptions())
              .map(response => 'User successfully created')
              .catch(this.handleError);
  }

  updateUser(user: UserProfileVM): Observable<string> {
    return this.http.put(this.resourceUrl, user, this.loginService.getRequestOptions())
              .map(response => 'User successfully updated')
              .catch(this.handleError);
  }

  getAllUsers() {
    return this.http.get(this.resourceUrl, this.loginService.getRequestOptions())
              .map(response => {
                  return UserProfile.toArray(response.json())
              }).catch(this.handleError);
  }

  deleteUser(username: string): Observable<string> {
    return this.http.delete(this.resourceUrl + '/' + username, this.loginService.getRequestOptions())
            .map(response => 'User successfully deleted')
            .catch(this.handleError);
  }

  handleError(error: any) {
   const errMsg = error.headers.get('X-schedulesys-error');
   return Observable.throw(errMsg);
  }
}
