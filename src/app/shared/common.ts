import { NgForm } from '@angular/forms';
import { MenuItem, ConfirmationService, Message, SelectItem } from 'primeng/primeng';

export class Common {
  constructor () {}

  protected formChanged(ngForm: NgForm, formErrors: any, validationMessages: any) {
    ngForm.valueChanges
          .subscribe(data => {
             for (const field in formErrors) {
               formErrors[field] = '';
               const control = ngForm.form.get(field);
               if (control && control.dirty && !control.valid) {
                  const messages = validationMessages[field];
                  for (const key in control.errors) {
                      formErrors[field] += messages[key] + ' ';
                  }
              }
            }
          });
  }

  protected displayMessage(msg: Message, msgs: Message[]): void {
      msgs.push(msg);
      setTimeout(() => {msgs.pop()}, 3000); // Messages do not disappear automatically
  }

  unmaskNumber(value) {
    return value === null ? '' : value.replace(/\D+/g, '');
  }
}
