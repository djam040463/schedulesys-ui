import { Injectable, ErrorHandler } from '@angular/core';

@Injectable()
export class GlobalerrorhandlerService implements ErrorHandler {

  constructor() { }

  handleError(error: any): void {
    // A message will be added to every error thrown.
    console.log('An unexpected error occurred : ' + error.message);
  }

}
