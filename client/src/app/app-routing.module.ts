import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AllProductsComponent } from './all-products/all-products.component';
import { CartItemComponent } from './cart-item/cart-item.component';
import { CartComponent } from './cart/cart.component';
import { CreateProductComponent } from './create-product/create-product.component';
import { ErrorPageComponent } from './error-page/error-page.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { RegisterComponent } from './register/register.component';
import { sellerAuthGuard } from './seller-auth.guard';
import { UiComponent } from './ui/ui.component';
import { userAuthGuard } from './user-auth.guard';

const routes: Routes = [{
  path:'overview',
  component:UiComponent
},{
  path:'home',
  component:HomeComponent
},{
   
path:'register',
component:RegisterComponent
},
{
path:'login',
component:LoginComponent},{
  path:'cart',
  component:CartComponent,
  canActivate:[userAuthGuard]
},{
  path:'cart-item',
  component:CartItemComponent,
  canActivate:[userAuthGuard]
},
{
  path:'product-details',
  component:ProductDetailsComponent
},{
  path:'create-product',
  component:CreateProductComponent,
  canActivate:[sellerAuthGuard]
},{
  path:'error',
  component:ErrorPageComponent
},{
  path:'all-products',
  component:AllProductsComponent,
  canActivate:[sellerAuthGuard]
},{
  path:'',
  redirectTo:"overview",
  pathMatch:'full'
},{
  path:'**',
  redirectTo:'/error',
  pathMatch:"full"
}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
