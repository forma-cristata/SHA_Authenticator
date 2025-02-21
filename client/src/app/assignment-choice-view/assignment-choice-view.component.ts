import { Component } from '@angular/core';
import {InfoButtonComponent} from '../info-button/info-button.component';
import {ProfileButtonComponent} from '../profile-button/profile-button.component';
import {HomeButtonComponent} from '../home-button/home-button.component';
import {BackButtonComponent} from '../back-button/back-button.component';
import {Router, RouterLink} from '@angular/router';
import {getCookie, setCookie} from '../get-cookie';
import {Octokit} from 'octokit';
import {LoadingIconComponent} from '../loading-icon/loading-icon.component';
import {NgClass, NgForOf, NgIf} from '@angular/common';
import {of} from 'rxjs';

@Component({
  selector: 'app-assignment-choice-view',
  imports: [
    InfoButtonComponent,
    ProfileButtonComponent,
    HomeButtonComponent,
    BackButtonComponent,
    RouterLink,
    LoadingIconComponent,
    NgClass,
    NgIf
  ],
  templateUrl: './assignment-choice-view.component.html',
  standalone: true,
  styleUrl: './assignment-choice-view.component.css'
})
export class AssignmentChoiceViewComponent {
  public returnedAssignments: string[] = [];
  private octokit = new Octokit({});
  public rALength: number[] =[];
  public a = "a";
  constructor(private router: Router){}

  async setReturnedAssignments(username: string, classChoice: string) {

    let data = ((await this.octokit.request(`GET http://localhost:3012/assignments?username=${username}&classname=${classChoice}`, {}))).data;

    // TODO API Return Call Set
    this.returnedAssignments = [...data];

    let length = this.returnedAssignments.length;

    for(let i = 0; i < length; i+=3)
    {
      this.rALength.push(i);
    }
  }
  async ngOnInit() {
    if (!getCookie('username')) {
      this.router.navigate(['/']).then(r => console.log('redirected to login'));
    }

    if (!getCookie('class')) {
      this.router.navigate(['/classes']).then(r => console.log('redirected to classes'));
    }

    setCookie('assignment', '');
    await this.setReturnedAssignments(getCookie('username'), getCookie('class')).then(() => {
      document.querySelector('#loading-boxer')!.classList.add('d-none');
      document.querySelector('#assignments-table')!.classList.remove('d-none');
    });
  }

  selectAssignment(selectedAssignment: string){
    setCookie('assignment', selectedAssignment);
    this.router.navigate(['/sha-validation']);
  }



  protected readonly of = of;
}




