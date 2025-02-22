import {Component} from '@angular/core';
import {InfoButtonComponent} from '../info-button/info-button.component';
import {ProfileButtonComponent} from '../profile-button/profile-button.component';
import {HomeButtonComponent} from '../home-button/home-button.component';
import {CircuitAnimationComponent} from '../circuit-animation/circuit-animation.component';
import {getCookie, setCookie} from '../get-cookie';
import {Router, RouterLink} from '@angular/router';
import {FormsModule} from '@angular/forms';
import {Octokit} from 'octokit';
import {LoadingIconComponent} from '../loading-icon/loading-icon.component';
import {ManualPollButtonComponent} from '../manual-poll-button/manual-poll-button.component';
import {NgOptimizedImage} from "@angular/common";
import {ToastNotificationComponent} from '../toast-notification/toast-notification.component';
import {Toast} from '../toast';

@Component({
  selector: 'app-class-choice-view',
  imports: [
    InfoButtonComponent,
    ProfileButtonComponent,
    HomeButtonComponent,
    CircuitAnimationComponent,
    FormsModule,
    LoadingIconComponent,
    ManualPollButtonComponent,
    RouterLink,
    ToastNotificationComponent,
  ],
  standalone: true,
  templateUrl: './class-choice-view.component.html',
  styleUrl: './class-choice-view.component.css'
})
export class ClassChoiceViewComponent {
  public returnedClasses: string[] = [];
  private octokit = new Octokit({});
  public rALength: number[] =[];
  public className: string = "";
  public time = 100;
  public toast: Toast =
    {
      imgPath: '/info.png',
      toastHeader: 'Class Instructions',
      toastBody: [
        "Click on a class block to select it.",
        "Don't see your class? Click the refresh button to manually update the rendered classes."
      ],
      format: "button",
      link: "/profile",
      description: "More info"
    };
  constructor(private router: Router){}

  async setReturnedClasses(username: string) {
    let data = ((await this.octokit.request(`GET http://localhost:3012/classes?username=${encodeURIComponent(username)}`, {}))).data;



    console.log(data);
    this.returnedClasses = [...data];

    let length = this.returnedClasses.length;

    for(let i = 0; i < length; i+=3)
    {
      this.rALength.push(i);
    }
  }
  async ngOnInit() {
    if (!getCookie('username')) {
      this.router.navigate(['/']);
    }
    setCookie('class', '');

    await this.setReturnedClasses(getCookie('username')).then(() => {
      document.querySelector('#loading-boxer')!.classList.add('d-none');
      document.querySelector('#classes-table')!.classList.remove('d-none');
    });
  }

  selectClass(selectedClass: string){
    setCookie('class', selectedClass);
    this.className = selectedClass;
    // Get all the class-blocker elements except for the one clicked class and fade them out;
    let chosenBlockIndex = 0;
    let classBlockers = document.querySelectorAll('.class-blocker');
    for(let i = 0; i < classBlockers.length; i++){
      if(classBlockers[i].innerHTML != selectedClass){
        setTimeout(() => {classBlockers[i].animate({opacity: [1, 0]}, {duration: 500, fill: 'forwards'})}, 100*i);
      }
      else{
        chosenBlockIndex = i;
      }
    }
    setTimeout(() => {classBlockers[chosenBlockIndex].animate({opacity: [1, 0]}, {duration: 1000, fill: 'forwards'})}, 100*classBlockers.length);
    // Get rid of border color
    // Fade out the chosen block
    setTimeout(() => {document.querySelector('#class-title')!.animate({opacity: [0, 1]}, {duration: 1000, fill: 'forwards'})}, 100*classBlockers.length);

    setTimeout(() => {this.router.navigate(['/assignments'])}, 100*classBlockers.length + 1000);

  }



  async manualPoll() {
    document.querySelector('#loading-boxer')!.classList.remove('d-none');
    document.querySelector('#classes-table')!.classList.add('d-none');
    ((await this.octokit.request(`GET http://localhost:3009/refresh`, {}))).data;
    document.querySelector('#loading-boxer')!.classList.add('d-none');
    document.querySelector('#classes-table')!.classList.remove('d-none');

    this.router.navigate(['/']);

  }

  showToast(){
    let toast: any = document.querySelector('.toast');
    toast.classList.remove("hide");
    toast.classList.add("show");
  }

  transformProfile(){
    document.querySelector('#changing-profile-button')!.classList.remove('d-none');
    document.querySelector('#profile-button')!.classList.add('d-none');
    setTimeout(() => {this.router.navigate(['/profile'])}, 450);
  }



}
