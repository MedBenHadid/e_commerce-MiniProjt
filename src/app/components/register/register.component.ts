import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms'
import {AuthServiceService} from '../../services/auth-service.service';
import {Router} from '@angular/router';
import {first} from 'rxjs/operators';
import {UserService} from '../../services/user.service';

/**
 *
 * @param form
 */

function passwordsMatchValidator(form) {
  const password = form.get('password')
  const confirmPassword = form.get('confirmPassword');

  if(password.value !== confirmPassword.value) {
    confirmPassword.setErrors({ passwordsMatch: true });
  } else {
    confirmPassword.setErrors(null);
  }

  return null
}

/**
 * If the data is valid return null else return an object
 */
function symbolValidator(control) {
  if(control.hasError('required')) return null;
  if(control.hasError('minlength')) return null;

  if(control.value.indexOf('@') > -1) {
    return null;
  } else {
    return { symbol: true }
  }
}

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerForm: FormGroup;
  notValid: boolean;

  constructor(private builder: FormBuilder,
              private authService: AuthServiceService,
              private route: Router,
              private userService: UserService,

  ) { }

  ngOnInit() {
    this.buildForm();
  }

  buildForm() {
    this.registerForm = this.builder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      username: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(5)]],
      confirmPassword: ''
    }, {
      validators: passwordsMatchValidator
    });
  }

  register() {
    this.registerForm.value.isAdmin = 0;

    this.userService.register(this.registerForm.value)
      .pipe(first())
      .subscribe(
        result => {
          localStorage.setItem('currentUser', JSON.stringify(this.registerForm.value));
          this.route.navigate(['/shop']);
        },
          error => {
          this.notValid = true;
         console.log('error register');
          });

}

}
