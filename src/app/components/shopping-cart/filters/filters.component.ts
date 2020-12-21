import { Component, OnInit } from '@angular/core';
import {MessengerService} from '../../../services/messenger.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.css']
})
export class FiltersComponent implements OnInit {
  model: any = {};
  shearchForm: FormGroup;


  constructor(private msg: MessengerService,              private builder: FormBuilder,) { }

  ngOnInit(): void {
    this.buildForm();

  }
  buildForm() {
    this.shearchForm = this.builder.group({
      fromInput: ['', Validators.required],
      toInput: ['', Validators.required],
    });

  }
  HandlerOnchange() {
    this.msg.sendMsgfilter(this.model);
  }
}
