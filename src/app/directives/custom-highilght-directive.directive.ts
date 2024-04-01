import { Directive, ElementRef, inject } from "@angular/core";

@Directive({
  selector: "[customHighlightDirective]"
})

export class CustomHighlightDirective{

  private element = inject(ElementRef)

  constructor(){
    this.element.nativeElement.style.backgroundColor = 'red'
  }

}