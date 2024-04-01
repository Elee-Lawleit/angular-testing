import { NgModule } from '@angular/core';
import { CustomHighlightDirective } from '../directives/custom-highilght-directive.directive';
@NgModule({
  declarations: [CustomHighlightDirective],
  exports: [CustomHighlightDirective],
})
export class MyCustomDirectivesModule {}
