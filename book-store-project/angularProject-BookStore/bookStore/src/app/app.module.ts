import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { MainComponent } from './components/main/main.component';
import { ProductsComponent } from './components/products/products.component';
import { HomeComponent } from './components/home/home.component';
import { AccountComponent } from './components/account/account.component';
import { CartComponent } from './components/cart/cart.component';
import { ProductDetailsComponent } from './components/product-details/product-details.component';
import { routing } from './app.routing'
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { LogoutComponent } from './components/logout/logout.component';
import { UserService } from './shared/services/user.service';
import { ReactiveFormsModule }    from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ProductPreviewComponent } from './components/product-preview/product-preview.component';
import { AllProductsComponent } from './components/all-products/all-products.component';
import { ProductService } from './shared/services/product.service';
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
