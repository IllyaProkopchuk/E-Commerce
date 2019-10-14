import { Component, OnInit } from '@angular/core';
import { CategoryService } from 'src/app/shared/services/category.service';
import { ICategory } from 'src/app/shared/interfaces/category.inteface';
import { Category } from 'src/app/shared/classes/category.model';
import { NgForm } from '@angular/forms';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-admin-category',
  templateUrl: './admin-category.component.html',
  styleUrls: ['./admin-category.component.scss']
})
export class AdminCategoryComponent implements OnInit {
  adminCategory: Array<any>;
  name: string;
  editStatus: boolean;


  categoryForm: any = {
    name: ''
  }


  constructor(private categoryService: CategoryService,
    private fireStore: AngularFirestore) {
      this.getCatData();

  }

  ngOnInit() {
  }

  private getCatData() {
    this.categoryService.getCategory().subscribe(
      myArray => {
        this.adminCategory = myArray.map(item => {
          return {
            id: item.payload.doc.id,
            ...item.payload.doc.data()
          } as ICategory;
        });
      }
    );
  }

  private resetForm(form?: NgForm): void {
    if (form != null) {
      form.reset();
    }
    else {
      this.categoryForm = {
        name: ''
      };
    }
  }

  public onSubmit(form: NgForm): void {
    const data = Object.assign({}, form.value);
    delete data.id;
    if(form.value.id == null){
      this.fireStore.collection('category').add(data);
    }
    else{
      this.fireStore.doc('category/' + form.value.id).update(data);
    }
    this.resetForm(form);
  }

  public addCategory(): void {
    console.log(this.categoryForm);
    this.resetForm();
  }

  public deleteCategory(id: string): void {
    if (confirm('Are you shure?')) {
      this.fireStore.doc('category/' + id).delete();
    }
  }

  public editCategory(cat: ICategory): void {
    this.categoryForm = cat;
  }

}
