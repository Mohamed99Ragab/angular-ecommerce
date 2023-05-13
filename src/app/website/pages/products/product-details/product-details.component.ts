import { ActivatedRoute, Router } from '@angular/router';
import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ProductsService } from 'src/app/services/products.service';
import { ProductReviewsService } from 'src/app/services/product-reviews.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/Auth/auth.service';
import { SharedService } from 'src/app/services/shared.service';
import { CartService } from 'src/app/services/cart.service';

declare var $:any;
@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})

export class ProductDetailsComponent implements OnInit  {


  plus:number = 1;
  stars = [1,2,3,4,5];
  starClicked = 0;
  ReviewId!:number;

  isPostReview:boolean = true;

  product!:any;
  userId:number|null;
   productId:number = Number(this._ActivatedRoute.snapshot.paramMap.get('id'));

  constructor(
    private _ProductsService:ProductsService,
    private _ActivatedRoute:ActivatedRoute ,private toastr: ToastrService,
     private _ProductReviewsService:ProductReviewsService,
     public _AuthService:AuthService,private _Router:Router,
     private sharedService:SharedService,
     private _CartService:CartService,

     
     
     
     ) {

      let user = JSON.parse(this._AuthService.getuserData());

      if(user){
        this.userId = user.id

      }else{
        this.userId = null;
      }

    }
 


 
  ngOnInit(): void {

  
    this.getproductDetails();



  }

  increase(){

    this.plus +=1;
  }

  decrease(){
    if(this.plus > 1){
      this.plus -=1;
     
  }


}


setRating(i:number){

  
    this.starClicked = i;
  
}



getproductDetails(){


  this._ProductsService.productDetails(this.productId).subscribe(res=>{

    if(res.status == true){

      this.product = res.data;
    }


  });
}



reviewForm = new FormGroup({
  'rate':new FormControl(this.starClicked,[Validators.required,Validators.min(1)]),
  'review':new FormControl('',[Validators.required]),
  
});

editReviewForm = new FormGroup({
  'rate':new FormControl(this.starClicked,[Validators.required,Validators.min(1)]),
  'review':new FormControl('',[Validators.required]),
  
});


editReview(id:number){
  
  
  this.isPostReview = false;


    this._ProductReviewsService.showReview(id).subscribe(res=>{

      
      if(res.status == true){

        this.ReviewId = id;
        
        this.editReviewForm.controls['rate'].setValue(res.data.rate);
        this.editReviewForm.controls['review'].setValue(res.data.review);



      }


    });
  

}



updateReview(){
  
  let data = {
    'product_id':this.productId,
    'rate':Number(this.editReviewForm.controls.rate.value),
    'review':this.editReviewForm.controls.review.value,
    
  }
  if(this.editReviewForm.valid){

    console.log(data);


    this._ProductReviewsService.updateReview(this.ReviewId,data).subscribe(res=>{
      
      if(res.status == true){

        $('#editReivew').modal('hide');

        this.toastr.success(res.message);

  
        this.getproductDetails();
        
      }
      else{
        this.toastr.info(res.message);
      }


  });
  
  }


}


postReview(){

  if(this._AuthService.getToken())
  {
    let data = {
      'product_id':this.productId,
      'rate':Number(this.reviewForm.controls.rate.value),
      'review':this.reviewForm.controls.review.value,
      
    }
    
    if(this.reviewForm.valid){
      this._ProductReviewsService.makeReview(data).subscribe(res=>{
        
        if(res.status == true){
  
          $('#makeReivew').modal('hide');
  
          this.toastr.success(res.message);
  
          this.reviewForm.reset();
          this.getproductDetails();
          
        }
        else{
          this.toastr.info(res.message);
          $('#makeReivew').modal('hide');
          this.reviewForm.reset();
  
        }
  
  
    });
    }
  }
  else{

    this._Router.navigate(['auth/login']);
  }


 
}


deleteReview(id:number){

  this._ProductReviewsService.deleteReview(id).subscribe(res=>{

    if(res.status == true){

      this.getproductDetails();
      this.toastr.success(res.message);

    }
    else{
      this.toastr.info(res.message);

    }


  });

}



addToCart(product_id:number){

  let data = {
    'product_id':product_id,
    'quantity':this.plus
  }

  if(this._AuthService.getToken()){

    this._CartService.addToCart(data).subscribe(res=>{

      if(res.status == true){

        this.toastr.success(res.message,undefined,{
          positionClass:'toast-top-center'
        });

        this.sharedService.sendClickEvent();


      }else{

        this.toastr.info(res.message)
      }

  });

  }else{

    this._Router.navigate(['auth/login']);
  }

}




}
