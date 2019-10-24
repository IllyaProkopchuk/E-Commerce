import { Component, OnInit } from '@angular/core';
import { Options, LabelType } from 'ng5-slider';
import { ICategory } from 'src/app/shared/interfaces/category.inteface';
import { CategoryService } from 'src/app/shared/services/category.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { BrandService } from 'src/app/shared/services/brand.service';
import { IBrand } from 'src/app/shared/interfaces/brand.interface';
import { IProducts } from 'src/app/shared/interfaces/products.interface';
import { ProductsService } from 'src/app/shared/services/products.service';
import { UsersService } from 'src/app/shared/services/users.service';



@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {
  minValue: number = 5;
  maxValue: number = 100;
  options: Options = {
    floor: 0,
    ceil: 120
  };

  searchTerm: Array<string> = [];
  searchBrand: Array<string> = [];
  searchSize: Array<string> = [];
  user: any = [];

  category: Array<ICategory>;
  brand: Array<IBrand>;
  products: Array<IProducts>;

  loadIndex: number = 8;
  hideShowMore: boolean = true;

  productId: string;
  id: string;

  selectSizeShow: boolean = true;

  xsCheck: boolean = false;
  sCheck: boolean = false;
  mCheck: boolean = false;
  lCheck: boolean = false;
  xlCheck: boolean = false;

  saveSize: string;

  constructor(private categoryService: CategoryService,
    private brandService: BrandService,
    private productsService: ProductsService,
    public authService: UsersService,
    private fireStore: AngularFirestore) {
    this.getCatData();
    this.getBrandData();
    this.getProdData();
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

  public addToBag(id) {
    if (this.xlCheck == false || this.lCheck == false || this.mCheck == false || this.sCheck == false || this.xsCheck == false) {
      this.selectSizeShow = false;
    }
    if (this.xlCheck == true || this.lCheck == true || this.mCheck == true || this.sCheck == true || this.xsCheck == true) {
      this.selectSizeShow = true;
      this.productId = id;
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

  public saveDataToLocalStorage(data) {
    let a = [];
    let b = [];
    let с = [];
    b = JSON.parse(localStorage.getItem('session'));
    console.log('b',b);
    if(b != null){
      с = a.concat(b);
      console.log('a1',a);
    }
    с.push(data);
    console.log('a2', с);
    localStorage.setItem('session', JSON.stringify(с));
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


  //--------------------NAV
  public openNav() {
    document.getElementById("mySidebar").style.width = "250px";
    document.getElementById("main").style.marginLeft = "250px";
  }

  public closeNav() {
    document.getElementById("mySidebar").style.width = "0";
    document.getElementById("main").style.marginLeft = "0";
  }

  public showMore(): void {
    if (this.loadIndex < this.products.length) {
      this.loadIndex += 3;
    }
    if (this.loadIndex + 1 >= this.products.length) {
      this.hideShowMore = false;
    }
  }


  //-------------Pipes---------------------

  public sizeFind(type: string): void {
    if (this.searchSize.indexOf(type) === -1) {
      this.searchSize.push(type);
    } else {
      this.searchSize.splice(this.searchSize.indexOf(type), 1);
    }
  }

  public typeClothes(type: string): void {
    if (this.searchTerm.indexOf(type) === -1) {
      this.searchTerm.push(type);
    } else {
      this.searchTerm.splice(this.searchTerm.indexOf(type), 1);
    }
  }

  public brandFiltration(name) {
    if (this.searchBrand.indexOf(name) === -1) {
      this.searchBrand.push(name);
    } else {
      this.searchBrand.splice(this.searchBrand.indexOf(name), 1);
    }
  }


  //----------------getting data------------
  private getCatData() {
    this.categoryService.getCategory().subscribe(
      myArray => {
        this.category = myArray.map(item => {
          return {
            id: item.payload.doc.id,
            ...item.payload.doc.data()
          } as ICategory;
        });
      }
    );
  }

  public getBrandData() {
    this.brandService.getBrand().subscribe(
      myArray => {
        this.brand = myArray.map(item => {
          return {
            id: item.payload.doc.id,
            ...item.payload.doc.data()
          } as IBrand;
        });
      }
    );
  }

  public getProdData() {
    this.productsService.getProducts().subscribe(
      myArray => {
        this.products = myArray.map(item => {
          return {
            id: item.payload.doc.id,
            ...item.payload.doc.data()
          } as IProducts;
        });
      }
    );
  }

}
