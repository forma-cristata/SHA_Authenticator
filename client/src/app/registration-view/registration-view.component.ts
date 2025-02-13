import { Component } from '@angular/core';
import {CircuitAnimationComponent} from '../circuit-animation/circuit-animation.component';
import {RegistrationFormComponent} from '../registration-form/registration-form.component';
import {InfoButtonComponent} from '../info-button/info-button.component';
import { WebSocketService } from '../services/web-socket.service';

@Component({
  selector: 'app-registration-view',
  imports: [
    CircuitAnimationComponent,
    RegistrationFormComponent,
    InfoButtonComponent,
  ],
  templateUrl: './registration-view.component.html',
  standalone: true,
  styleUrl: './registration-view.component.css'
})
export class RegistrationViewComponent {

  messages: any[] = [];

  sendMessage(message: string) {
    WebSocketService.sendMessage(message);
  }


  ngOnInit() {

    this.sendMessage('Hello, Server!');
    WebSocketService.getMessages();

  }

}
