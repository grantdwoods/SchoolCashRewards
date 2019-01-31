import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../services/authentication.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-user-tabs',
  templateUrl: './user-tabs.page.html',
  styleUrls: ['./user-tabs.page.scss'],
})
export class UserTabsPage implements OnInit {

  title: string = 'Class';
  constructor(private authService: AuthenticationService, private route: ActivatedRoute) { }

  ngOnInit() {
    
  }

  logout(){
    this.authService.logout();
  }

  changeHeader(name: string)
  {
    this.title = name;
  }

}
