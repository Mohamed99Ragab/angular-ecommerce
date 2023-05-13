import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './website/pages/home/home.component';
import { NavbarComponent } from './website/shared/navbar/navbar.component';
import { HeroSectionComponent } from './website/shared/hero-section/hero-section.component';
import { FooterComponent } from './website/shared/footer/footer.component';
import { AboutComponent } from './website/pages/about/about.component';
import { ContactsComponent } from './website/pages/contacts/contacts.component';
import { NotfoundComponent } from './website/pages/notfound/notfound.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http'
import { TokenInterceptor } from './interceptors/token.interceptor';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { NgxPayPalModule } from 'ngx-paypal';









@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HeroSectionComponent,
    HomeComponent,
    FooterComponent,
    AboutComponent,
    ContactsComponent,
    NotfoundComponent,
   
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ToastrModule.forRoot(),
    BrowserAnimationsModule,
    CarouselModule,
    NgxPayPalModule,
    ReactiveFormsModule,
    
    
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
     },
     
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
