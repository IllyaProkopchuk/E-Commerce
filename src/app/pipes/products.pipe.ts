import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'products',
  pure: false
})
export class ProductsPipe implements PipeTransform {

  transform(products: Array<any>, searchTerm: Array<string>) {
    const newP = [];
    if (!products) {
      return [];
    }
    if (!searchTerm || searchTerm.length === 0) {
      return products;
    }
    products.filter(product => {
      searchTerm.map(search => {
        if (product.category.toLowerCase() === search.toLowerCase()) {
          newP.push(product);
        }
      });
    });
    products = newP;
    return products;
  }
}
