import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private fireStore: AngularFirestore) { }


  public getUsers(){
    return this.fireStore.collection('users').snapshotChanges();
  }
}
