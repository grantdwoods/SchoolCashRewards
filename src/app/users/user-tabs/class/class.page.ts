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
  classID$: object;
  class$: object;
  students$: object;
  hasClass: boolean;
  constructor(private authService: AuthenticationService,
     private classService: ClassService,
     private router: Router
  ) { }

  ngOnInit() {
    this.role = this.authService.getRole();
    this.classService.getClassForTeacher().subscribe(
      classID => { 
        this.classID$ = classID; 
      },
      error => {this.authService.presentToast('This teacher does not have a class')}
    );

    if(isNullOrUndefined(this.classID$))
      this.hasClass = false;
    else
      this.hasClass = true;
    //this.classService.getClassByID(this.classID$['intClassID']).subscribe(_class => (this.class$ = _class));
    
  }

  logout(){
    this.authService.logout();
  }

  addClass()
  {
    this.router.navigateByUrl('add-class');
  }
}
