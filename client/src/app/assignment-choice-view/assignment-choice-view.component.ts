import { Component } from '@angular/core';
import {InfoButtonComponent} from '../info-button/info-button.component';
import {ProfileButtonComponent} from '../profile-button/profile-button.component';
import {HomeButtonComponent} from '../home-button/home-button.component';
import {BackButtonComponent} from '../back-button/back-button.component';
import {Router, RouterLink} from '@angular/router';
import {getCookie, setCookie} from '../get-cookie';

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

  constructor(private router: Router){}

  setReturnedAssignments(){


    // TODO API Return Call Set
    this.returnedAssignments = ['Assignment 1', 'Assignment 2', 'Assignment 3', 'Assignment 4', 'Assignment 5', 'Assignment 6'];
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
    this.setReturnedAssignments();
  }

  selectAssignment(selectedAssignment: string){
    setCookie('assignment', selectedAssignment);
    this.router.navigate(['/sha-validation']);
  }
}


