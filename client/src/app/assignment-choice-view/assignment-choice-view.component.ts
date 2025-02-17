import { Component } from '@angular/core';
import {InfoButtonComponent} from '../info-button/info-button.component';
import {ProfileButtonComponent} from '../profile-button/profile-button.component';
import {HomeButtonComponent} from '../home-button/home-button.component';
import {BackButtonComponent} from '../back-button/back-button.component';
import {Router, RouterLink} from '@angular/router';
import {getCookie, setCookie} from '../get-cookie';
import {Octokit} from 'octokit';

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
  public returnedAssignments: string[] = [];
  private octokit = new Octokit({});

  constructor(private router: Router){}

  async setReturnedAssignments(username: string, classChoice: string) {

    let data = ((await this.octokit.request(`GET http://localhost:3012/assignments?username=${username}&classname=${classChoice}`, {}))).data;

    // TODO API Return Call Set
    this.returnedAssignments = [...data];
  }
  ngOnInit(){
    if(!getCookie('username'))
    {
      this.router.navigate(['/']).then(r => console.log('redirected to login'));
    }

    if(!getCookie('class'))
    {
      this.router.navigate(['/classes']).then(r => console.log('redirected to classes'));
    }

    setCookie('assignment', '');
    this.setReturnedAssignments(getCookie('username'), getCookie('class'));
  }

  selectAssignment(selectedAssignment: string){
    setCookie('assignment', selectedAssignment);
    this.router.navigate(['/sha-validation']);
  }
}



/*
public returnedClasses: string[] = [];
private octokit = new Octokit({});
constructor(private router: Router){}

async setReturnedClasses(username: String) {



  console.log(data);
  this.returnedClasses = [...data];
}
async ngOnInit() {
  if (!getCookie('username')) {
    this.router.navigate(['/']);
  }
  setCookie('class', '');
  await this.setReturnedClasses(getCookie('username'));
}

selectClass(selectedClass: string){
  setCookie('class', selectedClass);
  this.router.navigate(['/assignments']);
}

*/
