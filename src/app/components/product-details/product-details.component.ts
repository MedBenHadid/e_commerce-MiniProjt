import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {ProductService} from '../../services/product.service';
import {Product} from '../../models/product';
import {CartService} from '../../services/cart.service';
import {MessengerService} from '../../services/messenger.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {
  id: number;
  private sub: any;
  public product: Product;
  qty = 1;
  constructor(private route: ActivatedRoute,
              private productService: ProductService,
              private cartService: CartService,
              private msg: MessengerService) { }

  ngOnInit(): void {
    this.sub = this.route.params.subscribe(params => {
      this.id = +params['id']; // (+) converts string 'id' to a number
      this.productService.getProductById(this.id).subscribe((val) => {
           this.product = val;
      });

      // In a real app: dispatch action to load the details here.
    });
  }

  handlerAddToCart(product: Product){
    console.log(this.qty);
    for (let i = 1 ; i <= this.qty; i++) {
      this.cartService.addProductToCart(product).subscribe((product) => {
        this.msg.sendMsg(product);
      });
    }
    this.qty = 0;
  }
  ngOnDestroy() {
    this.sub.unsubscribe();
  }

}
