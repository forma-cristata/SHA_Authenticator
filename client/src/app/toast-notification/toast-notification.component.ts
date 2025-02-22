import {Component, EventEmitter, Input, Output} from '@angular/core';
import {NgIf, NgOptimizedImage} from "@angular/common";
import {Toast} from '../toast';
import {RouterLink} from '@angular/router';

@Component({
  selector: 'app-toast-notification',
  imports: [
    NgOptimizedImage,
    NgIf,
    RouterLink
  ],
  templateUrl: './toast-notification.component.html',
  styleUrl: './toast-notification.component.css'
})
export class ToastNotificationComponent {
  @Input() toast!: Toast;
  @Output() delete = new EventEmitter<Toast>();
}
