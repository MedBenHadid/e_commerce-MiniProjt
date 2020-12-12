import { Injectable } from '@angular/core';
import {Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MessengerService {
  subject = new Subject();
  subjectFilter = new Subject();

  constructor() { }
  sendMsg(product){
    this.subject.next(product); //trigger event
  }
  getMsg(){
    return this.subject.asObservable();
  }
  sendMsgfilter(filterModel){
    this.subjectFilter.next(filterModel);
  }
  getMsgfilter(){
    return this.subjectFilter.asObservable();
  }


}
