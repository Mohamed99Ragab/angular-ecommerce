import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/Auth/auth.service';
import {Router} from '@angular/router'
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {

  isLogged:boolean = false;

  constructor(private _AuthService:AuthService, private toastr: ToastrService, private _Router:Router){

  }


   registerForm = new FormGroup({
    'first_name':new FormControl('',[Validators.required]),
    'last_name':new FormControl('',[Validators.required]),
    'email':new FormControl('',[Validators.required,Validators.email]),
    'password':new FormControl('',[Validators.required]),
    'password_confirmation':new FormControl('',[Validators.required]),
  });


  saveData(){

    this.isLogged = true;
    if(this.registerForm.valid){

      this._AuthService.register(this.registerForm.value).subscribe((response)=>{

        console.log(response)
        if(response.status == true){
          this.isLogged = false;
          
          this.toastr.success(response.message);

          localStorage.setItem('TOKEN',response.data.token);
          localStorage.setItem('user',JSON.stringify(response.data.user));
          this._Router.navigate(['/auth/profile'])

        }
        else{
             this.isLogged = false;

          this.toastr.info(response.message);

        }

      })

    }
  }


}
