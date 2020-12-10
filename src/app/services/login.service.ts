import { Injectable } from '@angular/core';
import {Router} from '@angular/router';
import {tokens} from '../../environments/environment';
import {LoginComponent} from '../components/login/login.component';
import {NavComponent} from '../components/shared/nav/nav.component';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private gapiSetup: Boolean;
          authInstance: any;
  private user: any;
  private error: any;
  constructor(private route: Router) { }
  async checkIfUserAuthenticated(): Promise<boolean> {
    // Initialize gapi if not done yet
    if (!this.gapiSetup) {
      await this.initGoogleAuth();
    }
    return this.authInstance.isSignedIn.get();
  }
  async initGoogleAuth(): Promise<void> {
    //  Create a new Promise where the resolve
    // function is the callback passed to gapi.load
    const pload = new Promise((resolve) => {
      gapi.load('auth2', resolve);
    });

    // When the first promise resolves, it means we have gapi
    // loaded and that we can call gapi.init
    return pload.then(async () => {
      await gapi.auth2.init({ client_id: '892203956478-4rt288gajug85b84kqud3oj6mjgncisg.apps.googleusercontent.com' })
        .then(auth => {
          this.gapiSetup = true;
          this.authInstance = auth;
        });
    });

  }
  // @ts-ignore
  async authenticate(): Promise<gapi.auth2.GoogleUser> {
    // Initialize gapi if not done yet
    if (!this.gapiSetup) {
      await this.initGoogleAuth();
    }
    // Resolve or reject sign in Promise
    return new Promise(async () => {
      await this.authInstance.signIn().then(
        user => this.user = user,
        error => this.error = error,

    );
      // gapi.load('auth2', this.user);

      sessionStorage.setItem('userGoogleToken', this.user.xc.access_token);
      await this.route.navigate(['/shop']);
    });

  }

    signOut() {
      gapi.auth2.getAuthInstance().signOut().then( () => {
        sessionStorage.removeItem('userGoogleToken');
        this.route.navigate(['/shop']).then(r => {
          console.log('User signed out.');
        });
      });

    }



}
