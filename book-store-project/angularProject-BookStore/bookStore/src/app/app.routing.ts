import { Routes, RouterModule } from '@angular/router';
import { AccountComponent } from './components/account/account.component';
import { ProductsComponent } from './components/products/products.component';
import { CartComponent } from './components/cart/cart.component';
import { GuestGuard } from './shared/guest.guard';
import { HomeComponent } from './components/home/home.component';
import { MainComponent } from './components/main/main.component';
import { LoginComponent } from './components/login/login.component';
import { LogoutComponent } from './components/logout/logout.component';
import { RegisterComponent } from './components/register/register.component';
import { ProductDetailsComponent } from './components/product-details/product-details.component';
import { AllProductsComponent } from './components/all-products/all-products.component';
import { UserGuard } from './shared/user.guard';
const appRoutes: Routes = [
    {
        path: 'bookStore/home', component: HomeComponent
    },
    {
        path: 'bookStore/myAccount', component: AccountComponent, children:
            [
                { path: 'login', component: LoginComponent, canActivate: [GuestGuard] },
                { path: 'register', component: RegisterComponent, canActivate: [GuestGuard] },
                { path: 'logout', component: LogoutComponent, canActivate: [UserGuard] },
            ]
    },
    {
        path: 'bookStore/products', component: ProductsComponent, children:
            [
                { path: 'allProducts', component: AllProductsComponent },
                { path: 'productDetails/:stringProduct', component: ProductDetailsComponent },
                { path: '**', redirectTo: 'allProducts' }
            ]
    },
    {
        path: 'bookStore/cart', component: CartComponent, canActivate: [UserGuard]
    },
    { path: 'bookStore', redirectTo: 'bookStore/home' },
    // otherwise redirect to home
    { path: '**', redirectTo: 'bookStore/home' }
];
export const routing = RouterModule.forRoot(appRoutes);