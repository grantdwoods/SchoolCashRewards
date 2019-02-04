import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ClassService } from '../../../../services/class.service';
import { isNullOrUndefined, isNull } from 'util';

@Component({
  selector: 'app-single-class',
  templateUrl: './single-class.component.html',
  styleUrls: ['./single-class.component.scss']
})
export class SingleClassComponent implements OnInit
{
  constructor(private activatedRoute: ActivatedRoute, private classService: ClassService, private router: Router) { }

    @Input() id: number;
    @Input() className: string;
    students: Object = null;

    ngOnInit()
    {
        //get the class name
        if (this.className == null)
            this.className = "some class";

        console.log("Class ID: " + this.id);
        console.log("Class Name: " + this.className);
        //this.id = parseInt(this.activatedRoute.snapshot.paramMap.get("id"));
        this.classService.getStudentsInClass(this.id).subscribe(students => (this.students = students));
        if(isNullOrUndefined(this.students))
        {
          this.students = [{
            strStudentID: "Fake name"
          }];
        }
        console.log(this.students);
      
    }//end ngOnInit

    goToStudent(userID: string)
    {
        this.router.navigateByUrl('user-tabs/student/student-info/' + userID);
    }//end goToStudent

}//end class
