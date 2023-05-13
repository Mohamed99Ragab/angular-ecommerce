import { CartService } from './../../../../services/cart.service';
import { Component, OnInit } from '@angular/core';
import { render } from 'creditcardpayments/creditCardPayments';
import { ToastrService } from 'ngx-toastr';
import { IPayPalConfig, ICreateOrderRequest } from 'ngx-paypal';
import { environment } from 'src/environments/environment.development';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { SharedService } from 'src/app/services/shared.service';
import { OrderService } from 'src/app/services/order.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit {

  paymentsOptions = '';

  cartProducts:any[]= [];

  cartTotal:number = 0;
  transaction_id:string ="";
  paymentStatus:string="";
  public payPalConfig?: IPayPalConfig;
  showSuccess!: boolean;
  clickEventsubscription:Subscription | undefined;


constructor(
  private _CartService:CartService,
  private toastr: ToastrService,
  private sharedService:SharedService,
  private _OrderService:OrderService,
  private _Router:Router,

  ){

  }

  ngOnInit(): void {
    

    this.clickEventsubscription = this.sharedService.getClickEvent().subscribe(()=>{
      
      this.viewCart();
      
      
      })


    

      this.viewCart();

      this.initConfig();
     
    
  }


  billingForm = new FormGroup({

    'phone':new FormControl('',[Validators.required]),
    'address':new FormControl('',[Validators.required]),
    'paymentMethod':new FormControl(''),

  });



  change(event:any){
    // console.log(this.paymentMethod);
    this.paymentsOptions = event.target.value;
    
   
  }


  viewCart(){

    this._CartService.viewCart().subscribe(res=>{
  
        if(res.status == true){
  
          this.cartProducts = res.data;
  
          this.cartTotal = 0;
  
          for (const iterator of this.cartProducts) {
            
            this.cartTotal += (iterator.quantity * iterator.price);
         
          }
  
          
        }else{
          this.cartProducts = [];
          this.cartTotal = 0;
        }
  
    });
  
  
  }
  
  private initConfig(): void {
    this.payPalConfig = {
    currency: 'USD',
    clientId:`${environment.clientId}`,
    createOrderOnClient: (data) => <ICreateOrderRequest>{
      intent: 'CAPTURE',
      purchase_units: [
        {
          amount: {
            currency_code: 'USD',
            value: `${this.cartTotal}`,
            breakdown: {
              item_total: {
                currency_code: 'USD',
                value: `${this.cartTotal}`
              }
            }
          }
          
        }
      ]
    },
    advanced: {
      commit: 'true'
    },
    style: {
      label: 'paypal',
      layout: 'vertical'
    },
    onApprove: (data, actions) => {
      console.log('onApprove - transaction was approved, but not authorized', data, actions);
      actions.order.get().then((details:any) => {
        console.log('onApprove - you can get full order details inside onApprove: ', details);
        
      
      });
    },
    onClientAuthorization: (data) => {
      console.log('onClientAuthorization - you should probably inform your server about completed transaction at this point', data);
      this.paymentStatus = data.status;
      this.showSuccess = true;
      this.transaction_id = data.id;

      if(data.status==="COMPLETED"){

        this.toastr.success('pay success');

       
        
      }
      

        this.makeOrder();
        
      
      
      
    },
    onCancel: (data, actions) => {
      console.log('OnCancel', data, actions);
    },
    onError: err => {
      console.log('OnError', err);
    },
    onClick: (data, actions) => {
      console.log('onClick', data, actions);
    },
  };
  }


  makeOrder(){




   let orderObject = {

      'phone':this.billingForm.controls.phone.value,
      'address':this.billingForm.controls.address.value,
      'order_items':this.cartProducts,
      'transaction_id':this.transaction_id,
      'paymentMethod':this.billingForm.controls.paymentMethod.value,
      'paymentStatus':this.paymentStatus,
      'total':this.cartTotal
    }

    if(this.billingForm.valid){

      this._OrderService.makeOrder(orderObject).subscribe(res=>{

        if(res.status == true){

          this.sharedService.sendClickEvent();



  


          this._Router.navigate(['/home']);
        }
        console.log(res);
  
      });

    }
   

  }

  






}
