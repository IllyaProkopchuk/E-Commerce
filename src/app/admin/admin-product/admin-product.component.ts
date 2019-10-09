import { Component, OnInit } from '@angular/core';
import { ICategory } from 'src/app/shared/interfaces/category.inteface';
import { IBrand } from 'src/app/shared/interfaces/brand.interface';
import { CategoryService } from 'src/app/shared/services/category.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { BrandService } from 'src/app/shared/services/brand.service';
import { Observable } from 'rxjs';
import { AngularFireStorageReference, AngularFireUploadTask, AngularFireStorage } from '@angular/fire/storage';
import { map, finalize } from 'rxjs/operators';
import { IProducts } from 'src/app/shared/interfaces/products.interface';
import { ProductsService } from 'src/app/shared/services/products.service';
import { NgForm } from '@angular/forms';


@Component({
  selector: 'app-admin-product',
  templateUrl: './admin-product.component.html',
  styleUrls: ['./admin-product.component.scss']
})
export class AdminProductComponent implements OnInit {

  products: Array<IProducts>;
  category: Array<ICategory>;
  brand: Array<IBrand>;
  productImage: string;

  productsForm: any = {
    category: '',
    brand: '',
    name: '',
    description: '',
    price: '',
    xs: false,
    s: false,
    m: false,
    l: false,
    xl: false,
    photo: '',
  }


  ref: AngularFireStorageReference;
  task: AngularFireUploadTask;
  uploadState: Observable<string>;
  uploadProgress: Observable<number>;
  downloadURL: Observable<string>;
  urlImage: string;


  constructor(private categoryService: CategoryService,
    private fireStore: AngularFirestore,
    private prStorage: AngularFireStorage,
    private productsService: ProductsService,
    private brandService: BrandService) {

    this.getCatData();
    this.getBrandData();
    this.getProdData();
  }

  ngOnInit() {

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

  private resetForm(form?: NgForm): void {
    if (form != null) {
      form.reset();
    }
    else {
      this.productsForm = {
        category: '',
        brand: '',
        name: '',
        description: '',
        price: '',
        xs: false,
        s: false,
        m: false,
        l: false,
        xl: false,
        photo: ''
      };
    }
  }

  public onSubmit(form: NgForm): void {
    const data = Object.assign({}, form.value);
    console.log(form.value);
    delete data.id;
    if (form.value.id == null) {
      this.fireStore.collection('products').add(data);
    }
    else {
      this.fireStore.doc('products/' + form.value.id).update(data);
    }
    this.resetForm(form);
  }


  public deleteProducts(id: string): void {
    if (confirm('Are you shure?')) {
      this.fireStore.doc('products/' + id).delete();
    }
  }

  public editProducts(cat: IBrand): void {
    this.productsForm = cat;
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

  public upload(event): void {
    const id = Math.random().toString(36).substring(2)
    this.ref = this.prStorage.ref(`images/${id}`)
    this.task = this.ref.put(event.target.files[0])
    this.uploadState = this.task.snapshotChanges().pipe(map(s => s.state));
    this.uploadProgress = this.task.percentageChanges();
    this.task.snapshotChanges().pipe(
      finalize(() => {
        this.downloadURL = this.ref.getDownloadURL()
        this.downloadURL.subscribe(url => this.productImage = url)
      })
    ).subscribe();
  }

}
