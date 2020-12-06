import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {MessengerService} from '../../../../services/messenger.service';
import {CartService} from '../../../../services/cart.service';
@Component({
  selector: 'app-cart-item',
  templateUrl: './cart-item.component.html',
  styleUrls: ['./cart-item.component.css']
})
export class CartItemComponent implements OnInit {
  @Input() cartItem: any;
  @Output() Minus =new EventEmitter;
  constructor(private msg: MessengerService, private cartService: CartService) { }

  ngOnInit(): void {
  }


  handlerMinusProduct() {
    if (this.cartItem.qty > 0) {
      this.Minus.emit(
        this.cartItem
      );
      this.cartService.DeleteProductFromCart(this.cartItem.productId);
    }
  }
}
