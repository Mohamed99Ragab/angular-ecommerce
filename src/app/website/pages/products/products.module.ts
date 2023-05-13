import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { StoreComponent } from './store/store.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductsRoutingModule } from './products-routing.module';
import { CartComponent } from './cart/cart.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { WishlistComponent } from './wishlist/wishlist.component';
import { NgxPayPalModule } from 'ngx-paypal';
import { NgxPaginationModule } from 'ngx-pagination';
import { ShareButtonsModule } from 'ngx-sharebuttons/buttons';
import { ShareIconsModule } from 'ngx-sharebuttons/icons';
import { SearchPipe } from './pipes/search.pipe';


@NgModule({
  declarations: [
    CartComponent,
    CheckoutComponent,
    ProductDetailsComponent,
    StoreComponent,
    WishlistComponent,
    SearchPipe,
    
  ],
  imports: [
    CommonModule,
    ProductsRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgxPayPalModule,
    NgxPaginationModule,
    ShareButtonsModule,
    ShareIconsModule,
 
    
    
  ]
})
export class ProductsModule { }
