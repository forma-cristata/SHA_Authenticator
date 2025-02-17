import { Component } from '@angular/core';
import {InfoButtonComponent} from '../info-button/info-button.component';
import {ProfileButtonComponent} from '../profile-button/profile-button.component';
import {HomeButtonComponent} from '../home-button/home-button.component';
import {BackButtonComponent} from '../back-button/back-button.component';
import {Router, RouterLink} from '@angular/router';
import '../get-cookie';
import {getCookie, setCookie} from '../get-cookie';
import {Octokit} from 'octokit';

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
  public returnedSHAs: string[] = [];
  private octokit = new Octokit({});


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
    this.setReturnedSHAs(getCookie('username'), getCookie('class'), getCookie('assignment'));

  }

  async setReturnedSHAs(username: string, classChoice: string, assignment: string) {

    let data = ((await this.octokit.request(`GET http://localhost:3012/shas?username=${username}&classname=${classChoice}&assignment=${assignment}`, {}))).data;

    this.returnedSHAs = [...data];
    console.log(this.returnedSHAs);
  }
}

