import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/Auth/auth.service';
import { SocialAuthService } from "@abacritt/angularx-social-login";
import { SocialUser } from "@abacritt/angularx-social-login";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  user: any;
  isLogged:boolean = false;
  constructor(
    private _AuthService:AuthService,
    private toastr: ToastrService,
    private _Router:Router,
    // private authService: SocialAuthService

      ){}

   ngOnInit() {

        // this.authService.authState.subscribe((user) => {

        //   this.user = user;

        //   console.log(this.user);

        // });

      }


  loginForm = new FormGroup({
    'email':new FormControl('',[Validators.required,Validators.email]),
    'password':new FormControl('',[Validators.required]),
  });



  saveData(){

    this.isLogged = true;
    if(this.loginForm.valid){

      this._AuthService.login(this.loginForm.value).subscribe((response)=>{

        console.log(response)
        if(response.status == true){

          this.isLogged = false;
          
          this.toastr.success(response.message);

          localStorage.setItem('TOKEN',response.data.token);
          localStorage.setItem('user',JSON.stringify(response.data.user));

          this._Router.navigate(['/home']);

        }
        else{
          this.isLogged = false;
          this.toastr.info(response.message);

        }

      })

    }
  }


 




}
