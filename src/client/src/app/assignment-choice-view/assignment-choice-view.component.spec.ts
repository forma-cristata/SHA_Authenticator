import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignmentChoiceViewComponent } from './assignment-choice-view.component';

describe('AssignmentChoiceViewComponent', () => {
  let component: AssignmentChoiceViewComponent;
  let fixture: ComponentFixture<AssignmentChoiceViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AssignmentChoiceViewComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AssignmentChoiceViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
