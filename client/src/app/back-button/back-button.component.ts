import { Component } from '@angular/core';
import {NgOptimizedImage} from '@angular/common';

@Component({
  selector: 'app-back-button',
  imports: [
    NgOptimizedImage
  ],
  templateUrl: './back-button.component.html',
  standalone: true,
  styleUrl: './back-button.component.css'
})
export class BackButtonComponent {

}
