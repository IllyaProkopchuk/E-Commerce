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

  obj: any = {
    email: '',
    password: '',
    firstName: '',
    secondName: '',
    age: 0,
    country: '',
    city: '',
    street: '',
    buildingNumber: 0,
    phone: '',
    login: false
  };

  login: string;
  password: string;

  emailUse: boolean = true;
  hide: boolean;

  usersForm: any = {
    email: '',
    password: '',
    firstName: '',
    secondName: '',
    age: '',
    country: '',
    city: '',
    street: '',
    buildingNumber: '',
    phone: '',
    login: false
  }


  constructor(public authService: UsersService,
    private fireStore: AngularFirestore,
    // public authService: AuthService
  ) {
    // this.getUsersData()
  }

  ngOnInit() {
  }

  // public signOut(): void {
  //   this.photo = this.firstPhoto;
  //   this.checkerAccount = true;
  //   this.checkerLogin = false;
  //   this.hide = false;
  // }

  // public signIn(): void {
  //   this.signInArr = this.users.filter(user => user.email === this.login && user.password === this.password);
  //   this.obj = this.signInArr[0];
  //   console.log(this.obj);
  //   this.obj.login = true;
  
  //  if (this.obj) {
  //     this.hide = true;
  //     this.login = '';
  //     this.password = '';
  //     this.checkerAccount = false;
  //     this.checkerLogin = true;
  //     this.photo = this.secondPhoto;
  //     this.emailUse = false
  //   }
  //   else {
  //     this.hide = true;
  //   }
  // }

  // public openCreateAccountPart(): void {
  //   this.checkerCreate = !this.checkerCreate;
  //   this.checkerLogin = !this.checkerLogin;
  // }

  // private resetForm(form?: NgForm): void {
  //   if (form != null) {
  //     form.reset();
  //   }
  //   else {
  //     this.usersForm = {
  //       email: '',
  //       password: '',
  //       firstName: '',
  //       secondName: '',
  //       age: '',
  //       country: '',
  //       city: '',
  //       street: '',
  //       buildingNumber: '',
  //       phone: '',
  //       login: false
  //     }
  //   }
  // }

  // public onSubmit(form: NgForm): void {
  //   const data = Object.assign({}, form.value);
  //   console.log(form.value);
  //   delete data.id;
  //   if (form.value.id == null) {
  //     this.fireStore.collection('users').add(data);
  //   }
  //   else {
  //     this.fireStore.doc('users/' + form.value.id).update(data);
  //   }
  //   this.resetForm(form);
  // }


  // public getUsersData(): void {
  //   this.usersService.getUsers().subscribe(
  //     myArray => {
  //       this.users = myArray.map(item => {
  //         return {
  //           id: item.payload.doc.id,
  //           ...item.payload.doc.data()
  //         } as IUsers
  //       })
  //     }
  //   );
  // }


}
