import { Injectable } from '@angular/core';
import { webSocket, WebSocketSubject } from 'rxjs/webSocket';
import { Observable } from 'rxjs';
import {normalizeExtraEntryPoints} from '@angular-devkit/build-angular/src/tools/webpack/utils/helpers';

@Injectable({
  providedIn: 'root'
})
export class WebSocketService {
  public static socket$: WebSocketSubject<any> = new WebSocketSubject('ws://localhost:3012');

  public constructor() {}
  public static sendMessage(message: any) {
    this.socket$.next(message);
  }
  public static getMessages() {
    this.socket$.subscribe();
  }
  public static closeConnection() {
    this.socket$.complete();
  }


}
