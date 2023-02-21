import { NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { SwiperModule } from 'swiper/angular';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { HeaderItemComponent } from './header/header-item/header-item.component';
import { LoginButtonComponent } from './header/login-button/login-button.component';
import { StoreModule, combineReducers } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatTableModule } from '@angular/material/table';
import { CookieService } from 'ngx-cookie-service';

import { productReducer } from './store/reducer/product.reducer';
import { loginReducer } from './store/reducer/login.reducer';
import { FooterComponent } from './footer/footer.component';
import { HomePageComponent } from './home-page/home-page.component';
import { ErrPageComponent } from './err-page/err-page.component';
import { MainSliderComponent } from './home-page/main-slider/main-slider.component';
import { CollectionComponent } from './home-page/collection/collection.component';
import { SloganComponent } from './home-page/slogan/slogan.component';
import { LoadingComponent } from './loadings/loading/loading.component';
import { ProductTabComponent } from './home-page/product-tab/product-tab.component';
import { ProductHelper } from './helper/product.helper';
import { ProductSliderItemComponent } from './home-page/product-tab/product-slider-item/product-slider-item.component';
import { CollectionsPageComponent } from './collections-page/collections-page.component';
import { ProductFilterComponent } from './collections-page/product-filter/product-filter.component';
import { FomatDataHelper } from './helper/fomatData.helper';
import { CurrentFilterComponent } from './collections-page/current-filter/current-filter.component';
import { PageContentComponent } from './collections-page/page-content/page-content.component';
import { PageControlComponent } from './collections-page/page-control/page-control.component';
import * as CustomPipe from './custom-pipe';
import * as CustomDirective from './custom-directive';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { GalleryComponent } from './product-detail/gallery/gallery.component';
import { DetailComponent } from './product-detail/detail/detail.component';
import { RelatedProductsComponent } from './product-detail/related-products/related-products.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { cartReducer } from './store/reducer/cart.reducer';
import { CartHelper } from './helper/cart.helper';
import { CartComponent } from './header/cart/cart.component';
import { CartPageComponent } from './cart-page/cart-page.component';
import { CartItemComponent } from './cart-page/cart-item/cart-item.component';
import { RegisterPageComponent } from './login-page/register-page/register-page.component';
import { ResetPasswordPageComponent } from './login-page/reset-password-page/reset-password-page.component';
import { ProfilePageComponent } from './profile-page/profile-page.component';
import { SiteLoadingComponent } from './site-loading/site-loading.component';
import { SiteLoadingShareService } from './services/communicateWithSiteLoading.service';
import { LoginComponent } from './login-page/login/login.component';
import { CartService } from './services/cart.service';
import { CheckoutsPagesComponent } from './checkouts-pages/checkouts-pages.component';
import { StockProblemsComponent } from './checkouts-pages/stock-problems/stock-problems.component';
import { OrderComponent } from './checkouts-pages/order/order.component';
import { SearchResultComponent } from './header/search-result/search-result.component';
import { SearchPageComponent } from './search-page/search-page.component';
import { CustomInputComponent } from './checkouts-pages/order/custom-input/custom-input.component';
import { PaymentMedthosComponent } from './checkouts-pages/order/payment-medthos/payment-medthos.component';
import { ShippingMedthosComponent } from './checkouts-pages/order/shipping-medthos/shipping-medthos.component';
import { SelectBoxComponent } from './checkouts-pages/order/select-box/select-box.component';
import Provinces from './helper/provinces';
import { ProfileComponent } from './profile-page/profile/profile.component';
import { OrderHistoriesComponent } from './profile-page/order-histories/order-histories.component';
import { OrderService } from './services/order.service';
import { PagesComponent } from './pages/pages.component';
import { PopupContactComponent } from './popup-contact/popup-contact.component';
import { BlogsPagesComponent } from './blogs-pages/blogs-pages.component';
import { BlogsDetailComponent } from './blogs-detail/blogs-detail.component';
import { blogsReducer } from './store/reducer/blog.reducer';
import { RelatedPostComponent } from './blogs-detail/related-post/related-post.component';
import { NewsComponent } from './home-page/news/news.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HeaderItemComponent,
    LoginButtonComponent,
    FooterComponent,
    HomePageComponent,
    ErrPageComponent,
    MainSliderComponent,
    CollectionComponent,
    SloganComponent,
    LoadingComponent,
    ProductTabComponent,
    ProductSliderItemComponent,
    CollectionsPageComponent,
    ProductFilterComponent,
    CurrentFilterComponent,
    PageContentComponent,
    PageControlComponent,
    CustomPipe.RoundBelow,
    CustomDirective.StopPropagationDirective,
    ProductDetailComponent,
    GalleryComponent,
    DetailComponent,
    RelatedProductsComponent,
    CartComponent,
    CartPageComponent,
    CartItemComponent,
    RegisterPageComponent,
    ResetPasswordPageComponent,
    ProfilePageComponent,
    SiteLoadingComponent,
    LoginComponent,
    CheckoutsPagesComponent,
    StockProblemsComponent,
    OrderComponent,
    SearchResultComponent,
    SearchPageComponent,
    CustomInputComponent,
    PaymentMedthosComponent,
    ShippingMedthosComponent,
    SelectBoxComponent,
    ProfileComponent,
    OrderHistoriesComponent,
    PagesComponent,
    PopupContactComponent,
    BlogsPagesComponent,
    BlogsDetailComponent,
    RelatedPostComponent,
    NewsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FontAwesomeModule,
    FormsModule,
    SwiperModule,
    HttpClientModule,
    MatProgressBarModule,
    MatTableModule,
    StoreModule.forRoot({
      app: combineReducers({
        product: productReducer,
        login: loginReducer,
        cart: cartReducer,
        blogs: blogsReducer,
      }),
    }),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: !isDevMode() }),
    BrowserAnimationsModule,
  ],
  providers: [
    ProductHelper,
    FomatDataHelper,
    CartHelper,
    CookieService,
    SiteLoadingShareService,
    CartService,
    Provinces,
    OrderService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
