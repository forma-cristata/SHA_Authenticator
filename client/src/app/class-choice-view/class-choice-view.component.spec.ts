import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClassChoiceViewComponent } from './class-choice-view.component';

describe('ClassChoiceViewComponent', () => {
  let component: ClassChoiceViewComponent;
  let fixture: ComponentFixture<ClassChoiceViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClassChoiceViewComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClassChoiceViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
