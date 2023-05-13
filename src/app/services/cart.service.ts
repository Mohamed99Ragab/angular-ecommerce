import { GenericService } from './generic.service';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor(private _GenericService:GenericService) { }


addToCart(data:object):Observable<any>
{

  return this._GenericService.create('addToCart',data);
}


viewCart():Observable<any>
{

  return this._GenericService.getAll('cart');
}


deleteItemCart(id:number):Observable<any>
{

  return this._GenericService.delete('cart',id);
}


updateCartAuto(quantity:Object,id:number):Observable<any>
{

  return this._GenericService.edit('updateCartAuto',quantity,id);

}





}
