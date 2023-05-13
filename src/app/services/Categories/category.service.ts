import { Observable } from 'rxjs';
import { GenericService } from './../generic.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private _GenericService:GenericService) { }



  allCategory():Observable<any>
  {
    return this._GenericService.getAll('categories')
  }
}
