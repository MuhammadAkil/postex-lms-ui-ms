import { Directive, ElementRef, forwardRef, HostListener, Input } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Directive({
  selector: '[appCharactersOnly]',
  providers:[
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CharactersOnlyDirective),
      multi: true
    }
  ]
})
export class CharactersOnlyDirective {

  private _onChange: any;
  constructor(private _el: ElementRef) { }

  // @HostListener('input', ['$event']) onInputChange(event:any) {
  //   const initalValue = this._el.nativeElement.value;
  //   this._el.nativeElement.value = initalValue.replace(/[^0-9]*/g, '');
  //   if ( initalValue !== this._el.nativeElement.value) {
  //     event.stopPropagation();
  //   }
  // }

  @HostListener('input') onInput() {
    let value = this._el.nativeElement.value;
    let newValue = this.setInputValue(value || '');
    this._onChange(newValue);
  }
  private setInputValue(value: string): string {
    value = value.replace(/[^A-Za-z\s]/g, '');
    this._el.nativeElement.value = value;
    return value;
  }
  writeValue(value: string): void {
    this.setInputValue(value || "");
  }
  registerOnChange(fn: any): void {
    this._onChange = fn;
  }
  registerOnTouched(fn: any): void {
  }
}
