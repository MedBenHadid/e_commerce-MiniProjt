import { Component, OnInit } from '@angular/core';
import {MessengerService} from '../../../services/messenger.service';
import {Product} from '../../../models/product';
import {CartService} from '../../../services/cart.service';
import {CartItem} from '../../../models/cart-item';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  cartItems = [];
  cartTotal = 0;
  constructor(private msg: MessengerService, private cartService: CartService) { }

  ngOnInit(): void {
    this.handelSubsciption();
    this.loadCartItems();

  }
      handelSubsciption(){
        this.msg.getMsg().subscribe((product: Product) => {
          // this.addProductToCart(product);
          this.loadCartItems();
        });
      }
      loadCartItems(){
        this.cartService.getCartItems().subscribe((items: CartItem[]) => {
          this.cartItems = items;
          this.calcCartTotel();
        });
      }

      calcCartTotel(){
          this.cartTotal = 0;
          this.cartItems.forEach(item => {
              this.cartTotal += (item.qty * item.price);
            });
        }
  changeQNT(val: any) {
          for (const i in this.cartItems) {
            if (this.cartItems[i].productId === val.productId) {
              this.cartItems[i].qty--;
              this.cartTotal -= this.cartItems[i].price;
              break;

            }
          }
  }


}
