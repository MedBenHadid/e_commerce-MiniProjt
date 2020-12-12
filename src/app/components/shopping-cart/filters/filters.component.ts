import { Component, OnInit } from '@angular/core';
import {MessengerService} from '../../../services/messenger.service';

@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.css']
})
export class FiltersComponent implements OnInit {
  model: any = {};


  constructor(private msg: MessengerService) { }

  ngOnInit(): void {
  }

  HandlerOnchange() {
    this.msg.sendMsgfilter(this.model);
  }
}
