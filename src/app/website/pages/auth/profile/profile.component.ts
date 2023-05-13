import { OrderService } from 'src/app/services/order.service';
import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/services/Auth/auth.service';
import { CartService } from 'src/app/services/cart.service';
import { SharedService } from 'src/app/services/shared.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

orders:any[] = [];

orderDetails:any[] = [];

user:any;

  constructor(
    private _AuthService:AuthService,
    private _OrderService:OrderService,
    private toastr: ToastrService, 
    private _Router:Router,

    ){}



  ngOnInit(): void {

   
   
    this.getAllOrders();

    this.fillForm();



  }


  logout(){

    this._AuthService.logoutFunc();
  }



  getAllOrders(){

    this._OrderService.allOrders().subscribe(res=>{

        if(res.status == true){

          this.orders = res.data

        }


    });
    
  }


  getPoductDetails(id:number){


    this._OrderService.poductDetails(id).subscribe(res=>{

      if(res.status ==true){

          this.orderDetails = res.data;

      }
    });
  }




  
  updateForm = new FormGroup({
    'first_name':new FormControl('',[Validators.required]),
    'last_name':new FormControl('',[Validators.required]),
    'email':new FormControl('',[Validators.required,Validators.email]),
    'password':new FormControl(''),
    'password_confirmation':new FormControl(''),
  });

  fillForm(){

    this._AuthService.user().subscribe(res=>{

      if(res.status == true){
        this.user = res.data


        
        this.updateForm.controls.first_name.setValue(this.user.first_name);
        this.updateForm.controls.last_name.setValue(this.user.last_name);
        this.updateForm.controls.email.setValue(this.user.email);

      }

    });



  }




  saveData(){

    
      let object = {
        'first_name':this.updateForm.controls.first_name.value,
        'last_name':this.updateForm.controls.last_name.value,
        'email':this.updateForm.controls.email.value,
        'password':this.updateForm.controls.password.value,
        'password_confirmation':this.updateForm.controls.password_confirmation.value,


      }
    

      this._AuthService.updateProfile(object).subscribe((response)=>{

        console.log(response);
        if(response.status == true){

          
          this.toastr.success(response.message);

          this.updateForm.controls.first_name.setValue(response.data.user.first_name);
          this.updateForm.controls.last_name.setValue(response.data.user.last_name);
          this.updateForm.controls.email.setValue(response.data.user.email);
          
         this.fillForm();
          

        }
        else{
          
          this.toastr.info(response.message);

        }

      })

    }
  


}
