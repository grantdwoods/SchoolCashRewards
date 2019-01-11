import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../services/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  private showForm: boolean;
  private username: string;
  private password: string;

  constructor(private authService: AuthenticationService) { }

  ngOnInit() {
    this.showForm = false;
  }

  toggleForm(){
    this.showForm = true;
  }
  //display feilds for login? 
  login(){
    console.log(this.username + ' ' + this.password);
    console.log('Attempting log in....');
    
    //this.authService.login();
  }

}
