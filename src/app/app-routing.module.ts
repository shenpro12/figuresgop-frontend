import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BlogsDetailComponent } from './blogs-detail/blogs-detail.component';
import { BlogsPagesComponent } from './blogs-pages/blogs-pages.component';
import { CartPageComponent } from './cart-page/cart-page.component';
import { CheckoutsPagesComponent } from './checkouts-pages/checkouts-pages.component';
import { CollectionsPageComponent } from './collections-page/collections-page.component';
import { ErrPageComponent } from './err-page/err-page.component';
import { HomePageComponent } from './home-page/home-page.component';
import { LoginComponent } from './login-page/login/login.component';
import { RegisterPageComponent } from './login-page/register-page/register-page.component';
import { ResetPasswordPageComponent } from './login-page/reset-password-page/reset-password-page.component';
import { PagesComponent } from './pages/pages.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { ProfilePageComponent } from './profile-page/profile-page.component';
import { SearchPageComponent } from './search-page/search-page.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'blogs',
        children: [
          { path: ':type/:name', component: BlogsDetailComponent },
          { path: ':type', component: BlogsPagesComponent },
          { path: '**', component: ErrPageComponent },
        ],
      },
      {
        path: 'pages/:slug',
        component: PagesComponent,
      },
      {
        path: 'account',
        children: [
          { path: 'login', component: LoginComponent },
          { path: 'register', component: RegisterPageComponent },
          { path: 'resetpassword', component: ResetPasswordPageComponent },
          { path: 'profile', component: ProfilePageComponent },
          { path: '**', component: ErrPageComponent },
        ],
      },
      { path: 'search/:keyword', component: SearchPageComponent },
      { path: 'collections/:category', component: CollectionsPageComponent },
      { path: 'product/:name', component: ProductDetailComponent },
      { path: 'cart', component: CartPageComponent },
      {
        path: 'checkouts',
        component: CheckoutsPagesComponent,
      },
      {
        path: '',
        component: HomePageComponent,
      },
      { path: '**', component: ErrPageComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
