import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  formatData: any;


  constructor(private fireStore: AngularFirestore) {
  }

  public getProducts() {
    return this.fireStore.collection('products').snapshotChanges();
  }
  
  public getOneProduct(id: string) {
    return this.fireStore.collection(`products`).doc(id).snapshotChanges();
  }

}

