import {Component, OnInit} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {Router} from '@angular/router';
import {Location} from '@angular/common';
import {getCookie} from '../get-cookie';

@Component({
  selector: 'app-change-username',
  imports: [
    FormsModule
  ],
  templateUrl: './change-username.component.html',
  standalone: true,
  styleUrl: './change-username.component.css'
})
export class ChangeUsernameComponent implements OnInit {
  public termLengthInSeconds: string = new Date(Date.now() + 24 * 60 * 60 * 7 * 14 * 1000).toUTCString();
  public username: string = getCookie("username");

  constructor(private router: Router, private location: Location) {
  }

  ngOnInit() {
    this.termLengthInSeconds = new Date(Date.now() + 24 * 60 * 60 * 7 * 14 * 1000).toUTCString();
  }

  createUsernameCookie(event: Event) {
    // @ts-ignore
    let username = this.username;
    console.log(username);
    document.cookie = `username=${username}; expires=${(this.termLengthInSeconds)}`;
    this.username = '';
    this.router.navigate(['/classes']);
  }
}
