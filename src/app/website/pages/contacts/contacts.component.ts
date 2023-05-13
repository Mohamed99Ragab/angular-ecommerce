import { ToastrService } from 'ngx-toastr';
import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ContactUsService } from 'src/app/services/contact-us.service';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.scss']
})
export class ContactsComponent {

constructor(
  private _ContactUsService:ContactUsService,
  private toaster:ToastrService,
  
  ){}



contactForm = new FormGroup({
  'name':new FormControl('',[Validators.required]),
  'email':new FormControl('',[Validators.required,Validators.email]),
  'phone':new FormControl(''),
  'subject':new FormControl(''),
  'message':new FormControl('',[Validators.required]),
});


ContactUs(){


  this._ContactUsService.contactUs(this.contactForm.value).subscribe(res=>{

    if(res.status == true){

      this.toaster.success(res.message)
    }else{
      this.toaster.info(res.message)
    }

  });

}





}
