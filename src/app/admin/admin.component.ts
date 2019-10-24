import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  public openNav() {
    document.getElementById("mySidebar").style.width = "250px";
    document.getElementById("body").style.marginLeft = "250px";
  }
  
  /* Set the width of the sidebar to 0 and the left margin of the page content to 0 */
  public closeNav() {
    document.getElementById("mySidebar").style.width = "0";
    document.getElementById("body").style.marginLeft = "0";
  }
}
