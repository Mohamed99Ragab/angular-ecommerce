import { Injectable } from '@angular/core';
import { GenericService } from './generic.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductReviewsService {

  constructor(private _GenericService:GenericService) {

   }


   makeReview(data:object):Observable<any>
   {

    return this._GenericService.create('store-review',data);

   }


   deleteReview(id:number):Observable<any>
   {

    return this._GenericService.delete('delete-review',id);

   }


   showReview(id:number):Observable<any>
   {

    return this._GenericService.getByID('show-review',id);

   }


   updateReview(id:number,data:Object):Observable<any>
   {
    return this._GenericService.edit('edit-review',data,id);

   }


}
