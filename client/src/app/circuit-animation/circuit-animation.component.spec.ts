import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CircuitAnimationComponent } from './circuit-animation.component';

describe('CircuitAnimationComponent', () => {
  let component: CircuitAnimationComponent;
  let fixture: ComponentFixture<CircuitAnimationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CircuitAnimationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CircuitAnimationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
