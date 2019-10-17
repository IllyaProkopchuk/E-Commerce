import { Component, OnInit } from '@angular/core';
import { UsersService } from 'src/app/shared/services/users.service';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  fName: string;
  gender: string;
  sName: string;
  phone: string;
  hideDisplayNameCheck: boolean = true;
  hideSecondNameCheck: boolean = true;
  genderCheck: boolean = true;
  phoneCheck: boolean = true;
  uid: string;
  user: any;
  id: string;

  constructor(private fireStore: AngularFirestore,
    public authService: UsersService) {
    this.getMoreDetails()
  }

  ngOnInit() {
  }

  public getMoreDetails() {
    const userLocal = JSON.parse(localStorage.getItem('user'));
    this.id = userLocal.uid;
    console.log(this.id);
    this.authService.getOneUser(this.id).subscribe(
      data => {
        this.user = data.payload.data();
        console.log(this.user);
      }
    );
  }

  public editUserName() {
    this.hideDisplayNameCheck = false;
  }
  public saveDisplayName() {
    const id = this.authService.userData.uid;
    if (this.fName) {
      this.fireStore.collection('users').doc(id).update({
        firstName: this.fName
      })
        .then(function () {
          console.log("Document successfully updated!");
        })
    }
    this.hideDisplayNameCheck = true;
  }


  public editSecondName() {
    this.hideSecondNameCheck = false;
  }
  public saveSecondName() {
    const id = this.authService.userData.uid;
    if (this.sName) {
      this.fireStore.collection('users').doc(id).update({
        secondName: this.sName
      })
        .then(function () {
          console.log("Document successfully updated!");
        })
    }
    this.hideSecondNameCheck = true;
  }

  public editGender() {
    this.genderCheck = false;
  }
  public saveGender() {
    const id = this.authService.userData.uid;
    if (this.gender) {
      this.fireStore.collection('users').doc(id).update({
        gender: this.gender
      })
        .then(function () {
          console.log("Document successfully updated!");
        })
    }
    this.genderCheck = true;
  }


  public editPhone() {
    this.phoneCheck = false;
  }
  public savePhone() {
    const id = this.authService.userData.uid;
    if (this.phone) {
      this.fireStore.collection('users').doc(id).update({
        phone: this.phone
      })
        .then(function () {
          console.log("Document successfully updated!");
        })
    }
    this.phoneCheck = true;
  }

}
