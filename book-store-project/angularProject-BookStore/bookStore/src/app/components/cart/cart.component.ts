import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../shared/services/product.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

   myProductsCartList: any[];
  constructor(private productService: ProductService) {
    this.myProductsCartList = [];
  }

  ngOnInit() {
    this.productService.subject.subscribe({
      next: () => this.getProductsCartList()
    });
    this.getProductsCartList();

  }
  getProductsCartList() {
    this.myProductsCartList = this.productService.getProductsCartList();
  }

}
