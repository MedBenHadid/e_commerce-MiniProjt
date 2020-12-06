import { Injectable } from '@angular/core';
import { likeslistUrl } from '../../config/api';
import {HttpClient} from '@angular/common/http';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LikeslistService {

  constructor(private http: HttpClient) { }
  getLikesList(){
    return this.http.get(likeslistUrl).pipe(
      map((result: any[]) => {
          const productIds = [];
          result.forEach(item => {
            productIds.push(item.id);
          });
          return productIds;
      })
    );
  }
  addToLikesList(productId){
      return this.http.post(likeslistUrl , { id: productId });
  }

  removeFromLikesList(productId){
      return this.http.delete(likeslistUrl + '/' +  productId);
  }

}
