import {Component} from '@angular/core';
import {NgOptimizedImage} from '@angular/common';

@Component({
  selector: 'app-info-button',
  imports: [
    NgOptimizedImage
  ],
  templateUrl: './info-button.component.html',
  standalone: true,
  styleUrl: './info-button.component.css'
})
export class InfoButtonComponent {

}
