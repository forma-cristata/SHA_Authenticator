import {Component, EventEmitter, Input, Output} from '@angular/core';
import {NgOptimizedImage} from "@angular/common";
import {Toast} from '../toast';

@Component({
  selector: 'app-toast-notification',
    imports: [
        NgOptimizedImage
    ],
  templateUrl: './toast-notification.component.html',
  styleUrl: './toast-notification.component.css'
})
export class ToastNotificationComponent {
  @Input() toast!: Toast;
  @Output() delete = new EventEmitter<Toast>();

  onDelete(){
    this.delete.emit(this.toast)
  }


}
