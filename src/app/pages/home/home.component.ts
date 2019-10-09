import { Component, OnInit } from '@angular/core';
import { ProductsService } from 'src/app/shared/services/products.service';
import { IProducts } from 'src/app/shared/interfaces/products.interface';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  products: Array<any>;
  last: Array<any>;
  // value: number = -3;

  constructor(private productsServices: ProductsService,
    private fireStore: AngularFirestore) {
      this.getProdData();
    console.log('arr', this.products);
    // this.getLastProducts();
  }

  ngOnInit() {}

  public getProdData() {
    this.productsServices.getProducts().subscribe(
      myArray => {
        console.log('myArr', myArray);
        this.products = myArray.map(item => {
          return {
            id: item.payload.doc.id,
            ...item.payload.doc.data()
          } as any;
        });
      }
    );
  }


  // public getLastProducts() {
  //   if (!this.last) return [];
  //   else {
  //     this.last = this.products.slice(this.value);
  //     console.log(this.last);
  //   }
  // }

}
