import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { UsersService } from '../shared/services/users.service';
import { ProductsService } from '../shared/services/products.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-basket',
  templateUrl: './basket.component.html',
  styleUrls: ['./basket.component.scss']
})
export class BasketComponent implements OnInit {
  userId: string;
  userArray: any = [];
  keysArray: any = [];
  obj: any;
  arr: any = [];

  fullPrice: number = 0;
  fixPrice: number = 0;

  productsArray: Array<any> = [];
  sizeBag: number = 0;
  sizeChecker: boolean = true;

  constructor(private fireStore: AngularFirestore,
    public authService: UsersService,
    public productsSerice: ProductsService,
    public router: Router,
    ) {
    this.getUser();
  }

  ngOnInit() { }

  public proceed(){
    this.router.navigate(['proceed']);
  }


  public delete(i: number): void {
    this.keysArray.splice(i, 1);
    console.log(this.keysArray);
    const userLocal = JSON.parse(localStorage.getItem('user'));
    if(userLocal === null){
      localStorage.setItem('session', JSON.stringify(this.keysArray));
      this.getArrayWithKeysLocal();
    }
    else(
      this.fireStore.collection('users').doc(this.userId).update({
        bag: this.keysArray
      })
    )
  }

  private checkBag() {
    if (this.keysArray == undefined) {
      this.sizeChecker = true;
    }
    else {
      this.sizeChecker = false;
    }
  }

  public getUser() {
    const userLocal = JSON.parse(localStorage.getItem('user'));
    console.log(userLocal);
    if (userLocal === null) {
    this.keysArray = JSON.parse(localStorage.getItem('session'));
    console.log(this.keysArray);
    this.getArrayWithKeysLocal();
    }
    else {
      this.userId = userLocal.uid;
      this.authService.getOneUser(this.userId).subscribe(
        data => {
          this.userArray = data.payload.data();

          this.getArrayWithKeys();
        }
      );
    }
  }

  public getArrayWithKeys() {
    this.keysArray = this.userArray.bag;
    console.log('getArray', this.keysArray);
    this.productsArray = [];
    this.fullPrice = 0;
    this.keysArray.map(array => {
      this.productsSerice.getOneProduct(array.productId).subscribe(
        data => {
          this.arr = data.payload.data();
          this.arr.currentSize = array.size;
          this.productsArray.push(this.arr);
          this.fullPrice += this.arr.price;
        }
      );
    })
    this.checkBag();
  }

  public getArrayWithKeysLocal(){
    this.productsArray = [];
    this.fullPrice = 0;
    this.keysArray.map(array => {
      this.productsSerice.getOneProduct(array.productId).subscribe(
        data => {
          this.arr = data.payload.data();
          this.arr.currentSize = array.size;
          this.productsArray.push(this.arr);
          this.fullPrice += this.arr.price;
        }
      );
    })
    this.checkBag();
  }
}
