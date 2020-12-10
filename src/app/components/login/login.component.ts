import { Component, OnInit } from '@angular/core';
import {LoginService} from '../../services/login.service';
import {ProductService} from '../../services/product.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  model: any = {};
  private gapiSetup: Boolean;
  private authInstance: any;
  private user: gapi.auth2.GoogleUser;

  constructor(private loginService: LoginService,
  ) {
  }

  async ngOnInit(): Promise<void> {
  }

  // @ts-ignore
  // onSignIn() {
  //   const profile = googleUser.getBasicProfile();
  //   console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
  //   console.log('Name: ' + profile.getName());
  //   console.log('Image URL: ' + profile.getImageUrl());
  //   console.log('Email: ' + profile.getEmail()); // This is null if the 'email' scope is not present.
  // }
  login() {
    this.loginService.authenticate();
   // console.log(JSON.parse(sessionStorage.getItem('userGoogle')));
  }


}

