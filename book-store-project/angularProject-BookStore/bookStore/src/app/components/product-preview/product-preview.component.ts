import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { ProductService } from '../../shared/services/product.service';

@Component({
  selector: 'app-product-preview',
  templateUrl: './product-preview.component.html',
  styleUrls: ['./product-preview.component.css']
})
export class ProductPreviewComponent implements OnInit {
  @Input()
  product:any;
  
  @Input()
  isFromCart:boolean;
  constructor(private router: Router,private productService:ProductService) {
    
  }
  ngOnInit() {
    console.log(this.product);
  }
  viewDetails() {
    let stringProduct=JSON.stringify(this.product);
    this.router.navigate(['/bookStore/products/productDetails',this.product["volumeInfo"].title]);
  }
  removeBook() {
   
    this.productService.removeProduct(this.product);
  }

}
