import { Observable } from 'rxjs';
import { GenericService } from './generic.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ContactUsService {

  constructor(private _GenericService:GenericService) { }



  contactUs(data:object):Observable<any>
  {

    return this._GenericService.create('contactUs',data);

  }




}
