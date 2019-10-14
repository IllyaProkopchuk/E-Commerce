import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class FeedbackService {

  constructor(private fireStore: AngularFirestore) { }

  public getFeedbacks() {
    return this.fireStore.collection('feedback').snapshotChanges();
  }
}
