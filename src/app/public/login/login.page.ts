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
  jwt$: Object;

  constructor(private authService: AuthenticationService) { }

  ngOnInit() {
    this.showForm = false;
  }

  toggleForm(){
    this.showForm = true;
  }
  
  login(){
    this.authService.login(this.username, this.password, true);
  }
  
}
