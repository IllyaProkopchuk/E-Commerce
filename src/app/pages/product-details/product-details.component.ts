import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { IProducts } from 'src/app/shared/interfaces/products.interface';
import { ProductsService } from 'src/app/shared/services/products.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { UsersService } from 'src/app/shared/services/users.service';
import { IUsers } from 'src/app/shared/interfaces/users.interface';


@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit {

  productId: string;
  view: any;

  id: string;
  user: any;
  selectSizeShow: boolean = true;
  xlCheck: boolean = false;
  lCheck: boolean = false;
  mCheck: boolean = false;
  sCheck: boolean = false;
  xsCheck: boolean = false;
  saveSize: string;

  constructor(
    private productsSerice: ProductsService,
    private route: ActivatedRoute,
    private location: Location,
    private fireStore: AngularFirestore,
    public authService: UsersService,
    public router: Router,
  ) {
    this.getMoreDetails();
    this.getUser();
  }

  ngOnInit() {
  }

  public sizeSelect(size): void {
    this.xsCheck = false;
    this.sCheck = false;
    this.mCheck = false;
    this.lCheck = false;
    this.xlCheck = false;
    if (size === 'xs') {
      console.log(size);
      this.xsCheck = true;
    }
    if (size === 's') {
      console.log(size);
      this.sCheck = true;
    }
    if (size === 'm') {
      console.log(size);
      this.mCheck = true;
    }
    if (size === 'l') {
      console.log(size);
      this.lCheck = true;
    }
    if (size === 'xl') {
      console.log(size);
      this.xlCheck = true;
    }
    this.saveSize = size;
    console.log('saveSize', size);
  }

  public orderNow() {
    if (this.xlCheck == false || this.lCheck == false || this.mCheck == false || this.sCheck == false || this.xsCheck == false) {
      this.selectSizeShow = false;
    }
    if (this.xlCheck == true || this.lCheck == true || this.mCheck == true || this.sCheck == true || this.xsCheck == true) {
      this.addToBag();
      this.selectSizeShow = true;
      this.router.navigate(['basket']);
    }

  }

  public addToBag() {
    if (this.xlCheck == false || this.lCheck == false || this.mCheck == false || this.sCheck == false || this.xsCheck == false) {
      this.selectSizeShow = false;
    }
    if (this.xlCheck == true || this.lCheck == true || this.mCheck == true || this.sCheck == true || this.xsCheck == true) {
      this.selectSizeShow = true;
      let bagArray: any = [];
      const userLocal = JSON.parse(localStorage.getItem('user'));
      if (userLocal === null) {
        let guestObj = Object.assign({}, { size: this.saveSize }, { productId: this.productId });
        console.log('guestArr', guestObj);
        this.saveDataToLocalStorage(guestObj);
      } else {
        if (this.user.bag) {
          this.user.bag.map(arr => bagArray.push(arr));
        }
        let obj = Object.assign({}, { size: this.saveSize }, { productId: this.productId });
        bagArray.push(obj);
        this.push(bagArray);
        console.log(bagArray);
      }
      this.xsCheck = false;
      this.sCheck = false;
      this.mCheck = false;
      this.lCheck = false;
      this.xlCheck = false;
    }
  }

  private push(arr) {
    this.fireStore.collection('users').doc(this.id).update({
      bag: arr
    }).then(function () {
      console.log("Document successfully updated!");
    })
  }
  public getUser() {
    const userLocal = JSON.parse(localStorage.getItem('user'));
    if (userLocal !== null) {
      this.id = userLocal.uid;
      this.authService.getOneUser(this.id).subscribe(
        data => {
          this.user = data.payload.data();
        }
      );
    }
  }

  public getMoreDetails() {
    this.productId = this.route.snapshot.paramMap.get('id');
    this.productsSerice.getOneProduct(this.productId).subscribe(
      data => {
        this.view = data.payload.data();
      }
    );
  }

  public goBack(): void {
    this.location.back();
  }

  public saveDataToLocalStorage(data) {
    let a = [];
    let b = [];
    let с = [];
    b = JSON.parse(localStorage.getItem('session'));
    console.log('b', b);
    if (b != null) {
      с = a.concat(b);
      console.log('a1', a);
    }
    с.push(data);
    console.log('a2', с);
    localStorage.setItem('session', JSON.stringify(с));
  }
}

