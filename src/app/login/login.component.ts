import { Component, OnInit } from '@angular/core';
import { UsersService } from '../shared/services/users.service';
import { IUsers } from '../shared/interfaces/users.interface';
import { NgForm } from '@angular/forms';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  checkerLogin: boolean = false;
  checkerCreate: boolean = true;
  checkerAccount: boolean = true;
  users: Array<IUsers>;
  firstPhoto: string = "https://firebasestorage.googleapis.com/v0/b/finalproject-1c299.appspot.com/o/2.jpg?alt=media&token=778abfc4-6134-418d-b52c-dc2495e6ee68";
  secondPhoto: string = "https://firebasestorage.googleapis.com/v0/b/finalproject-1c299.appspot.com/o/login-banner.jpg?alt=media&token=ab184377-49d4-4328-8f26-be29dfacb6f7";
  signInArr: Array<IUsers> = [];

  photo: string = this.secondPhoto;

  constructor(public authService: UsersService,
    private fireStore: AngularFirestore, ) {
  }

  ngOnInit() {
  }
}
