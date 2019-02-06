import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ClassService } from '../../../../services/class.service';

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
        this.classService.getStudentsInClass(this.id).subscribe(
          students =>
          {
            this.students = students;
          }, 
          error => 
          {
            console.log(error["error"]["err-message"]);
          });
    }

    goToStudent(userID: string)
    {
        this.router.navigateByUrl('user-tabs/student/student-info/' + userID);
    }
}
