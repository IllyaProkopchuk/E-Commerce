import { Component, OnInit } from '@angular/core';
import { UsersService } from 'src/app/shared/services/users.service';

@Component({
  selector: 'app-order-history',
  templateUrl: './order-history.component.html',
  styleUrls: ['./order-history.component.scss']
})
export class OrderHistoryComponent implements OnInit {
  user: any;
  currentOrder: any; 
  id: string;
  checker:boolean = false;
  constructor(public authService: UsersService) {
    this.getMoreDetails();
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
        this.checkOrders(); 
      }
    );
  }

  public checkOrders() {
    if(this.user.orderHistory){
      this.checker = true;
      this.currentOrder = this.user.orderHistory;
      console.log('curr', this.currentOrder);
    }
    else{
      this.checker = false;
    }
  }
}
