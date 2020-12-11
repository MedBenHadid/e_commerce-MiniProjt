import { Injectable } from '@angular/core';
import {Observable, Subscription} from 'rxjs';
import {User} from '../models/user';
import {baseUrl, productUrl, registerUrl} from '../../config/api';
import {HttpClient, HttpEvent, HttpHeaders} from '@angular/common/http';
import {Product} from '../models/product';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class CrudProductService {

  constructor(private http: HttpClient) { }


  getAll(): Observable<Product[]> {
    return this.http.get<Product[]>(productUrl);
  }

  add(product: Product): Observable<any> {
    return this.http.post(productUrl , product);
  }

  update(product: Product): Subscription{
    console.log("+ " + product);
    return this.http.put<Product>(productUrl + '/' + product.id, product).subscribe((res)=>
    {
      console.log(res);
    });
  }

  delete(id: number): Observable<any> {
    return this.http.delete(productUrl + '/' + id);
  }

  getById(id: number): Observable<Product>{
    return this.http.get<Product>(productUrl + id);
  }
}
