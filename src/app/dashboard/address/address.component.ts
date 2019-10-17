import { Component, OnInit } from '@angular/core';
import { UsersService } from 'src/app/shared/services/users.service';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-address',
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.scss']
})
export class AddressComponent implements OnInit {

  id: string;
  uid: string;
  user: any;

  country: string;
  city: string;
  street: string;
  number: string;


  countryCheck: boolean = true;
  cityCheck: boolean = true;
  streetCheck: boolean = true;
  numberCheck: boolean = true;

  constructor(private fireStore: AngularFirestore,
    public authService: UsersService) {
    this.getMoreDetails()
  }
  ngOnInit() {
  }

  public editNumber() {
    this.numberCheck = false;
  }
  public saveNumber() {
    const id = this.authService.userData.uid;
    if (this.number) {
      this.fireStore.collection('users').doc(id).update({
        buildingNumber: this.number
      })
        .then(function () {
          console.log("Document successfully updated!");
        })
    }
    this.numberCheck = true;
  }
  public editStreet() {
    this.streetCheck = false;
  }
  public saveStreet() {
    const id = this.authService.userData.uid;
    if (this.street) {
      this.fireStore.collection('users').doc(id).update({
        street: this.street
      })
        .then(function () {
          console.log("Document successfully updated!");
        })
    }
    this.streetCheck = true;
  }
  public editCity() {
    this.cityCheck = false;
  }
  public saveCity() {
    const id = this.authService.userData.uid;
    if (this.city) {
      this.fireStore.collection('users').doc(id).update({
        city: this.city
      })
        .then(function () {
          console.log("Document successfully updated!");
        })
    }
    this.cityCheck = true;
  }

  public editCountry() {
    this.countryCheck = false;
  }
  public saveCountry() {
    const id = this.authService.userData.uid;
    if (this.country) {
      this.fireStore.collection('users').doc(id).update({
        country: this.country
      })
        .then(function () {
          console.log("Document successfully updated!");
        })
    }
    this.countryCheck = true;
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
}
