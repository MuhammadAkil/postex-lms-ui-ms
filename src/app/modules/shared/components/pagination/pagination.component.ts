import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Pagination } from 'src/app/constant/interface/pagination.interface';

@Component({
    selector: 'app-pagination',
    templateUrl: './pagination.component.html',
    styleUrls: ['./pagination.component.scss']
})
export class PaginationComponent implements OnInit {

    @Output() changeEvent: EventEmitter<Pagination> = new EventEmitter();
    @Input() pagination!: Pagination;
    constructor() { }

    ngOnInit(): void {
    }

    pageSizeChange(value: any) {
        this.pagination.page = 0;
        this.pagination.size = value;
        this.changeEvent.emit(this.pagination);
    }
    pageIndexChange(event: any) {
        this.pagination.page = event - 1;
        this.changeEvent.emit(this.pagination);
    }

}
