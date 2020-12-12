import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {User} from '../models/user';
import {Observable} from 'rxjs';
import {baseUrl, registerUrl, userUrl} from '../../config/api';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  getAll(): Observable<User[]> {
    return this.http.get<User[]>(userUrl);
  }

  register(user: User): Observable<any> {
    return this.http.post(registerUrl , user);
  }

  delete(id: number): Observable<any> {
    return this.http.delete(userUrl + `/${id}`);
  }

  getById(id: number): Observable<User>{
    return this.http.get<User>(userUrl + `/${id}`);
  }}
