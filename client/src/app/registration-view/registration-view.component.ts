import {Component} from '@angular/core';
import {CircuitAnimationComponent} from '../circuit-animation/circuit-animation.component';
import {RegistrationFormComponent} from '../registration-form/registration-form.component';
import {InfoButtonComponent} from '../info-button/info-button.component';
import {Toast} from '../toast';
import {ToastNotificationComponent} from '../toast-notification/toast-notification.component';

@Component({
  selector: 'app-registration-view',
  imports: [
    CircuitAnimationComponent,
    RegistrationFormComponent,
    InfoButtonComponent,
    ToastNotificationComponent,
  ],
  templateUrl: './registration-view.component.html',
  standalone: true,
  styleUrl: './registration-view.component.css'
})
export class RegistrationViewComponent {
  newToast: Toast =
    {
      imgPath: '/info.png',
      toastHeader: 'Username Instructions',
      toastBody: [
        "Enter your GitHub Username to begin validating your Commit ID",
        "Your associated email is not your username; usernames created from email addresses are created from the normalized characters that precede the @ character."
      ],
      format: "link",
      link: "http://docs.github.com/en/account-and-profile/setting-up-and-managing-your-personal-account-on-github/managing-email-preferences/remembering-your-github-username-or-email",
      description: "GitHub Username Docs"
    };

  showToast() {
    let toast: any = document.querySelector('app-toast-notification .toast');
    toast.classList.remove("hide");
    toast.classList.add("show");
    return (ToastNotificationComponent);
  }

  protected readonly setTimeout = setTimeout;
}
