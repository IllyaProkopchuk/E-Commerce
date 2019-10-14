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
  searchSize: Array<string> = [];

  category: Array<ICategory>;
  brand: Array<IBrand>;
  products: Array<IProducts>;

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

  public openNav() {
    document.getElementById("mySidebar").style.width = "250px";
    document.getElementById("main").style.marginLeft = "250px";
  }

  /* Set the width of the sidebar to 0 and the left margin of the page content to 0 */
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
