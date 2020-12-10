import {Component, EventEmitter, OnInit, Output, SimpleChanges} from '@angular/core';
import {MessengerService} from '../../../services/messenger.service';
import {LoginService} from '../../../services/login.service';
import {tokens} from '../../../../environments/environment';
import {JsonFormatter} from 'tslint/lib/formatters';
import {Router} from '@angular/router';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  private thatlocation: any;
  constructor(private msg: MessengerService,private loginService: LoginService, router: Router) {
  }
  @Output() shearchOutput = new EventEmitter<string>();
  @Output() shearchInput = '';
  isLogin: boolean;
  userTokenFromStorege: any;


  async ngOnInit(): Promise<void> {
    this.loginService.checkIfUserAuthenticated().then((val)=>{
        console.log(val);
    });
    console.log('userFromStorege: ' + sessionStorage.getItem('userGoogleToken'));
    this.userTokenFromStorege = sessionStorage.getItem('userGoogleToken');
    this.isLogin = await this.loginService.checkIfUserAuthenticated();
  }




logout(){
    this.loginService.signOut();
    //console.log('logout' + this.userTokenFromStorege );
}


  changeValue() {
    this.msg.sendMsg(this.shearchInput);
    }
}
