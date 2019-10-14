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
  products: Array<IProducts>;
  last: Array<any>;
  value: number = -3;
  load: number = 2;
  checker: boolean = false;

  constructor(private productsServices: ProductsService,
    private fireStore: AngularFirestore) {
    this.getProdData();
  }

  ngOnInit() { }

  public getProdData() {
    this.productsServices.getProducts().subscribe(
      myArray => {
        console.log('myArr', myArray);
        this.products = myArray.map(item => {
          return {
            id: item.payload.doc.id,
            ...item.payload.doc.data()
          } as IProducts;
        }).slice(this.value);
      }
    );
}

  public loadMore() {
    this.value -= 3;
    this.getProdData() 
    if (this.load < -6) {
      this.checker = false;
    }
    else {
      this.checker = true;
    }
  }
}
