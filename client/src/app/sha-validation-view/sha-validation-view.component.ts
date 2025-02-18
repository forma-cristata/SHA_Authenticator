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
  private octokit: Octokit = new Octokit({});
  public username: string = '';
  public assignmentName: string = '';
  public className: string = '';
  public sHAToCheck: string = '';
  public feedback:string = '';

  constructor(private router: Router){}
  async ngOnInit() {
    this.username = getCookie('username');
    this.assignmentName = getCookie('assignment');
    this.className = getCookie('class');

    if (!this.username) {
      this.router.navigate(['/']);
    }
    if (!this.className) {
      this.router.navigate(['/classes']);
    }
    if (!this.assignmentName) {
      this.router.navigate(['/assignments']);
    }
  }

  async setReturnedSHAs() {
    this.feedback = ((await this.octokit.request(`GET http://localhost:3012/shas?username=${this.username}&classname=${this.className}&assignment=${this.assignmentName}&sha=${this.sHAToCheck}`, {}))).data[0];
    console.log(this.feedback);
  }

  async checkSHA() {
    document.querySelector('#loading-boxer')!.classList.remove('d-none');
    document.querySelector('#classes-table')!.classList.add('d-none');

    await this.setReturnedSHAs().then(() => {
      document.querySelector('#loading-boxer')!.classList.add('d-none');
      document.querySelector('#classes-table')!.classList.remove('d-none');
    });

    /*if(this.returnedSHAs.includes(this.sHAToCheck))
    {
      this.feedback = 'SHA is valid';
    }
    else {
      this.feedback = 'SHA is not valid';
      // TODO more specific feedback - does it belong to another repository?

    }*/
  }
}

