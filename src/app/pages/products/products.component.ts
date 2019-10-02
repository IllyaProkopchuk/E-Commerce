import { Component, OnInit } from '@angular/core';
import { Options, LabelType } from 'ng5-slider';
import { ICategory } from 'src/app/shared/interfaces/category.inteface';
import { CategoryService } from 'src/app/shared/services/category.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { BrandService } from 'src/app/shared/services/brand.service';
import { IBrand } from 'src/app/shared/interfaces/brand.interface';
import { IProducts } from 'src/app/shared/interfaces/products.interface';
import { ProductsService } from 'src/app/shared/services/products.service';


@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {
  minValue: number = 20;
  maxValue: number = 300;
  options: Options = {
    floor: 0,
    ceil: 400
  };
  search: string = '';
  brandFilter: string = '';
  category: Array<ICategory>;
  brand: Array<IBrand>;
  products: Array<IProducts>;
  counterForCategory: boolean = true;
  counterForBrand: boolean = true;
  sizes: string = '';
  xs: boolean = true;
  s: boolean = true;
  m: boolean = true;
  l: boolean = true;
  xl: boolean = true;

  constructor(private categoryService: CategoryService,
    private brandService: BrandService,
    private productsService: ProductsService,
    private fireStore: AngularFirestore) {
    this.getCatData();
    this.getBrandData();
    this.getProdData();
  }

  ngOnInit() {
  }

  public xsmall() {
    if (this.xs) {
      this.xs = false;
    }
    else {
      this.xs = true;
    }
  }
  public small() {
    if (this.s) {
      this.sizes = 'small';
      this.s = false;
    }
    else {
      this.search = '';
      this.s = true;
    }
  }
  public medium() {
    if (this.m) {
      this.sizes = 'medium';
      this.m = false;
    }
    else {
      this.search = '';
      this.m = true;
    }
  }
  public large() {
    if (this.l) {
      this.sizes = 'large';
      this.l = false;
    }
    else {
      this.search = '';
      this.l = true;
    }
  }
  public xlarge() {
    if (this.xl) {
      this.sizes = 'xlarge';
      this.xl = false;
    }
    else {
      this.search = '';
      this.xl = true;
    }
  }

  public getValue(name) {
    if (this.counterForCategory) {
      this.search = name;
      this.counterForCategory = false;
    }
    else {
      this.search = '';
      this.counterForCategory = true;
    }
  }

  public brandFiltration(name) {
    console.log(name);
    if (this.counterForBrand) {
      this.brandFilter = name;
      this.counterForBrand = false;
    }
    else {
      this.brandFilter = '';
      this.counterForBrand = true;
    }
  }

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
