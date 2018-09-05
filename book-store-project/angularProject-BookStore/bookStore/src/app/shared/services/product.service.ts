import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { User } from '../models/User.model';

@Injectable({
    providedIn: 'root'
})
export class ProductService {
    searchParameter: string;
    subject=new Subject();
    myProductsCartList: any[];
    constructor(private httpClient: HttpClient) {
        this.searchParameter = 'a';
        this.myProductsCartList = [];
       
        // this.url = `https://www.googleapis.com/books/v1/volumes?q=${this.searchParameter}&maxResults=40&fields=items(saleInfo%2FlistPrice%2CvolumeInfo(authors%2Cdescription%2CimageLinks(smallThumbnail%2Cthumbnail)%2Clanguage%2CmainCategory%2CpageCount%2CpublishedDate%2Cpublisher%2Csubtitle%2Ctitle))`;
    }
    searchProduct(title: string) {
        console.log(title);
        if (title == null)
            this.searchParameter = 'a';
        else
            this.searchParameter = title;

        return this.httpClient.get(`https://www.googleapis.com/books/v1/volumes?q="${this.searchParameter}"&maxResults=40&fields=items(saleInfo%2FlistPrice%2CvolumeInfo(authors%2Cdescription%2CimageLinks(smallThumbnail%2Cthumbnail)%2Clanguage%2CmainCategory%2CpageCount%2CpublishedDate%2Cpublisher%2Csubtitle%2Ctitle))`)
        // return [volumeInfo:{title: "Venice", subtitle: "A Documentary History, 1450-1630", authors: Array(4), publisher: "University of Toronto Press", publishedDate: "2001", …}];
    }

    getProductsCartList() {
        this.myProductsCartList = JSON.parse(localStorage.getItem("myCart"));
        return this.myProductsCartList;
    }
    addProduct(product: namespace.VolumeInfo) {
        if (!this.myProductsCartList)
            this.myProductsCartList = [];
        console.log(product);
        this.myProductsCartList.push(product);
        localStorage.setItem("myCart", JSON.stringify(this.myProductsCartList));
    }

    removeProduct(product: namespace.VolumeInfo) {
        let index = this.myProductsCartList.indexOf(product);
        this.myProductsCartList.splice(index, 1);
        localStorage.setItem("myCart", JSON.stringify(this.myProductsCartList));
    }

}