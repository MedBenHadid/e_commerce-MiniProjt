import { Injectable } from '@angular/core';
import  { Product } from '../models/product';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {productUrl} from '../../config/api';

@Injectable({
  providedIn: 'root'
})
export class ProductService {


  constructor(private http: HttpClient) { }
  getProducts(): Observable<Product[]>{
    return this.http.get<Product[]>(productUrl);
  }
  getProductById(id): Observable<Product>{
  return this.http.get<Product>(productUrl + '/' + id);
}
}
