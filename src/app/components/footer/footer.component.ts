import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {
  userEmail: string;
  constructor(private fireStore: AngularFirestore,
  ) { }

  ngOnInit() {
  }

  public joinUs() {
    if (this.userEmail) {
      this.fireStore.collection('emails').add({ email: this.userEmail });
      this.userEmail = '';
    }
  }
}
