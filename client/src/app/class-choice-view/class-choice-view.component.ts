import {Component} from '@angular/core';
import {InfoButtonComponent} from '../info-button/info-button.component';
import {ProfileButtonComponent} from '../profile-button/profile-button.component';
import {HomeButtonComponent} from '../home-button/home-button.component';
import {CircuitAnimationComponent} from '../circuit-animation/circuit-animation.component';
import {SHAService} from '../services/sha.service';

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
  // Send a request to the server (3012) using express and log the response

  constructor(private SHAService: SHAService) { }
  ngOnInit(): void {
    this.SHAService.getClasses().subscribe({
      next: (data: any) => {
        console.log(data);
      },
      error: (error: any) => {
        console.error('There was an error!', error);
      }
    });
  }

}
