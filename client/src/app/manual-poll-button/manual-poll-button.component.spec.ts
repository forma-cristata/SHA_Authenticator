import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManualPollButtonComponent } from './manual-poll-button.component';

describe('ManualPollButtonComponent', () => {
  let component: ManualPollButtonComponent;
  let fixture: ComponentFixture<ManualPollButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ManualPollButtonComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManualPollButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
