import { environment } from '../../environments/environment';
import { AuthClaim } from './authclaim';
import { JWT } from './jwt';
import { LoginVM } from './loginvm';
import { Injectable } from '@angular/core';
import { Http, RequestOptions, Headers} from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';

@Injectable()
export class LoginService {

   private options = new RequestOptions({ headers: new Headers({ 'Content-Type': 'application/json' }) });
   resourceUrl = environment.apiBaseUrl + '/api/authenticate';

  constructor(private http: Http) { }

  login(loginVM: LoginVM): Observable<boolean> {
     return this.http.post(this.resourceUrl, loginVM, this.options)
      .map(response => this.storeJwt(new JWT(response.json()), loginVM.rememberMe))
      .catch(this.handleError);
  }

  logout() {
    this.removeJwt();
  }

  storeJwt(jwt: JWT, rememberMe: boolean): boolean {
    if (rememberMe) {
      localStorage.setItem('jwt', jwt.token);
    }else {
      sessionStorage.setItem('jwt', jwt.token);
    }
    return true;
  }

  removeJwt() {
     localStorage.removeItem('jwt');
     sessionStorage.removeItem('jwt');
  }

  /**
   * Gets authenticated user from jwt
   */
  getAuthenticatedUser() {
    let jwt = localStorage.getItem('jwt');
    if (jwt === null) {
      jwt = sessionStorage.getItem('jwt');
    }
    console.log('The jwt ' + jwt);
    const jwtArray = jwt.split('.', 3);
    const authClaim: AuthClaim = JSON.parse(atob(jwtArray[1]));
    return authClaim;
  }

  handleError(error: any) {
   const errMsg = (error.status === 401) ? 'Invalid username or password'
     : 'An unexpected error occurred';
   console.error(errMsg); // log to console instead
   return Observable.throw(errMsg);
  }

}
