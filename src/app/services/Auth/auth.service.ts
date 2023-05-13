import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, switchMap } from 'rxjs';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private httpClient:HttpClient,private _Router:Router) { }

  register(data:object) : Observable<any>
  {
    return this.httpClient.post(`${environment.apiBaseUrl}/auth/register`,data);

  }


  login(data:object) : Observable<any>
  {
    return this.httpClient.post(`${environment.apiBaseUrl}/auth/login`,data);

  }


  logout() : Observable<any>
  {
    return this.httpClient.post(`${environment.apiBaseUrl}/logout`,null);

  }

  logoutFunc()
  {



    localStorage.removeItem('TOKEN');
    localStorage.removeItem('user');
    this._Router.navigate(['/auth/login'])
    // this.logout().subscribe(res=>{

    //   if(res.status == true){

    //     localStorage.removeItem('TOKEN');
    //     this._Router.navigate(['/auth/login'])

    //   }

    // });
  }


  forgetPassword(data:object) : Observable<any>
  {
    return this.httpClient.post(`${environment.apiBaseUrl}/forget-password`,data);

  }

  restPassword(data:object) : Observable<any>
  {
    return this.httpClient.post(`${environment.apiBaseUrl}/rest-password`,data);

  }


  updateProfile(data:object) : Observable<any>
  {
    return this.httpClient.post(`${environment.apiBaseUrl}/edit-profile`,data);

  }


 
  user() : Observable<any>
  {
    return this.httpClient.get(`${environment.apiBaseUrl}/user`);

  }


  getToken(){

    return localStorage.getItem('TOKEN');
  }


  getuserData():any
  {

    return localStorage.getItem('user');
  }


}
