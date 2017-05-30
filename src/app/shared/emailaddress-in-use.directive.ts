import { UserService } from '../user/user.service';
import { Directive, Input, HostListener, Output, EventEmitter } from '@angular/core';

@Directive({
  selector: '[emailInUse]'
})
export class EmailAddressInUseValidatorDirective {

  @Input('input-value') emailAddress;
  @Input('old-value') oldValue;
  @Output() duplicates: EventEmitter<any> = new EventEmitter();

  constructor(private userService: UserService) {}

  @HostListener('blur') onBlur() {
    if (this.oldValue !== this.emailAddress) {
      this.userService.getUserByEmailAddress(this.emailAddress)
        .subscribe(response => {
            this.duplicates.emit(
                {field: 'email', message: this.emailAddress + ' is already in use'}
            );
        })
    }
  }
}
