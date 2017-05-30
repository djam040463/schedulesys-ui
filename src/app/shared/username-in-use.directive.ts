import { UserService } from '../user/user.service';
import { Directive, HostListener, Input, Output, EventEmitter } from '@angular/core';


@Directive({
  selector: '[usernameInUse]'
})
export class UsernameInUseValidatorDirective {

  @Input('input-value') username;
  @Input('old-value') oldValue;
  @Output() duplicates: EventEmitter<any> = new EventEmitter();

  constructor(private userService: UserService) {}

  @HostListener('blur') onBlur() {
    if (this.oldValue !== this.username) {
      this.userService.getUserByUsername(this.username)
        .subscribe(response => {
          this.duplicates.emit(
            {field: 'username', message: this.username + ' is already in use'}
           );
      })
    }
  }
}
