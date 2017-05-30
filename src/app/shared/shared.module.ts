
import { UsernameInUseValidatorDirective } from './username-in-use.directive';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

@NgModule({
  imports:      [ CommonModule],
  declarations: [ UsernameInUseValidatorDirective ],
  exports:      [ UsernameInUseValidatorDirective, CommonModule ]
})
export class SharedModule {

}
