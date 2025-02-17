import { Component } from '@angular/core';
import {InfoButtonComponent} from '../info-button/info-button.component';
import {ProfileButtonComponent} from '../profile-button/profile-button.component';
import {HomeButtonComponent} from '../home-button/home-button.component';
import {BackButtonComponent} from '../back-button/back-button.component';
import {Router, RouterLink} from '@angular/router';
import '../get-cookie';
import {getCookie} from '../get-cookie';

@Component({
  selector: 'app-sha-validation-view',
  imports: [
    InfoButtonComponent,
    ProfileButtonComponent,
    HomeButtonComponent,
    BackButtonComponent,
    RouterLink
  ],
  templateUrl: './sha-validation-view.component.html',
  standalone: true,
  styleUrl: './sha-validation-view.component.css'
})
export class ShaValidationViewComponent {
  constructor(private router: Router){}
  ngOnInit(){
    if(!getCookie('username'))
    {
      this.router.navigate(['/']);
    }
    if(!getCookie('class'))
    {
      this.router.navigate(['/classes']);
    }
    if(!getCookie('assignment'))
    {
      this.router.navigate(['/assignments']);
    }
  }
}
