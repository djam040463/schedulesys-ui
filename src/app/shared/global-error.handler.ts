import { Injectable, ErrorHandler } from '@angular/core';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class GlobalErrorHandler implements ErrorHandler {

  constructor() { }

  handleError(error: any) {
    console.log('An error occurred : ' + error);
    let errorMsg: string;
    if (error.status === 404) {
      errorMsg = 'Unable to find resource';
      console.log('Is 404 ?');
    } else {
      const xScheduleSysError = error.headers.get('X-schedulesys-error');
      console.log('X-schedulesys-error : ' + xScheduleSysError);
      errorMsg = xScheduleSysError ? xScheduleSysError :
         (error.body.message ? error.body.message : error.body);
    }
    return Observable.throw(errorMsg);
  }

}
