import { Directive, ElementRef } from '@angular/core';
import { v4 as uuidv4 } from 'uuid';

@Directive({
  selector: '[appUniqueNameAttribute]'
})
export class UniqueNameAttributeDirective {

  constructor(private el: ElementRef) { 
    this.el.nativeElement.name = uuidv4();
    this.el.nativeElement.autocomplete = "new-password";
  }

}
