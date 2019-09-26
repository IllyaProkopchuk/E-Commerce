import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class BrandService {
  formData: any;

  constructor(private fireStore: AngularFirestore) { }

  public getBrand(){
    return this.fireStore.collection('brand').snapshotChanges();
  }
}
