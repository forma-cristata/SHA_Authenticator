import { Component } from '@angular/core';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-registration-form',
  imports: [
    FormsModule
  ],
  templateUrl: './registration-form.component.html',
  standalone: true,
  styleUrl: './registration-form.component.css'
})
export class RegistrationFormComponent {
  public termLengthInSeconds: string = new Date(Date.now() + 24 * 60 * 60 * 7 * 14 * 1000).toUTCString();
  public username: string = '';
  ngOnInit() {
      // todo: If cookie exists, reroute to classes page.
      const termLengthInSeconds = new Date(Date.now() + 24 * 60 * 60 * 7 * 14 * 1000).toUTCString();
  }

  createUsernameCookie(event: Event) {
    // @ts-ignore
    let username = this.username;
    console.log(username);
    document.cookie = `username=${username}; expires=${(this.termLengthInSeconds)}`;
    this.username = '';
    // Preventing default behavior by returning false
    return false;
  }
}
