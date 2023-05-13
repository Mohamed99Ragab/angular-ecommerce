import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {

  transform(products: any, term: string): any[] {
    if(term == undefined){

      return products;
    }

    

    return products.filter(function(product:any) {

      
      return  product.name.toLowerCase().includes(term.toLowerCase());

      
      
    } )

  }

}
