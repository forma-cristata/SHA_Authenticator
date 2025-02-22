import {Component, OnInit} from '@angular/core';
import {InfoButtonComponent} from '../info-button/info-button.component';
import {ProfileButtonComponent} from '../profile-button/profile-button.component';
import {HomeButtonComponent} from '../home-button/home-button.component';
import {BackButtonComponent} from '../back-button/back-button.component';
import {Router, RouterLink} from '@angular/router';
import {getCookie, setCookie} from '../get-cookie';
import {Octokit} from 'octokit';
import {LoadingIconComponent} from '../loading-icon/loading-icon.component';
import {of} from 'rxjs';
import {ManualPollButtonComponent} from '../manual-poll-button/manual-poll-button.component';
import {Toast} from '../toast';
import {ToastNotificationComponent} from '../toast-notification/toast-notification.component';
import {TitleComponent} from '../title/title.component';

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
    ToastNotificationComponent,
    TitleComponent,
  ],
  templateUrl: './assignment-choice-view.component.html',
  standalone: true,
  styleUrl: './assignment-choice-view.component.css'
})
export class AssignmentChoiceViewComponent implements OnInit {
  public returnedAssignments: string[] = [];
  private octokit = new Octokit({});
  public rALength: number[] = [];
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

  constructor(private router: Router) {
  }

  async setReturnedAssignments(username: string, classChoice: string) {
    let data = ((await this.octokit.request(`GET http://localhost:3012/assignments?username=${encodeURIComponent(username)}&classname=${encodeURIComponent(classChoice)}`, {}))).data;
    this.returnedAssignments = [...data];
    let length = this.returnedAssignments.length;
    for (let i = 0; i < length; i += 3) {
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

  selectAssignment(selectedAssignment: string) {
    setCookie('assignment', selectedAssignment);
    this.assignmentName = selectedAssignment;
    // Get all the class-blocker elements except for the one clicked class and fade them out;
    let chosenBlockIndex = 0;
    let assBlockers = document.querySelectorAll('.ass-blocker');
    for (let i = 0; i < assBlockers.length; i++) {
      console.log(assBlockers[i]);
      setTimeout(() => {
        assBlockers[i].animate({opacity: [1, 0]}, {duration: 500, fill: 'forwards'})
      }, 100 * i);
    }
    setTimeout(() => {
      this.router.navigate(['/sha-validation'])
    }, 100 * (assBlockers.length + 1) + 500);
  }

  showToast() {
    let toast: any = document.querySelector('.toast');
    toast.classList.remove("hide");
    toast.classList.add("show");
  }

  transformProfile() {
    document.querySelector('#changing-profile-button')!.classList.remove('d-none');
    document.querySelector('#profile-button')!.classList.add('d-none');
    setTimeout(() => {
      this.router.navigate(['/profile'])
    }, 450);
  }

  transformHome() {
    document.querySelector('#home-button-changing')!.classList.remove('d-none');
    document.querySelector('#home-button')!.classList.add('d-none');
    setTimeout(() => {
      this.router.navigate(['/classes'])
    }, 450);
  }

  protected readonly of = of;
}




