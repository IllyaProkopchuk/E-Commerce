import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { UsersService } from 'src/app/shared/services/users.service';
import { ProductsService } from 'src/app/shared/services/products.service';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-proceed',
  templateUrl: './proceed.component.html',
  styleUrls: ['./proceed.component.scss']
})
export class ProceedComponent implements OnInit {

  keysArray: any = [];
  arr: any = [];
  userId: string;
  userArray: any = [];
  fullPrice: number = 0;
  fixPrice: number = 0;
  productsArray: Array<any> = [];
  sizeBag: number = 0;
  sizeChecker: boolean = true;
  logined: boolean = false;

  orderForm: any = {
    firstName: '',
    secondName: '',
    phone: 0,
    country: '',
    street: '',
    city: '',
    buildingNumber: '',
    currentOrder: this.productsArray
  }

  constructor(private fireStore: AngularFirestore,
    public authService: UsersService,
    public router: Router,
    public productsSerice: ProductsService, ) {
    this.getUser();
  }

  ngOnInit() {
  }
  public onSubmit(form: NgForm): void {
    const data = Object.assign({}, form.value);
    console.log(form.value);
    delete data.id;
    data.currentOrder = this.productsArray;
    console.log(data);
    if (form.value.id == null) {
      this.fireStore.collection('orders').add(data);
    }
    else {
      this.fireStore.doc('orders/' + form.value.id).update(data);
    }
    localStorage.setItem('session', JSON.stringify([]));
    this.resetForm(form);
    alert('Thank you for your order');
    this.router.navigate(['home']);
  }

  private resetForm(form?: NgForm): void {
    if (form != null) {
      form.reset();
    }
    else {
      this.orderForm = {
        firstName: '',
        secondName: '',
        phone: 0,
        country: '',
        street: '',
        city: '',
        buildingNumber: '',
        currentOrder: this.productsArray
      }
    }
  }
public click(){
  console.log(this.orderForm.currentOrder);
  
}

  public placeOrder() {
    this.fireStore.collection('users').doc(this.userId).update({
      bag: []
    })
    let bagArray: any = [];
    if (this.userArray.orderHistory) {
      this.userArray.orderHistory.map(arr => bagArray.push(arr));
    }
    this.productsArray.map(arr => bagArray.push(arr));
    console.log('bag', bagArray);

    this.fireStore.collection('users').doc(this.userId).update({
      orderHistory: bagArray
    })
    let orderArray = this.userArray;
    orderArray.currentOrder = this.productsArray;
    console.log('orders', orderArray);
    this.fireStore.collection('orders').add(orderArray);
    alert('Thank you for your order');
    this.router.navigate(['home']);
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

  public getArrayWithKeysLocal() {
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

  public getUser() {
    const userLocal = JSON.parse(localStorage.getItem('user'));
    console.log(userLocal);
    if (userLocal === null) {
      this.keysArray = JSON.parse(localStorage.getItem('session'));
      console.log(this.keysArray);
      this.getArrayWithKeysLocal();
      this.logined = false;
    }
    else {
      this.userId = userLocal.uid;
      this.authService.getOneUser(this.userId).subscribe(
        data => {
          this.userArray = data.payload.data();
          this.logined = true;
          this.getArrayWithKeys();
        }
      );
    }
  }

  private checkBag() {
    if (this.keysArray == undefined) {
      this.sizeChecker = true;
    }
    else {
      this.sizeChecker = false;
    }
  }

}
