import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  checker: boolean;
  constructor() { }

  ngOnInit() {
  }

  public openCreateAccountPart(): void {
    this.checker = !this.checker;
  }
}
