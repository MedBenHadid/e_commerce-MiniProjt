import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import {loginUrl, registerUrl} from '../../config/api';
import {User} from '../models/user';
import {first, map} from 'rxjs/operators';
import { JwtHelperService } from "@auth0/angular-jwt";
import {UserService} from './user.service';

const helper = new JwtHelperService();

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {
  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;
  constructor(private http: HttpClient,private userService: UserService) {
    this.currentUserSubject = new BehaviorSubject<User>(localStorage.getItem('id'));
    this.currentUser = this.currentUserSubject.asObservable();
  }

  login(data): Observable<any>{
    return this.http.post(loginUrl, data).pipe(
      map(response => {
      const user = new User;
      if (response && response.accessToken) {
        const decodedToken = helper.decodeToken(response.accessToken);
        user.id = Number(decodedToken.sub);
        user.token  = response.accessToken;

        this.userService.getById(user.id)
          .pipe(first())
          .subscribe( (res) => {
              user.email  = res.email;
              user.firstName = res.firstName;
              user.lastName = res.lastName;
              user.isAdmin = res.isAdmin;
              user.username = res.username;
              user.profilePicture = res.profilePicture;
              localStorage.setItem('currentUser', JSON.stringify(user));

          });


      }
        // this.currentUserSubject.next(user);

      return user;

    }));

  }


  logout() {
    localStorage.clear();
    this.currentUserSubject.next(null);

  }

}
