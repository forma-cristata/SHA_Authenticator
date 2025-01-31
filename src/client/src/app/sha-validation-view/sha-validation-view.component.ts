import { Component } from '@angular/core';
import {InfoButtonComponent} from '../info-button/info-button.component';
import {ProfileButtonComponent} from '../profile-button/profile-button.component';

@Component({
  selector: 'app-sha-validation-view',
  imports: [
    InfoButtonComponent,
    ProfileButtonComponent
  ],
  templateUrl: './sha-validation-view.component.html',
  standalone: true,
  styleUrl: './sha-validation-view.component.css'
})
export class ShaValidationViewComponent {

}
