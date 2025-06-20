import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { debounceTime, distinctUntilChanged, fromEvent } from 'rxjs';
import { ListColumn } from 'src/app/constant/model/list-column.model';

@Component({
  selector: 'app-filter-section',
  templateUrl: './filter-section.component.html',
  styleUrls: ['./filter-section.component.scss']
})
export class FilterSectionComponent implements OnInit {
  searchText: string = "";
  @Input() columns: ListColumn[] = [];
  @ViewChild('filter') filter: ElementRef | any;
  @Output() filterChange = new EventEmitter<string>();
  constructor() { }

  ngOnInit(): void {
  }
  ngAfterViewInit() {
    fromEvent(this.filter.nativeElement, 'keyup').pipe(
      distinctUntilChanged(),
      debounceTime(150)
    ).subscribe(() => {
      this.filterChange.emit(this.filter.nativeElement.value);
    });
  }
  toggleColumnVisibility(column: any, event: any) {
      event.stopPropagation();
      event.stopImmediatePropagation();
      column.visible = !column.visible;
  }
}
