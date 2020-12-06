import { Component, OnInit } from '@angular/core';
import { ProductService} from '../../../services/product.service';
import {Product} from '../../../models/product';
import {LikeslistService} from '../../../services/likeslist.service';
import {MessengerService} from '../../../services/messenger.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  productList: Product[] = [];
  likesList: number[] = [];
  private productListCopy: Product[];
  constructor(
    private msg: MessengerService,
    private productService: ProductService,
    private likesListServece: LikeslistService
    ) { }

  ngOnInit(): void {
    this.loadLikeslist();
    this.loadProducts();

    this.msg.getMsg().subscribe((val: string) => {
      if( val != ''){
      this.productList = this.productList.filter((value) => {
        return value.name.match('/' + val + '.*/');
      });
      }else{
        this.loadProducts();
      }
    });

  }

  loadProducts(){

    this.productService.getProducts().subscribe((products) => {
      this.productList = products;
    });
  }
  loadLikeslist(){
    this.likesListServece.getLikesList().subscribe(productIds => {
      this.likesList = productIds;
    });
  }

}
