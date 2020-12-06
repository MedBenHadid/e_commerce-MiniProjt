import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {MessengerService} from '../../../services/messenger.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  @Output() shearchOutput = new EventEmitter<string>();

  @Output() shearchInput = '';
  constructor(private msg: MessengerService) { }

  ngOnInit(): void {
  }


  changeValue() {

    this.msg.sendMsg(this.shearchInput);
    }

}
