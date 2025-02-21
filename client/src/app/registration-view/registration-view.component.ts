import { Component } from '@angular/core';
import {CircuitAnimationComponent} from '../circuit-animation/circuit-animation.component';
import {RegistrationFormComponent} from '../registration-form/registration-form.component';
import {InfoButtonComponent} from '../info-button/info-button.component';
import {NgOptimizedImage} from "@angular/common";
import {RouterLink} from "@angular/router";
import {window} from 'rxjs';

@Component({
  selector: 'app-registration-view',
    imports: [
        CircuitAnimationComponent,
        RegistrationFormComponent,
        InfoButtonComponent,
        NgOptimizedImage,
        RouterLink,
    ],
  templateUrl: './registration-view.component.html',
  standalone: true,
  styleUrl: './registration-view.component.css'
})
export class RegistrationViewComponent {



  showToast(){
    let toast: any = document.querySelector('.toast');
    toast.classList.remove("hide");
    toast.classList.add("show");
  }

  openMoreInfo() {
/*
    window.open('https://docs.github.com/en/account-and-profile/setting-up-and-managing-your-personal-account-on-github/managing-email-preferences/remembering-your-github-username-or-email', '_blank', "width=800,height=600,left=100,top=100");
*/
  }

  protected readonly window = window;
  protected readonly setTimeout = setTimeout;
}
