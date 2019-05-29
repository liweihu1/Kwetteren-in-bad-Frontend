import { Injectable } from '@angular/core';
import { webSocket } from "rxjs/webSocket";
import { Constants } from 'src/app/constants/api.consts';

@Injectable({
  providedIn: 'root'
})
export class WebsocketService {

  constructor() {}

  private subject;

  public onMessage() {
    return this.subject;
  }

  public sendMessage(message: string, authorId: string) {
    this.subject.next({message, authorId});
  }

  public connect(url: string) {
    if (!this.subject) {
      this.subject = this.create(url + `?token=${localStorage.getItem(Constants.TOKEN)}`);
    }
    return this.subject;
  }

  private create(url: string){
    let subject = webSocket(url);
    return subject;
  }
}
