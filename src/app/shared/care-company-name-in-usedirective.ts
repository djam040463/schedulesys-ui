
import { CareCompanyService } from '../company/care-company.service';
import { Directive, Input, HostListener, Output, EventEmitter } from '@angular/core';

@Directive({
  selector: '[company-name-in-use]',
})
export class CareCompanyNameInUseDirective {

  @Input('input-value') careCompanyName;
  @Input('old-value') oldValue;
  @Output() duplicates: EventEmitter<any> = new EventEmitter();

  constructor(private careCompanyService: CareCompanyService) {}

  @HostListener('blur') onBlur() {
    if (this.oldValue !== this.careCompanyName) {
      this.careCompanyService.getCareCompany(this.careCompanyName)
        .subscribe(response => {
            this.duplicates.emit(
                {field: 'name', message: '\'' + this.careCompanyName + '\' is already in use'}
            );
        })
    }
  }
}
