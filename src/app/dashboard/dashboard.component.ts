import { Component, OnInit } from '@angular/core';
import { UsersService } from '../shared/services/users.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  constructor(public authService: UsersService) { }

  ngOnInit() {
  }


  public openNav() {
    document.getElementById("mySidebar").style.width = "250px";
    document.getElementById("v-pills-tabContent").style.marginLeft = "250px";
  }

  public closeNav() {
    document.getElementById("mySidebar").style.width = "0";
    document.getElementById("v-pills-tabContent").style.marginLeft = "0";
  }
}
