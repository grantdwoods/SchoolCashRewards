import { Component, OnInit, Input } from '@angular/core';
import { AuthenticationService } from '../../services/authentication.service';

@Component({
  selector: 'app-main-header',
  templateUrl: './main-header.component.html',
  styleUrls: ['./main-header.component.scss']
})
export class MainHeaderComponent implements OnInit {

  @Input()title :string;

  constructor(private authService: AuthenticationService) { }

  ngOnInit() {
    
  }

  logout(){
    this.authService.logout();
  }
}
