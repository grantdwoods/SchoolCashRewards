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
  constructor(private authService: AuthenticationService,
     private classService: ClassService,
     private router: Router
  ) { }

  async ngOnInit() {
    this.role = this.authService.getRole();
    
    try
    {
      var data = await this.classService.getClassForTeacher().toPromise()
      this.classID$ = data[0]['intClassID'];
    }
    catch(error)
    {
      if(error['status'] == 404)
        console.log('Teacher has no class');
      else
        console.log('Unknown error');
    }

    if(isNullOrUndefined(this.classID$))
    {
      this.hasClass = false;
    }
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
