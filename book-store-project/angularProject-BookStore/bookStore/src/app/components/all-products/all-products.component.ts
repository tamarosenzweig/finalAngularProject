import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductService } from '../../shared/services/product.service';

@Component({
  selector: 'app-all-products',
  templateUrl: './all-products.component.html',
  styleUrls: ['./all-products.component.css']
})
export class AllProductsComponent implements OnInit {

  searchForm: FormGroup;
  productsList:any[]=[]
  constructor(private fb: FormBuilder, private productServise: ProductService) {
    this.searchForm = this.fb.group({
      search: ['']
    });
  }
  get search() {
    return this.searchForm.get("search");
  }
  onSubmit() {
  }
  searchProducts() {
    console.log(this.searchForm.get("search").value);
    this.productServise.searchProduct(this.searchForm.get("search").value).subscribe(
      res => {
        this.productsList = res["items"];
        console.log(res);
        console.log(this.productsList);
      }
    )
  }
  ngOnInit() {
    this.searchProducts();
  }

}
