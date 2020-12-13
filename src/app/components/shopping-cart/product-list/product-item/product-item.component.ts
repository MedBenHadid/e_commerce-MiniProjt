import {Component, Input, OnInit, Output} from '@angular/core';
import {Product} from '../../../../models/product';
import {MessengerService} from '../../../../services/messenger.service';
import {CartService} from '../../../../services/cart.service';
import {LikeslistService} from '../../../../services/likeslist.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.css']
})
export class ProductItemComponent implements OnInit {
  @Input() productItem: Product;
  @Input() addedToLikesList = false ;
  // tslint:disable-next-line:no-shadowed-variable
  constructor(
    private msg: MessengerService,
    private cartService: CartService,
    private likesService: LikeslistService,
    private route: Router

  ) {  }

  ngOnInit(): void {
    console.log();
  }
  handlerAddToCart(){
    const CurrentUserFromStorege = JSON.parse(localStorage.getItem('currentUser'));
    if (CurrentUserFromStorege !== null) {
      this.cartService.addProductToCart(this.productItem).subscribe(() => {
        this.msg.sendMsg(this.productItem);
      });
    }else{
      this.route.navigate(['/login']);

    }
  }
  handlerToAddToLikeslist(){
    this.likesService.addToLikesList(this.productItem.id).subscribe(() => {
      this.addedToLikesList = true;
    });
  }
  handlerToRemoveFromLikeslist(){
    this.likesService.removeFromLikesList(this.productItem.id).subscribe(() => {
      this.addedToLikesList = false;
    });
  }

}
