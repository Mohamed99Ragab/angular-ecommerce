import { ProductsService } from 'src/app/services/products.service';
import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/Auth/auth.service';
import { SharedService } from 'src/app/services/shared.service';
import { Router } from '@angular/router';
import { CategoryService } from 'src/app/services/Categories/category.service';

@Component({
  selector: 'app-store',
  templateUrl: './store.component.html',
  styleUrls: ['./store.component.scss']
})
export class StoreComponent implements OnInit {

  products :any[] = [];
  categories :any[] = [];
  allProducts: number = 0;
  pagination: number = 1;
  categoryId?:number;
  term='';

  constructor(
    private sharedService:SharedService,
    private _ProductsService:ProductsService,
    private _CartService:CartService,
    private toastr: ToastrService,
    private _AuthService:AuthService,
    private _Router:Router,
    private _CategoryService:CategoryService


    
    ) {
    
  }
  ngOnInit(): void {

    this.getProducts(0);
    this.getCategories();


}


getProducts(categoryId?:number){

  this._ProductsService.Products(this.pagination,categoryId).subscribe(response=>{

      if(response.status == true){

        this.products = response.data.data;

        this.allProducts = response.data.total;
       

        
      }

  });
}

getProductsByCategoryId(categoryId?:number){

  
  
    this.getProducts(categoryId);

}






getCategories(){
  this._CategoryService.allCategory().subscribe(res=>{

      if(res.status == true){

        this.categories = res.data;

      }


  });
}



renderPage(event: number) {
  this.pagination = event;
  this.getProducts();
}




addToCart(product_id:number){

  let data = {
    'product_id':product_id,
    'quantity':1
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
