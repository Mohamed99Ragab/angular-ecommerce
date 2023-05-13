import { CartService } from './../../../services/cart.service';
import { Component, EventEmitter, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/services/Auth/auth.service';
import { SharedService } from 'src/app/services/shared.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit , OnChanges {

  clickEventsubscription:Subscription | undefined;
  cart:any[] = [];
  cartCount:number = 0;
  cartTotal:number = 0;

  constructor(
    public _AuthService:AuthService, 
    private toastr: ToastrService,
    private _Router:Router,
    private _CartService:CartService,
    private sharedService:SharedService
    )
    {
      
     
    }
  ngOnChanges(changes: SimpleChanges): void {

    

  }
  ngOnInit(): void {
    this.clickEventsubscription = this.sharedService.getClickEvent().subscribe(()=>{
      
      this.viewCart();
      
      
      })


    this.viewCart();
  

  }


  logout(){

    this._AuthService.logoutFunc();
  }

  viewCart(){

    this._CartService.viewCart().subscribe(res=>{

        if(res.status == true){

          this.cart = res.data;

          this.cartCount = this.cart.length;
          this.cartTotal = 0;
          for (const iterator of this.cart) {
            
            
            this.cartTotal += (iterator.quantity * iterator.price);
          }

          
        }else{
          this.cart =[];
          this.cartCount = 0;
          this.cartTotal = 0;

        }

    });


  }


  deleteItemCart(id:number){

      

    this._CartService.deleteItemCart(id).subscribe(res=>{

      if(res.status == true){

    
        this.sharedService.sendClickEvent();
        
        for(let i=0; i<this.cart.length;i++){

          if(this.cart[i].id == id){

            this.cartTotal -= this.cart[i].price * this.cart[i].quantity;

            this.cart.splice(i,1);

          }

        }
            
        


          this.toastr.success(res.message,undefined,{
            positionClass:'toast-top-center'
          });

          

          this.cartCount = this.cart.length;
        
        
      }else{
        this.toastr.info(res.message);
      }

  });
  }

}
