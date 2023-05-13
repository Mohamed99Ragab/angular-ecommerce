import { Observable } from 'rxjs';
import { GenericService } from './generic.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private _GenericService:GenericService) { }



  makeOrder(data:object):Observable<any>
  {


    return this._GenericService.create('makeOrder',data);

  }


  allOrders():Observable<any>
  {


    return this._GenericService.getAll('orders');

  }

poductDetails(id:number):Observable<any>

{
  return this._GenericService.getByID('orderDetails',id);

}



}
