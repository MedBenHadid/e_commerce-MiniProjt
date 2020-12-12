import { Component, OnInit } from '@angular/core';
import {LoginService} from '../../services/login.service';
import {ProductService} from '../../services/product.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {AuthServiceService} from '../../services/auth-service.service';
import {Router} from '@angular/router';
import {first} from 'rxjs/operators';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  formGroup: FormGroup;
  model: any = {};
  private gapiSetup: boolean;
  private authInstance: any;
  notValid = false;

  constructor(private loginService: LoginService,
              private authService: AuthServiceService,
              private route: Router
  ) {
  }

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.formGroup = new FormGroup({
      email: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required])

    });
  }


  loginGoole() {
    this.loginService.authenticate();
  }


  login() {
    console.log(this.model);
    this.authService.login(this.model)
      .subscribe( (result) => {

        this.route.navigate(['/shop']);

      }, (error) => {
        console.log('error login: ' + JSON.stringify(error));
        this.notValid = true;
      });

  }

}
