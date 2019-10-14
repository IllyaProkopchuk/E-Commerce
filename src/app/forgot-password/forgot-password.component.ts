import { Component, OnInit } from '@angular/core';
import { UsersService } from '../shared/services/users.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {
  firstPhoto: string = "https://firebasestorage.googleapis.com/v0/b/finalproject-1c299.appspot.com/o/2.jpg?alt=media&token=778abfc4-6134-418d-b52c-dc2495e6ee68";
  photo: string = this.firstPhoto;
  
  constructor(public authService: UsersService) { }

  ngOnInit() {
  }

}
