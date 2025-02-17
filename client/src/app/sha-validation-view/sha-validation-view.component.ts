import { Component } from '@angular/core';
import {InfoButtonComponent} from '../info-button/info-button.component';
import {ProfileButtonComponent} from '../profile-button/profile-button.component';
import {HomeButtonComponent} from '../home-button/home-button.component';
import {BackButtonComponent} from '../back-button/back-button.component';
import {Router, RouterLink} from '@angular/router';
import '../get-cookie';
import {getCookie, setCookie} from '../get-cookie';
import {Octokit} from 'octokit';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {LoadingIconComponent} from '../loading-icon/loading-icon.component';

@Component({
  selector: 'app-sha-validation-view',
  imports: [
    InfoButtonComponent,
    ProfileButtonComponent,
    HomeButtonComponent,
    BackButtonComponent,
    RouterLink,
    ReactiveFormsModule,
    FormsModule,
    LoadingIconComponent
  ],
  templateUrl: './sha-validation-view.component.html',
  standalone: true,
  styleUrl: './sha-validation-view.component.css'
})
export class ShaValidationViewComponent {
  public returnedSHAs: string[] = [];
  private octokit = new Octokit({});
  public assignmentName = getCookie('assignment');
  public sHAToCheck = '';
  public feedback = '';

  constructor(private router: Router){}
  async ngOnInit() {
    if (!getCookie('username')) {
      this.router.navigate(['/']);
    }
    if (!getCookie('class')) {
      this.router.navigate(['/classes']);
    }
    if (!getCookie('assignment')) {
      this.router.navigate(['/assignments']);
    }
    await this.setReturnedSHAs(getCookie('username'), getCookie('class'), getCookie('assignment')).then(() => {
      document.querySelector('#loading-boxer')!.classList.add('d-none');
      document.querySelector('#classes-table')!.classList.remove('d-none');
    });

  }

  async setReturnedSHAs(username: string, classChoice: string, assignment: string) {

    let data = ((await this.octokit.request(`GET http://localhost:3012/shas?username=${username}&classname=${classChoice}&assignment=${assignment}`, {}))).data;

    this.returnedSHAs = [...data];
    console.log(this.returnedSHAs);
  }

  checkSHA() {
    if(this.returnedSHAs.includes(this.sHAToCheck))
    {
      this.feedback = 'SHA is valid';
    }
    else {
      this.feedback = 'SHA is not valid';
      // TODO more specific feedback - does it belong to another repository?

    }
  }
}

