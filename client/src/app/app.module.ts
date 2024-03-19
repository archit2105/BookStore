import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';
import { ProductComponent } from './product/product.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { CartComponent } from './cart/cart.component';
import { CartItemComponent } from './cart-item/cart-item.component';
import { PriceDetailsComponent } from './price-details/price-details.component';
import { SidePanelComponent } from './side-panel/side-panel.component';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { UiComponent } from './ui/ui.component';
import { SearchPipe } from './search.pipe';
import { CreateProductComponent } from './create-product/create-product.component';
import { AllProductsComponent } from './all-products/all-products.component';
import { SellerProductComponent } from './seller-product/seller-product.component';
import { NgToastModule } from 'ng-angular-popup';
import { ErrorPageComponent } from './error-page/error-page.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    HeaderComponent,
    HomeComponent,
    ProductComponent,
    ProductDetailsComponent,
    CartComponent,
    CartItemComponent,
    PriceDetailsComponent,
    SidePanelComponent,
    UiComponent,
    SearchPipe,
    CreateProductComponent,
    AllProductsComponent,
    SellerProductComponent,
    ErrorPageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    NgToastModule

  ],
  providers: [
    provideHttpClient(withFetch())
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
