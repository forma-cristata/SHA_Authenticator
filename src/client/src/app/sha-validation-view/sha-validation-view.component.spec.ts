import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShaValidationViewComponent } from './sha-validation-view.component';

describe('ShaValidationViewComponent', () => {
  let component: ShaValidationViewComponent;
  let fixture: ComponentFixture<ShaValidationViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ShaValidationViewComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShaValidationViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
