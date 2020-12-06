import {Component, Input, OnInit} from '@angular/core';
import {Product} from '../../../../models/product';
import {MessengerService} from '../../../../services/messenger.service';
import {CartService} from '../../../../services/cart.service';

@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.css']
})
export class ProductItemComponent implements OnInit {
  @Input() productItem: Product;
  // tslint:disable-next-line:no-shadowed-variable
  constructor(private msg: MessengerService, private cartService: CartService) {  }

  ngOnInit(): void {
  }
  handlerAddToCart(){
    this.cartService.addProductToCart(this.productItem).subscribe(() => {
      this.msg.sendMsg(this.productItem);
    });
  }

}
