import { Component, OnInit } from '@angular/core';
import { IFeedback } from 'src/app/shared/interfaces/feedback.interface';
import { NgForm } from '@angular/forms';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {

  feedForm: IFeedback = {
    name: '',
    email: '',
    comment: ''
  }

  constructor(private fireStore: AngularFirestore,
    public router: Router,
  ) { }

  ngOnInit() {
  }


  private resetForm(form?: NgForm): void {
    if (form != null) {
      form.reset();
    }
    else {
      this.feedForm = {
        name: '',
        email: '',
        comment: ''
      };
    }
  }

  public onSubmit(form: NgForm): void {
    const data = Object.assign({}, form.value);
    console.log(form.value);
    alert('thank you for feedback')
    delete data.id;
    if (form.value.id == null) {
      this.fireStore.collection('feedback').add(data);
    }
    else {
      this.fireStore.doc('feedback/' + form.value.id).update(data);
    }
    this.resetForm(form);
    this.router.navigate(['home']);
  }
}
