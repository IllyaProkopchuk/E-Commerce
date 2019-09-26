import { Component, OnInit } from '@angular/core';
import { BrandService } from 'src/app/shared/services/brand.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { IBrand } from 'src/app/shared/interfaces/brand.interface';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-admin-brand',
  templateUrl: './admin-brand.component.html',
  styleUrls: ['./admin-brand.component.scss']
})
export class AdminBrandComponent implements OnInit {
  brandForm: any = {
    name: '',
  };
  adminBrand: Array<any>;
  name: string;
  editStatus: boolean;

  constructor(private brandService: BrandService,
    private fireStore: AngularFirestore) { }

  ngOnInit() {
    this.getBrandData();
  }

  public getBrandData() {
    this.brandService.getBrand().subscribe(
      myArray => {
        this.adminBrand = myArray.map(item => {
          return {
            id: item.payload.doc.id,
            ...item.payload.doc.data()
          } as IBrand;
        });
      }
    );
  }

  private resetForm(form?: NgForm): void {
    if (form != null) {
      form.reset();
    }
    else {
      this.brandForm = {
        name: ''
      };
    }
  }

  public onSubmit(form: NgForm): void {
    const data = Object.assign({}, form.value);
    delete data.id;
    if (form.value.id == null) {
      this.fireStore.collection('brand').add(data);
    }
    else {
      this.fireStore.doc('brand/' + form.value.id).update(data);
    }
    this.resetForm(form);
  }

  public addBrand(): void {
    console.log(this.brandForm);
    this.resetForm();
  }

  public deleteBrand(id: string): void {
    if (confirm('Are you shure?')) {
      this.fireStore.doc('brand/' + id).delete();
    }
  }

  public editBrand(cat: IBrand): void {
    this.brandForm = cat;
  }
}
