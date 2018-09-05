import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { User } from '../../shared/models/User.model';
import { ProductService } from '../../shared/services/product.service';
import { UserService } from '../../shared/services/user.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {

  product: namespace.VolumeInfo;
  stringProduct: string;
   user: User;
  myProductsCartList: namespace.VolumeInfo[];
  goToLogin: boolean;
  constructor(private router: Router, private userService: UserService, private productService: ProductService, private activate: ActivatedRoute) {
    this.goToLogin = false;
    this.myProductsCartList = this.productService.getProductsCartList();
    this.activate.params.forEach(prod => {
      this.productService.searchProduct(prod.stringProduct).subscribe(res => {
        this.product = res["items"][0].volumeInfo
      });
    })
  }

  ngOnInit() {

  }
  backToProductList() {
    this.router.navigate(['bookStore/products']);
  }
  addToMyCart() {
    if (JSON.parse(localStorage.getItem('user')).userName != "guest") {
      this.productService.addProduct(this.product);
    }
    else {
      this.goToLogin = true;
    }

  }
}
