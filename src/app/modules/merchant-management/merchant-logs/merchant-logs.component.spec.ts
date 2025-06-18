import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MerchantLogsComponent } from './merchant-logs.component';

describe('MerchantLogsComponent', () => {
  let component: MerchantLogsComponent;
  let fixture: ComponentFixture<MerchantLogsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MerchantLogsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MerchantLogsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
