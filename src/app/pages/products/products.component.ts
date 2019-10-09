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
  minValue: number = 5;
  maxValue: number = 100;
  options: Options = {
    floor: 0,
    ceil: 120
  };

  searchTerm: Array<string> = [];
  searchBrand: Array<string> = [];



  search: string = '';
  brandFilter: string = '';

  category: Array<ICategory>;
  brand: Array<IBrand>;
  products: Array<IProducts>;

  counterForBrand: boolean = true;
  sizes: string = '';

  xs: boolean = true;
  s: boolean = true;
  m: boolean = true;
  l: boolean = true;
  xl: boolean = true;

  loadIndex: number = 8;
  hideShowMore: boolean = true;

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


  public showMore(): void {
    if (this.loadIndex < this.products.length) {
      this.loadIndex += 3;
    }
    if (this.loadIndex + 1 >= this.products.length) {
      this.hideShowMore = false;
    }
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
        console.log('myArr', myArray);
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
