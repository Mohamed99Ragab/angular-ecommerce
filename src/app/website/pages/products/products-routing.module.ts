import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WishlistComponent } from './wishlist/wishlist.component';
import { StoreComponent } from './store/store.component';
import { CartComponent } from './cart/cart.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { AuthGuard } from 'src/app/guards/auth.guard';

const routes: Routes = [

  {path:'store',component:StoreComponent},
  {path:'cart',component:CartComponent},
  {path:'product-details/:id',component:ProductDetailsComponent},
  {path:'checkout',component:CheckoutComponent,canActivate:[AuthGuard]},
  {path:'wishlist',component:WishlistComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductsRoutingModule { }
