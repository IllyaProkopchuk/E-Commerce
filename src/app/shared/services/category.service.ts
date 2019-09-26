import { Injectable } from '@angular/core';
import { ICategory } from '../interfaces/category.inteface';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  formatData: any;

  constructor(private fireStore: AngularFirestore){}

  public getCategory(){
    return this.fireStore.collection('category').snapshotChanges();
  }
}
