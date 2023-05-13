import { AuthService } from './../../../services/Auth/auth.service';
import { CartService } from './../../../services/cart.service';
import { Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { CategoryService } from './../../../services/Categories/category.service';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { ProductsService } from 'src/app/services/products.service';
import { Route, Router } from '@angular/router';
import { SharedService } from 'src/app/services/shared.service';

declare var $:any;
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})

export class HomeComponent implements OnInit {



  categories:any[] = [];
  recentProducts:any[] = [];
  featureProducts:any[] = [];

  constructor(
    private sharedService:SharedService,
    private _CategoryService:CategoryService,
    private _ProductsService:ProductsService,
    private _CartService:CartService,
    private toastr: ToastrService,
    private _AuthService:AuthService,
    private _Router:Router
    ){}

  categoryOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: false,
    navSpeed: 200,
    navText: ['<', '>'],
    responsive: {
      0: {
        items: 2
      },
      400: {
        items: 2
      },
      740: {
        items: 5
      },
      940: {
        items: 4
      }
    },
    nav: true
  }


  exclusiveProducts: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: false,
    navSpeed: 200,
    navText: ['<', '>'],
    responsive: {
      0: {
        items: 2
      },
      400: {
        items: 2
      },
      740: {
        items: 5
      },
      940: {
        items: 4
      }
    },
    nav: true
  }




  ngOnInit(): void {

    

    this.getAllCats();

    this.getRecentProducts();
    this.getFeaturedProducts();


  }


  getAllCats(){

    this._CategoryService.allCategory().subscribe(res=>{

      if(res.status == true){

        this.categories = res.data


      }
      else{
        this.toastr.info(res.message);
      }


    });

  }


  getRecentProducts(){

    this._ProductsService.recentProducts().subscribe(res=>{

      if(res.status == true){

        this.recentProducts = res.data;
      }
      else{
        this.toastr.info(res.message);
      }


    });
  }


  getFeaturedProducts(){

    this._ProductsService.featureProducts().subscribe(res=>{

      if(res.status == true){

        this.featureProducts = res.data;
      }
      else{
        this.toastr.info(res.message);
      }


    });
  }



  addToCart(product_id:number){

    let data = {
      'product_id':product_id,
      'quantity':1
    }
    console.log(data);


    if(this._AuthService.getToken()){

      this._CartService.addToCart(data).subscribe(res=>{

        console.log(res);
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
