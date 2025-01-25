import { Component } from '@angular/core';
import {CircuitAnimationComponent} from '../circuit-animation/circuit-animation.component';
import {RegistrationFormComponent} from '../registration-form/registration-form.component';

@Component({
  selector: 'app-registration-view',
  imports: [
    CircuitAnimationComponent,
    RegistrationFormComponent,
  ],
  templateUrl: './registration-view.component.html',
  standalone: true,
  styleUrl: './registration-view.component.css'
})
export class RegistrationViewComponent {

}
