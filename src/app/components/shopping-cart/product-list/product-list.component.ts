import { Component, OnInit } from '@angular/core';
import { ProductService} from '../../../services/product.service';
import {Product} from '../../../models/product';
import {LikeslistService} from '../../../services/likeslist.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  productList: Product[] = [];
  likesList: number[] = [];
  constructor(
    private productService: ProductService,
    private likesListServece: LikeslistService
    ) { }

  ngOnInit(): void {
    this.loadProducts();
    this.loadLikeslist();
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
