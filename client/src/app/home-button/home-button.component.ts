import { Component } from '@angular/core';
import {NgOptimizedImage} from '@angular/common';
import {RouterLink} from '@angular/router';

@Component({
  selector: 'app-home-button',
  imports: [
    NgOptimizedImage,
    RouterLink
  ],
  templateUrl: './home-button.component.html',
  standalone: true,
  styleUrl: './home-button.component.css'
})
export class HomeButtonComponent {

}
