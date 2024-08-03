import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export default class LoginFormComponent implements OnInit {
  constructor() { }

  ngOnInit(): void {
    this.internalInit();
  };

  protected internalInit(){
    console.log("Login form initialized");
  };
}
