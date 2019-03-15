import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../../services/authentication.service';
import { ClassService } from '../../../services/class.service';
import { isNullOrUndefined } from 'util';
import { Router } from '@angular/router';

@Component({
  selector: 'app-class',
  templateUrl: './class.page.html',
  styleUrls: ['./class.page.scss'],
})
export class ClassPage implements OnInit {

  role: string;
  classID$: number;
  class$: object;
  students$: object;
  hasClass: boolean;

  constructor(
    private authService: AuthenticationService,
    private classService: ClassService,
    private router: Router
  ) { }

  ngOnInit() {
    
  }

  logout(){
    this.authService.logout();
  }
}
