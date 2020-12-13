import {Component, EventEmitter, NgModule, OnInit, Output, SimpleChanges} from '@angular/core';
import {MessengerService} from '../../../services/messenger.service';
import {LoginService} from '../../../services/login.service';
import {tokens} from '../../../../environments/environment';
import {JsonFormatter} from 'tslint/lib/formatters';
import {NavigationEnd, Router, RouterEvent} from '@angular/router';
import {AuthServiceService} from '../../../services/auth-service.service';
import { FormsModule } from '@angular/forms';
import {User} from '../../../models/user';
import {filter} from 'rxjs/operators';


@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})

export class NavComponent implements OnInit {
  private thatlocation: any;
  private isConnectedByGoogle: boolean;
  private user: any;
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

     this.user = JSON.parse(localStorage.getItem('currentUser'));
     this.authService.getEmitter().subscribe((customObject) => {
       this.user = customObject;
     });
     if (this.user.xt) {
       this.isConnectedByGoogle = true;
       console.log("google");
       this.CurrentUserFromStorege = this.user.xt;
       this.CurrentUserFromStorege.isAdmin = 0;
       console.log('CurrentUser : ' + JSON.stringify(this.CurrentUserFromStorege.Ad));

     }else {
       this.isConnectedByGoogle = false;

       this.CurrentUserFromStorege = this.user;
     }
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
