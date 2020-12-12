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
    // console.log("userFromStoregeInProductList: " + sessionStorage.getItem('currentUser'));
    this.msg.getMsg().subscribe((val: string) => {
      if ( val !== '' ){
        console.log(val);
        let regex = new RegExp(val, 'i'); 	// Create a regex object (a constructor).
        this.productList  = this.productList.filter(item => regex.test(item.name));
        console.log(this.productList);
      }else{
        this.loadProducts();
      }
    });

    this.msg.getMsgfilter().subscribe((filterModel) => {
      let productListCopy
      if (filterModel){
        if (!filterModel.fromInput){
          this.productList = this.productList.filter(item => {
            return item.price < filterModel.toInput;
          });

        }else if(!filterModel.toInput){
          this.productList = this.productList.filter(item => {
            return item.price > filterModel.fromInput;
          });
        }else{
          this.productList = this.productList.filter(item => {
            return item.price > filterModel.fromInput && item.price < filterModel.toInput;
          });
        }

      }else{
        this.loadProducts();
      }

      console.log(filterModel);
    });
   // console.log(sessionStorage.getItem('userGoogle'));

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
