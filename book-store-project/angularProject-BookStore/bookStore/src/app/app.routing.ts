import { Routes, RouterModule } from '@angular/router';
import { GuestGuard } from './shared/guest.guard';
import { UserGuard } from './shared/user.guard';
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