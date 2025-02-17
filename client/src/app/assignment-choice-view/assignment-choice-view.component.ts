import { Component } from '@angular/core';
import {InfoButtonComponent} from '../info-button/info-button.component';
import {ProfileButtonComponent} from '../profile-button/profile-button.component';
import {HomeButtonComponent} from '../home-button/home-button.component';
import {BackButtonComponent} from '../back-button/back-button.component';
import {Router, RouterLink} from '@angular/router';
import {getCookie} from '../get-cookie';

@Component({
  selector: 'app-assignment-choice-view',
  imports: [
    InfoButtonComponent,
    ProfileButtonComponent,
    HomeButtonComponent,
    BackButtonComponent,
    RouterLink
  ],
  templateUrl: './assignment-choice-view.component.html',
  standalone: true,
  styleUrl: './assignment-choice-view.component.css'
})
export class AssignmentChoiceViewComponent {
  constructor(private router: Router){}


  ngOnInit(){
    if(!getCookie('username'))
    {
      this.router.navigate(['/']).then(r => console.log('redirected to login'));
    }

    if(!getCookie('class'))
    {
      this.router.navigate(['/classes']).then(r => console.log('redirected to classes'));
    }
  }
}
