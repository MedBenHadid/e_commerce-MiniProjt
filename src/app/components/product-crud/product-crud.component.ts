import { Component, OnInit } from '@angular/core';
import {CrudProductService} from '../../services/crud-product.service';
import {Product} from '../../models/product';
import {MessengerService} from '../../services/messenger.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {first} from 'rxjs/operators';
import * as _ from 'lodash';
import {Router} from '@angular/router';

@Component({
  selector: 'app-product-crud',
  templateUrl: './product-crud.component.html',
  styleUrls: ['./product-crud.component.css']
})
export class ProductCrudComponent implements OnInit {
  productList: Product[] = [];
  productToAdd: boolean;
  AddProdcutForm: FormGroup;
  validFormAdd: boolean;
  private notValid: boolean;
  private success: boolean;
  imageError: string;
  isImageSaved: boolean;
  cardImageBase64: string;
  private toUpdate: any;
  private productToupdate: Product;
  constructor(private crudProduct: CrudProductService,
              private msg: MessengerService,
              private builder: FormBuilder,
              private route: Router
              ) { }
  CurrentUserFromStorege: any;

  ngOnInit(): void {
    this.CurrentUserFromStorege = JSON.parse(localStorage.getItem('currentUser'));
    if (this.CurrentUserFromStorege !== null) {
      if (this.CurrentUserFromStorege.isAdmin) {
        this.validFormAdd = false;
        this.loadProducts();
        this.msg.getMsg().subscribe((val: string) => {
          if (val !== '') {
            console.log(val);
            let regex = new RegExp(val, 'i'); 	// Create a regex object (a constructor).
            this.productList = this.productList.filter(item => regex.test(item.name));
            console.log(this.productList);
          } else {
            this.loadProducts();
          }
        });
      } else {
        this.route.navigate(['/shop']);
      }
    }else{
      this.route.navigate(['/shop']);
    }
  }
  buildForm() {
    this.AddProdcutForm = this.builder.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      price: ['', Validators.required],
      imgUrl: ['', Validators.required],
    });

  }
  addProduct(){
    if (this.AddProdcutForm.invalid){
      this.validFormAdd = this.AddProdcutForm.invalid;
    }else{
      this.AddProdcutForm.value.imgUrl = 'assets/pc.jpg';
      this.crudProduct.add(this.AddProdcutForm.value).pipe(first()).subscribe(
        result => {
            this.loadProducts();
            this.success = true;

            setTimeout(() => {
              this.success = false;
            }, 4000);

            this.validFormAdd = this.AddProdcutForm.valid;

        },
          error => {
            this.notValid = true;
            console.log('error register');
      });
      this.productToAdd = false;
    }
  }
  deleteProducts(id){
    this.crudProduct.delete(id).subscribe((products) => {
      this.loadProducts();
    });
  }

  loadProducts(){
    this.crudProduct.getAll().subscribe((products) => {
      this.productList = products.reverse();

    });
  }

  showForm() {
    if (!this.productToAdd){
      this.productToAdd = true;
      this.buildForm();

    }
  }
  fileChangeEvent(fileInput: any) {
    this.imageError = null;
    if (fileInput.target.files && fileInput.target.files[0]) {
      // Size Filter Bytes
      const max_size = 20971520;
      const allowed_types = ['image/png', 'image/jpeg'];
      const max_height = 15200;
      const max_width = 25600;

      if (fileInput.target.files[0].size > max_size) {
        this.imageError =
          'Maximum size allowed is ' + max_size / 1000 + 'Mb';

        return false;
      }

      if (! _.includes(allowed_types, fileInput.target.files[0].type)) {
        this.imageError = 'Only Images are allowed ( JPG | PNG )';
        return false;
      }
      const reader = new FileReader();
      reader.onload = (e: any) => {
        const image = new Image();
        image.src = e.target.result;
        image.onload = rs => {
          const img_height = rs.currentTarget['height'];
          const img_width = rs.currentTarget['width'];

          console.log(img_height, img_width);


          if (img_height > max_height && img_width > max_width) {
            this.imageError =
              'Maximum dimentions allowed ' +
              max_height +
              '*' +
              max_width +
              'px';
            return false;
          } else {
            const imgBase64Path = e.target.result;
            this.cardImageBase64 = imgBase64Path;
            this.isImageSaved = true;
            // this.previewImagePath = imgBase64Path;
          }
        };
      };

      reader.readAsDataURL(fileInput.target.files[0]);
    }
  }

  removeImage() {
    this.cardImageBase64 = null;
    this.isImageSaved = false;
  }

  updateProducts(product: Product) {
    if (!this.toUpdate) {
      document.getElementById('productName' + product.id).style.display = 'none';
      document.getElementById('productupdateName' + product.id).style.display = 'block';
      document.getElementById('productDescription' + product.id).style.display = 'none';
      document.getElementById('productupdateDescription' + product.id).style.display = 'block';
      document.getElementById('productPrice' + product.id).style.display = 'none';
      document.getElementById('productupdatePrice' + product.id).style.display = 'block';
      this.toUpdate = true;
    }else{
      product.name =  document.getElementById('productupdateName' + product.id).value;
      product.description =  document.getElementById('productupdateDescription' + product.id).value;
      product.price =  document.getElementById('productupdatePrice' + product.id).value;
      // console.log(productToupdate);
      this.crudProduct.update(product);
      document.getElementById('productName' + product.id).style.display = 'block';
      document.getElementById('productupdateName' + product.id).style.display = 'none';
      document.getElementById('productDescription' + product.id).style.display = 'block';
      document.getElementById('productupdateDescription' + product.id).style.display = 'none';
      document.getElementById('productPrice' + product.id).style.display = 'block';
      document.getElementById('productupdatePrice' + product.id).style.display = 'none';
      this.toUpdate = false;

    }

  }
}
