import { MatMenuModule } from '@angular/material/menu';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { Component, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DragAndDropDirective } from './directives/drag-and-drop.directive';
import { CharactersOnlyDirective } from './directives/characters-only.directive';
import { NumbersOnlyDirective } from './directives/numbers-only.directive';
import { UniqueNameAttributeDirective } from './directives/unique-name-attribute.directive';
import { FooterComponent } from './components/footer/footer.component';
import { SuccessModalComponent } from './components/success-modal/success-modal.component';
import { ErrorModalComponent } from './components/error-modal/error-modal.component';
import { MatDialogModule } from '@angular/material/dialog';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzPaginationModule } from 'ng-zorro-antd/pagination';
import { PaginationComponent } from './components/pagination/pagination.component';
import { SearchPipe } from './pipes/search.pipe';
import { ConfirmationComponent } from './components/confirmation/confirmation.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzTagModule } from 'ng-zorro-antd/tag';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';
import { FilterSectionComponent } from './components/filter-section/filter-section.component';
import { FilterSearchComponent } from './components/filter-section/filter-search/filter-search/filter-search.component';
const components = [
  DragAndDropDirective,
  CharactersOnlyDirective,
  NumbersOnlyDirective,
  UniqueNameAttributeDirective,
  FooterComponent,
  SuccessModalComponent,
  ErrorModalComponent,
  PaginationComponent,
  SearchPipe,
  ConfirmationComponent,
  FilterSectionComponent,
  FilterSearchComponent,

]

@NgModule({
  declarations: [...components],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    MatDialogModule,
    NzButtonModule,
    NzPaginationModule,
    NzInputModule,
    NzIconModule,
    MatCheckboxModule,
    MatMenuModule,
    NzCheckboxModule,
    NzFormModule,
    NzDatePickerModule,
    NzSelectModule,
    NzTagModule,
    NzToolTipModule
  ],
  exports: [...components]
})
export class SharedModule { }
