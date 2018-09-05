import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { routing } from './app.routing'
import { RouterModule, Routes } from '@angular/router';
import { ReactiveFormsModule }    from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import {   AppComponent,
  HeaderComponent,
  FooterComponent,
  MainComponent,
  ProductsComponent,
  HomeComponent,
  AccountComponent,
  CartComponent,
  ProductDetailsComponent,
  LoginComponent,
  RegisterComponent,
  LogoutComponent,
  ProductPreviewComponent,
  AllProductsComponent,
  UserService,
  ProductService}from './import'
@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    MainComponent,
    ProductsComponent,
    HomeComponent,
    AccountComponent,
    CartComponent,
    ProductDetailsComponent,
    LoginComponent,
    RegisterComponent,
    LogoutComponent,
    ProductPreviewComponent,
    AllProductsComponent
  ],
  imports: [
    BrowserModule,
    routing,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  providers: [
    UserService,
    ProductService
    
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
