import { Component, OnInit, Input } from '@angular/core';
import { AuthenticationService } from '../../services/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-main-header',
  templateUrl: './main-header.component.html',
  styleUrls: ['./main-header.component.scss']
})
export class MainHeaderComponent implements OnInit {

  @Input()title :string;

  constructor(private authService: AuthenticationService, private router: Router) { }

  ngOnInit() {
    
  }

  logout(){
    this.authService.logout();
  }
  navigateToSettings(){
    this.router.navigate(["user-tabs","settings"]);
  }
}
