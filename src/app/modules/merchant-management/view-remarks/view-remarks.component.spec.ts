import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewRemarksComponent } from './view-remarks.component';

describe('ViewRemarksComponent', () => {
  let component: ViewRemarksComponent;
  let fixture: ComponentFixture<ViewRemarksComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewRemarksComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewRemarksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
