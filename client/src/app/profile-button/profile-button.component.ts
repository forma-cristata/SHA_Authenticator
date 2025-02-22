import { Component } from '@angular/core';
import {NgOptimizedImage} from '@angular/common';
import {Router, RouterLink} from '@angular/router';

@Component({
  selector: 'app-profile-button',
  imports: [
    NgOptimizedImage,
    RouterLink,
  ],
  templateUrl: './profile-button.component.html',
  standalone: true,
  styleUrl: './profile-button.component.css'
})
export class ProfileButtonComponent {
  constructor(private router: Router) {
  }

}
