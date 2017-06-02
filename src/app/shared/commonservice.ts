import { Observable } from 'rxjs/Observable';

export class CommonService {

  protected countHeaderName = 'X-Total-Count';

  handleError(error: any) {
    console.log('An error occurred : ' + error);
    let errorMsg: string;
    if (error.status === 404) {
      errorMsg = 'Unable to find resource';
    } else if (error.status === 400) {
      errorMsg = error.json().message;
    } else {
      const xScheduleSysError = error.headers.get('X-schedulesys-error');
      console.log('X-schedulesys-error : ' + xScheduleSysError);
      errorMsg = xScheduleSysError ? xScheduleSysError :
         (error.message ? error.message : error.toString());
      console.log('Error message : ' + error);
    }
    return Observable.throw(errorMsg);
  }

  formatRequestParams(page: number, size: number): string {
    return '?page=' + page + '&size=' + size;
  }
}
