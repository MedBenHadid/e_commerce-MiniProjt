import {Component, EventEmitter, NgModule, OnInit, Output, SimpleChanges} from '@angular/core';
import {MessengerService} from '../../../services/messenger.service';
import {LoginService} from '../../../services/login.service';
import {tokens} from '../../../../environments/environment';
import {JsonFormatter} from 'tslint/lib/formatters';
import {Router} from '@angular/router';
import {AuthServiceService} from '../../../services/auth-service.service';
import { FormsModule } from '@angular/forms';
import {User} from '../../../models/user';


@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})

export class NavComponent implements OnInit {
  private thatlocation: any;
  constructor(private msg: MessengerService,
              private loginService: LoginService,
              private route: Router,
              private authService: AuthServiceService
  ) {
  }
  @Output() shearchOutput = new EventEmitter<string>();
  @Output() shearchInput = '';
  isLogin: boolean;
  CurrentUserFromStorege: any;


   ngOnInit(){

     this.CurrentUserFromStorege = JSON.parse(localStorage.getItem('currentUser'));
      console.log('CurrentUser : ' + JSON.stringify(this.CurrentUserFromStorege));
         // this.isLogin = await this.loginService.checkIfUserAutehenticated();

        if (this.CurrentUserFromStorege != null){
          this.isLogin = true;
        }else {
          this.isLogin = false;

        }
  }

isAuth(){
  if ( this.CurrentUserFromStorege != null){
    return  true;
  }else {
    return  false;
  }
}


logout(){
    this.authService.logout();
    this.route.navigate(['/login']).then(() => console.log('/shop'));

   this.loginService.signOut();
}


  changeValue() {
    this.msg.sendMsg(this.shearchInput);
    }
}
