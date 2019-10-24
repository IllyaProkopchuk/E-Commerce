import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private fireStore: AngularFirestore) {
  }

  public getProducts() {
    return this.fireStore.collection('order').snapshotChanges();
  }
}
