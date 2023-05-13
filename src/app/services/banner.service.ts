import { Observable } from 'rxjs';
import { GenericService } from './generic.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BannerService {

  constructor(private _GenericService:GenericService) { }



  allBanners():Observable<any>
  {
    return this._GenericService.getAll('banners');
  }








}





