import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { UsersService } from '../shared/services/users.service';
import { ProductsService } from '../shared/services/products.service';

@Component({
  selector: 'app-basket',
  templateUrl: './basket.component.html',
  styleUrls: ['./basket.component.scss']
})
export class BasketComponent implements OnInit {
  userId: string;
  userArray: any;
  keysArray: any;
  obj: any;
  arr: any;

  fullPrice: number = 0;
  fixPrice: number = 0;

  productsArray: Array<any> = [];

  constructor(private fireStore: AngularFirestore,
    public authService: UsersService,
    public productsSerice: ProductsService) {
    this.getUser();
  }

  ngOnInit() { }


  public getUser() {
    const userLocal = JSON.parse(localStorage.getItem('user'));
    this.userId = userLocal.uid;
    this.authService.getOneUser(this.userId).subscribe(
      data => {
        this.userArray = data.payload.data();

        this.getArrayWithKeys();
      }
    );
  }

  public getArrayWithKeys() {
    this.keysArray = this.userArray.bag;
    console.log("ss", this.keysArray);
    this.keysArray.map(array => {
      console.log('array', array);
      this.productsSerice.getOneProduct(array.productId).subscribe(
        data => {
          this.arr = data.payload.data();
          this.arr.currentSize = array.size;
          console.log('arr', this.arr);

          this.productsArray.push(this.arr);
          console.log('ff', this.productsArray);
          this.fullPrice += this.arr.price;
        }
      );
    })
    // this.fixPrice = +this.fullPrice.toFixed(2);
  }
}
