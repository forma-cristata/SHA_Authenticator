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
  public username: string = '';
  public assignmentName: string = '';
  public className: string = '';
  public sHAToCheck: string = '';
  public feedback:string = '';
  private validText: string = 'var(--gh-green)';
  private invalidText: string = 'var(--dark-magenta)';

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

    this.feedback = ((await this.octokit.request(`GET http://localhost:3012/shas?username=${encodeURIComponent(this.username)}&classname=${encodeURIComponent(this.className)}&assignment=${encodeURIComponent(this.assignmentName)}&sha=${encodeURIComponent(this.sHAToCheck)}`, {}))).data[0];
    console.log(this.feedback);

    this.parseFeedback();
  }

  parseFeedback() {
    const indicator = this.feedback[0];
    this.feedback = this.feedback.substring(1);
    const feedbackElement = document.querySelector('#feedback-header')!;

    console.log(indicator);
    console.log(indicator === "I");
    console.log(feedbackElement);


    if (indicator === 'I')
    {
      document.querySelector('.form-floating')!.setAttribute('style', `-webkit-box-shadow:0px 0px 10px 0px ${this.invalidText}; -moz-box-shadow: 0px 0px 10px 0px ${this.invalidText}; box-shadow: 0px 0px 10px 0px ${this.invalidText};`);
    }
    else
    {
      document.querySelector('.form-floating')!.setAttribute('style', `-webkit-box-shadow:0px 0px 10px 0px ${this.validText}; -moz-box-shadow: 0px 0px 10px 0px ${this.validText}; box-shadow: 0px 0px 10px 0px ${this.validText};`);
    }
  }

  async checkSHA() {
    this.feedback = '';
    document.querySelector('.form-floating')!.setAttribute('style', `-webkit-box-shadow:0px 0px 0px 0px ${this.validText}; -moz-box-shadow: 0px 0px 0px 0px ${this.validText}; box-shadow: 0px 0px 0px 0px ${this.validText};`);

    document.querySelector('#loading-boxer')!.classList.remove('d-none');
    document.querySelector('#sha-checker-btn')!.classList.add('silence');

    await this.setReturnedSHAs().then(() => {
      document.querySelector('#loading-boxer')!.classList.add('d-none');
      document.querySelector('#sha-checker-btn')!.classList.remove('silence');
    });

  }
}

