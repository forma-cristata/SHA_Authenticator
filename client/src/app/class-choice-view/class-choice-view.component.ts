import {Component} from '@angular/core';
import {InfoButtonComponent} from '../info-button/info-button.component';
import {ProfileButtonComponent} from '../profile-button/profile-button.component';
import {HomeButtonComponent} from '../home-button/home-button.component';
import {CircuitAnimationComponent} from '../circuit-animation/circuit-animation.component';
import {SHAService} from '../services/sha.service';
import {getCookie} from '../get-cookie';
import {Router} from '@angular/router';

@Component({
  selector: 'app-class-choice-view',
  imports: [
    InfoButtonComponent,
    ProfileButtonComponent,
    HomeButtonComponent,
    CircuitAnimationComponent
  ],
  standalone: true,
  templateUrl: './class-choice-view.component.html',
  styleUrl: './class-choice-view.component.css'
})
export class ClassChoiceViewComponent {
  constructor(private router: Router){}


  ngOnInit(){
    if(!getCookie('username'))
    {
      this.router.navigate(['/']);
    }
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
