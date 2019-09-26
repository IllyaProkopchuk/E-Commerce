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
  minValue: number = 50;
  maxValue: number = 300;
  options: Options = {
    floor: 0,
    ceil: 400
  };
  category: Array<ICategory>;
  brand: Array<IBrand>;
  products: Array<IProducts>;

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
