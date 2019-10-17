import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class EmailsService {

  constructor(private fireStore: AngularFirestore) { }

  public getEmails(){
    return this.fireStore.collection('emails').snapshotChanges();
  }
}
