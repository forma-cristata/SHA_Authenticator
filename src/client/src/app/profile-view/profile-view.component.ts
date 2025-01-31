import { Component } from '@angular/core';
import {InfoButtonComponent} from '../info-button/info-button.component';
import {ProfileButtonComponent} from '../profile-button/profile-button.component';
import {HomeButtonComponent} from '../home-button/home-button.component';
import {CircuitAnimationComponent} from '../circuit-animation/circuit-animation.component';
import {BackButtonComponent} from '../back-button/back-button.component';

@Component({
  selector: 'app-profile-view',
  imports: [
    InfoButtonComponent,
    ProfileButtonComponent,
    HomeButtonComponent,
    CircuitAnimationComponent,
    BackButtonComponent
  ],
  templateUrl: './profile-view.component.html',
  standalone: true,
  styleUrl: './profile-view.component.css'
})
export class ProfileViewComponent {

}
