import {Component, OnInit} from '@angular/core';
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
    ChangeUsernameComponent,
    InfoButtonComponent,
  ],
  templateUrl: './profile-view.component.html',
  standalone: true,
  styleUrl: './profile-view.component.css'
})
export class ProfileViewComponent implements OnInit{
  public termLengthInSeconds: string = new Date(Date.now() + 24 * 60 * 60 * 7 * 14 * 1000).toUTCString();
  public username: string = '';
  constructor(private router: Router, private location: Location){}


  ngOnInit(){
    if(!getCookie('username'))
    {
      this.router.navigate(['/']);
    }
    this.termLengthInSeconds = new Date(Date.now() + 24 * 60 * 60 * 7 * 14 * 1000).toUTCString();

  }


  transformHome(){
    document.querySelector('#home-button-changing')!.classList.remove('d-none');
    document.querySelector('#home-button')!.classList.add('d-none');
    setTimeout(() => {this.router.navigate(['/classes'])}, 450);
  }


}
