import { Component } from '@angular/core';
import {ProfileButtonComponent} from '../profile-button/profile-button.component';
import {HomeButtonComponent} from '../home-button/home-button.component';
import {CircuitAnimationComponent} from '../circuit-animation/circuit-animation.component';
import {BackButtonComponent} from '../back-button/back-button.component';
import {Router, RouterLink} from '@angular/router';
import {getCookie} from '../get-cookie';
import {Location} from '@angular/common';
import {ChangeUsernameComponent} from '../change-username/change-username.component';
import {InfoButtonComponent} from '../info-button/info-button.component';

@Component({
  selector: 'app-profile-view',
  imports: [
    ProfileButtonComponent,
    HomeButtonComponent,
    CircuitAnimationComponent,
    BackButtonComponent,
    ChangeUsernameComponent,
    InfoButtonComponent,
  ],
  templateUrl: './profile-view.component.html',
  standalone: true,
  styleUrl: './profile-view.component.css'
})
export class ProfileViewComponent {
  constructor(private router: Router, private location: Location){}


  ngOnInit(){
    if(!getCookie('username'))
    {
      this.router.navigate(['/']);
    }
  }

  back(){
    this.location.back();
  }


}
