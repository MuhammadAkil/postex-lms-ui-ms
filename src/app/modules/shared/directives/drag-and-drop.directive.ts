import { Directive, ElementRef, EventEmitter, HostListener, Output } from '@angular/core';

@Directive({
  selector: '[appDragAndDrop]'
})
export class DragAndDropDirective {

  @Output() onFileDrag:EventEmitter<File> = new EventEmitter();

  constructor(private el: ElementRef) { }

  @HostListener('dragover',['$event']) ondragover(evt:any){
    evt.preventDefault();
    evt.stopPropagation();
    this.el.nativeElement.style.opacity = 0.5;
  }

  @HostListener('dragleave',['$event']) ondragLeave(evt:any){
    evt.preventDefault();
    evt.stopPropagation();
    this.el.nativeElement.style.opacity = 1;
  }

  @HostListener('drop',['$event']) onDrop(evt:any){
    evt.preventDefault();
    evt.stopPropagation();
    const file = evt.dataTransfer.files[0];
    this.onFileDrag.emit(file)
    this.el.nativeElement.style.opacity = 1;
    evt.target['value'] = undefined;
  }

}
