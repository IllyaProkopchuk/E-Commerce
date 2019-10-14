import { Component, OnInit } from '@angular/core';
import { IFeedback } from 'src/app/shared/interfaces/feedback.interface';
import { AngularFirestore } from '@angular/fire/firestore';
import { FeedbackService } from 'src/app/shared/services/feedback.service';

@Component({
  selector: 'app-admin-feedback',
  templateUrl: './admin-feedback.component.html',
  styleUrls: ['./admin-feedback.component.scss']
})
export class AdminFeedbackComponent implements OnInit {
  adminFeedback: Array<IFeedback>;
  constructor(private fireStore: AngularFirestore,
    private feedbackService: FeedbackService) { 
      this.getFeedData();
    }

  ngOnInit() {
  }

  private getFeedData() {
    this.feedbackService.getFeedbacks().subscribe(
      myArray => {
        this.adminFeedback = myArray.map(item => {
          return {
            id: item.payload.doc.id,
            ...item.payload.doc.data()
          } as IFeedback;
        });
      }
    );
  }

}
