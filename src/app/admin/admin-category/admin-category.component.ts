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
  }

  ngOnInit() {
    this.getCatData();
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

  // private getCatData(): void {
  //   this.categoryService.getCategory().subscribe(
  //     data => {
  //       this.adminCategory = data;
  //     },
  //     err => {
  //       console.log(err);

  //     }
  //   )
  // }

  // public addCategory(): void {
  //   const newCat = new Category(1, this.catName);
  //   if (this.adminCategory.length > 0) {
  //     newCat.id = this.adminCategory.slice(-1)[0].id + 1;
  //   }
  //   this.categoryService.addCategory(newCat).subscribe(
  //     () => {
  //       this.getCatData();
  //     }
  //   );
  //   this.catName = '';
  // }

  // public deleteCategory(obj: ICategory): void {
  //   this.categoryService.deleteCategory(obj.id).subscribe(
  //     () => {
  //       this.getCatData();
  //     }
  //   );
  // }

  // public editCategory(obj: ICategory): void {
  //   this.catName = obj.name;
  //   this.editId = obj.id;
  //   this.editStatus = true;
  // }

  // public saveEditCategory(): void {
  //   const editCat = new Category(this.editId, this.catName);
  //   this.categoryService.editCategory(editCat).subscribe(
  //     () => {
  //       this.getCatData();
  //     }
  //   )
  //   this.editStatus = false;
  //   this.catName = '';
  // }

}
