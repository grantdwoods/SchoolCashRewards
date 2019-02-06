import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../../services/authentication.service';

@Component({
  selector: 'app-class',
  templateUrl: './class.page.html',
  styleUrls: ['./class.page.scss'],
})
export class ClassPage implements OnInit {

  role: string;
  constructor(private authService: AuthenticationService) { }

  ngOnInit() {
    this.role = this.authService.getRole();
  }

  logout(){
    this.authService.logout();
  }
}
