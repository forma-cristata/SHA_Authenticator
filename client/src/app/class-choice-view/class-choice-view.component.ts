import {Component} from '@angular/core';
import {InfoButtonComponent} from '../info-button/info-button.component';
import {ProfileButtonComponent} from '../profile-button/profile-button.component';
import {HomeButtonComponent} from '../home-button/home-button.component';
import {CircuitAnimationComponent} from '../circuit-animation/circuit-animation.component';
import {getCookie, setCookie} from '../get-cookie';
import {Router} from '@angular/router';
import {FormsModule} from '@angular/forms';
import {Octokit} from 'octokit';
import {LoadingIconComponent} from '../loading-icon/loading-icon.component';
import {ManualPollButtonComponent} from '../manual-poll-button/manual-poll-button.component';

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
  ],
  standalone: true,
  templateUrl: './class-choice-view.component.html',
  styleUrl: './class-choice-view.component.css'
})
export class ClassChoiceViewComponent {
  public returnedClasses: string[] = [];
  private octokit = new Octokit({});
  public rALength: number[] =[];

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
    this.router.navigate(['/assignments']);
  }

  async manualPoll() {
    let data = ((await this.octokit.request(`GET http://localhost:3009/refresh`, {})));
    this.router.navigate(['/']);

  }

  // Send a request to the server (3012) using express and log the response

  /*constructor(private SHAService: SHAService) { }
  async ngOnInit() {
    await this.check();
  }

  async check() {
    let data = await this.SHAService.getClasses()
    console.log(data);
  }*/

}
