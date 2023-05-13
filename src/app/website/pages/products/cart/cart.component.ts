import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { CartService } from 'src/app/services/cart.service';
import { SharedService } from 'src/app/services/shared.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
  
  clickEventsubscription:Subscription | undefined;


  constructor(
    private _CartService:CartService,
    private sharedService:SharedService,
    private toastr: ToastrService,



    ) {
    
  }
  ngOnInit(): void {

    this.clickEventsubscription = this.sharedService.getClickEvent().subscribe(()=>{
      
      this.viewCart();
      
      
      })

    this.viewCart();

  }

  plus:number = 1;
  cartTotal:number = 0;
  
  cartProducts:any[] =[];


  increase(cart:any){
    

    cart.quantity +=1;
    
    this.loadCart();
    this.sharedService.sendClickEvent();
    // this.updateCartAuto(Number(cart.quantity),Number(cart.id));
    
  }

  decrease(product:any){

    if(product.quantity != 1){
      product.quantity -=1;
      this.loadCart();
      this.sharedService.sendClickEvent();
     
  }

}

loadCart(){
  
  this.cartTotal =  this.cartProducts.reduce(function(acc , val){

    return acc + (val.price * val.quantity);

  },0)
}

viewCart(){

  this._CartService.viewCart().subscribe(res=>{

      if(res.status == true){

        this.cartProducts = res.data;

        this.cartTotal = 0;

        for (const iterator of this.cartProducts) {
          
          this.cartTotal += (iterator.quantity * iterator.price);
        }

        
      }

  });


}



updateCartAuto(quantity:number,id:number){

  let object = {
    'quantity':quantity
  };

  this._CartService.updateCartAuto(object,id).subscribe(res=>{

    if(res.status == true){

      
    }else{
      this.toastr.info(res.message);
    }

  })
}


deleteItemCart(id:number){

      

  this._CartService.deleteItemCart(id).subscribe(res=>{

    if(res.status == true){

      

      for(let i=0; i<this.cartProducts.length;i++){

        if(this.cartProducts[i].id == id){

          this.cartTotal -= this.cartProducts[i].price * this.cartProducts[i].quantity;

          this.cartProducts.splice(i,1);

        }

      }
          
      
      this.sharedService.sendClickEvent();

        this.toastr.success(res.message,undefined,{
          positionClass:'toast-top-center'
        });


    }else{
      this.toastr.info(res.message);
    }

});
}


}
