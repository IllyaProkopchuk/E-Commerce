import { Component, OnInit } from '@angular/core';
import { UsersService } from '../shared/services/users.service';
import { NgForm } from '@angular/forms';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {
  firstPhoto: string = "https://firebasestorage.googleapis.com/v0/b/finalproject-1c299.appspot.com/o/2.jpg?alt=media&token=778abfc4-6134-418d-b52c-dc2495e6ee68";
  photo: string = this.firstPhoto;
  emailUse: boolean = true;

  // usersForm: any = {
  //   email: '',
  //   password: ''
  // };

  constructor(private fireStore: AngularFirestore,
    public authService: UsersService) { }

  ngOnInit() {
  }

  public onSubmit(form: NgForm): void {
  }
  //   const data = Object.assign({}, form.value);
  //   console.log(form.value);
  //   // delete data.id;
  //   if (form.value.id == null) {
  //     this.fireStore.collection('users').add(data);
  //     this.authService.SignUp(this.usersForm.email, this.usersForm.password);
  //   }
  //   else {
  //     this.fireStore.doc('users/' + form.value.id).update(data);
  //   }
  //   this.resetForm(form);
  // }


  // private resetForm(form?: NgForm): void {
  //   if (form != null) {
  //     form.reset();
  //   }
  //   else {
  //     this.usersForm = {
  //       email: '',
  //       password: '',
  //     }
  //   }
  // }



}
