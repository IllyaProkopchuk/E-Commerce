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
  hideDisplayNameCheck: boolean = true;

  constructor(private fireStore: AngularFirestore,
    public authService: UsersService) { }

  ngOnInit() {
  }

  public editUserName() {
    this.hideDisplayNameCheck = false;
  }
  public saveDisplayName() {
    const id = this.authService.userData.uid;
    if (this.fName) {
      this.fireStore.collection('users').doc('p8NfAUYDtJXRAeR2Cbsh').update({
        displayName: this.fName
      })
        .then(function () {
          console.log("Document successfully updated!");
        })
    }
    this.hideDisplayNameCheck = true;
  }

}
