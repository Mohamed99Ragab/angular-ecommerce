import { Injectable } from '@angular/core';
import { GenericService } from './generic.service';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(
    private _GenericService:GenericService,
    private _HttpClient:HttpClient,
    ) { }


  recentProducts():Observable<any>
  {
    return this._GenericService.getAll('Newproducts');
  }


  featureProducts():Observable<any>
  {
    return this._GenericService.getAll('Featuredproducts');
  }



  productDetails(id:number):Observable<any>
  {
    return this._GenericService.getByID('productDetails',id);
  }




  Products(page: number,categoryId?:number): Observable<any>
  {

    return this._HttpClient.get(`${environment.apiBaseUrl}/products` + '?page=' + page + "&categoryId=" + categoryId);
  }


 





}
