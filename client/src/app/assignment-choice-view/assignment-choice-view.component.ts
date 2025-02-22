import { Component } from '@angular/core';
import {InfoButtonComponent} from '../info-button/info-button.component';
import {ProfileButtonComponent} from '../profile-button/profile-button.component';
import {HomeButtonComponent} from '../home-button/home-button.component';
import {BackButtonComponent} from '../back-button/back-button.component';
import {Router, RouterLink} from '@angular/router';
import {getCookie, setCookie} from '../get-cookie';
import {Octokit} from 'octokit';
import {LoadingIconComponent} from '../loading-icon/loading-icon.component';
import {NgClass, NgForOf, NgIf, NgOptimizedImage} from '@angular/common';
import {of} from 'rxjs';
import {ManualPollButtonComponent} from '../manual-poll-button/manual-poll-button.component';
import {keyframes} from '@angular/animations';
import {Toast} from '../toast';
import {ToastNotificationComponent} from '../toast-notification/toast-notification.component';

@Component({
  selector: 'app-assignment-choice-view',
  imports: [
    InfoButtonComponent,
    ProfileButtonComponent,
    HomeButtonComponent,
    BackButtonComponent,
    RouterLink,
    LoadingIconComponent,
    ManualPollButtonComponent,
    ToastNotificationComponent
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
  public assignmentName: string = "";
  public className: string = "";
  public toast: Toast =
    {
      imgPath: '/info.png',
      toastHeader: 'Assignment Instructions',
      toastBody: [
        "Click on an assignment block to select it.",
        "Don't see your assignment? Click the refresh button to manually update the rendered assignments."
      ],
      format: "button",
      link: "/profile",
      description: "More info"
    };
  constructor(private router: Router){}

  async setReturnedAssignments(username: string, classChoice: string) {

    let data = ((await this.octokit.request(`GET http://localhost:3012/assignments?username=${encodeURIComponent(username)}&classname=${encodeURIComponent(classChoice)}`, {}))).data;

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

    this.className = getCookie('class');
    if (!this.className) {
      this.router.navigate(['/classes']).then(r => console.log('redirected to classes'));
    }

    setCookie('assignment', '');
    await this.setReturnedAssignments(getCookie('username'), getCookie('class')).then(() => {
      document.querySelector('#loading-boxer')!.classList.add('d-none');
      document.querySelector('#assignments-table')!.classList.remove('d-none');
    });
  }


  async manualPoll() {
    document.querySelector('#loading-boxer')!.classList.remove('d-none');
    document.querySelector('#assignments-table')!.classList.add('d-none');
    ((await this.octokit.request(`GET http://localhost:3009/refresh`, {})));
    document.querySelector('#loading-boxer')!.classList.add('d-none');
    document.querySelector('#assignments-table')!.classList.remove('d-none');
    this.router.navigate(['/']);



  }
  selectAssignment(selectedAssignment: string){
    setCookie('assignment', selectedAssignment);
    this.assignmentName = selectedAssignment;
    // Get all the class-blocker elements except for the one clicked class and fade them out;
    let chosenBlockIndex = 0;
    let assBlockers = document.querySelectorAll('.ass-blocker');
    for(let i = 0; i < assBlockers.length; i++){
      console.log(assBlockers[i]);
      if(assBlockers[i].ariaLabel !== selectedAssignment){
        setTimeout(() => {assBlockers[i].animate({opacity: [1, 0]}, {duration: 500, fill: 'forwards'})}, 100*i);
      }
      else{
        chosenBlockIndex = i;
        console.log(chosenBlockIndex);
      }
    }
    setTimeout(() => {assBlockers[this.returnedAssignments.indexOf(selectedAssignment)].animate({opacity: [1, 0]}, {duration: 1500, fill: 'forwards'})}, 100*(assBlockers.length+1));
    // Get rid of border color
    // Fade out the chosen block
    setTimeout(() => {document.querySelector('#class-title')!.animate({opacity: [1, 0]}, {duration: 1000, fill: 'forwards'})}, 100*(assBlockers.length+1)+1000);

    setTimeout(() => {this.className = this.className + " • " +this.assignmentName;}, 100*(assBlockers.length+1) + 2000);
    setTimeout(() => {document.querySelector('#class-title')!.animate({opacity: [0, 1]}, {duration: 1000, fill: 'forwards'})}, 100*(assBlockers.length+1)+2000);

    setTimeout(() => {this.router.navigate(['/sha-validation'])}, 100*(assBlockers.length+1) + 3500);
  }

  showToast(){
    let toast: any = document.querySelector('.toast');
    toast.classList.remove("hide");
    toast.classList.add("show");
  }




  protected readonly of = of;
}




