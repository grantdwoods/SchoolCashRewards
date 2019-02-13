import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../services/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  private showForm: boolean;
  private username: string = "grant";
  private password: string = "hello";
  jwt$: Object;

  constructor(private authService: AuthenticationService) { }

  ngOnInit() {
    this.showForm = false;
  }

  toggleForm(){
    this.showForm = true;
  }
  
  login(){
    console.log(this.username + ' ' + this.password);
    console.log('Attempting log in....');
    this.authService.login(this.username, this.password, true);
  }

  logOut(){
    this.authService.logout();
  }

}
