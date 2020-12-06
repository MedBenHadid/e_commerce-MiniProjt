import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {CartItem} from '../models/cart-item';
import {HttpClient} from '@angular/common/http';
import {cartUrl} from '../../config/api';
import {Product} from '../models/product';
import {isLineBreak} from 'codelyzer/angular/sourceMappingVisitor';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  objs: CartItem[] = [];
  public itemToDelete: number;

  constructor(private http: HttpClient) { }
  getCartItems(): Observable<CartItem[]>{
    // TODO : Mapping the obtained result to our CartItem props
      return this.http.get<CartItem[]>(cartUrl).pipe(
        map((result: any[]) => {
          let cartItems: CartItem[] = [];
          for (let item of result ){
            let productExist = false;
            for (const i in cartItems) {
              if (cartItems[i].productId === item.product.id) {
                cartItems[i].qty++;
                productExist = true;
                break;
              }
            }
            if (!productExist){
              cartItems.push(new CartItem(item.id, item.product));
          }
        }
          return cartItems;
        })
      );
  }

  addProductToCart(product: Product): Observable<any>{
    return this.http.post(cartUrl, { product });
  }

 DeleteProductFromCart(id: any) {

   this.getCartItems().subscribe((cartItem) => {
     console.log(id);

     for (let i = 0 ; i < cartItem.length; i++) {
       if (cartItem[i].productId === id) {
         this.http.delete(cartUrl + '/' +  cartItem[i].id ).subscribe(data => {
           console.log('done ! :' + data);
         });
         break;
       }
     }
   });
}


}
