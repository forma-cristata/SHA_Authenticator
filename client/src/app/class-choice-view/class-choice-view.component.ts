import {Component} from '@angular/core';
import {InfoButtonComponent} from '../info-button/info-button.component';
import {ProfileButtonComponent} from '../profile-button/profile-button.component';
import {HomeButtonComponent} from '../home-button/home-button.component';
import {CircuitAnimationComponent} from '../circuit-animation/circuit-animation.component';
import {getCookie, setCookie} from '../get-cookie';
import {Router} from '@angular/router';
import {FormsModule} from '@angular/forms';
import {Octokit} from 'octokit';

@Component({
  selector: 'app-class-choice-view',
  imports: [
    InfoButtonComponent,
    ProfileButtonComponent,
    HomeButtonComponent,
    CircuitAnimationComponent,
    FormsModule,
  ],
  standalone: true,
  templateUrl: './class-choice-view.component.html',
  styleUrl: './class-choice-view.component.css'
})
export class ClassChoiceViewComponent {
  public returnedClasses: string[] = [];
  private octokit = new Octokit({});
  constructor(private router: Router){}

  async setReturnedClasses(username: String) {
    let data = ((await this.octokit.request(`GET http://localhost:3012/classes?username=${username}`, {}))).data;



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
