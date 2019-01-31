import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ClassService } from '../../../../services/class.service';
import { isNullOrUndefined } from 'util';

@Component({
  selector: 'app-single-class',
  templateUrl: './single-class.component.html',
  styleUrls: ['./single-class.component.scss']
})
export class SingleClassComponent implements OnInit {

  constructor(private activatedRoute: ActivatedRoute, private classService: ClassService, private router: Router) { }

  id: number;
  students: Object = null;

  ngOnInit() {
    this.id = parseInt(this.activatedRoute.snapshot.paramMap.get("id"));
    this.classService.getStudentsInClass(this.id).subscribe(students => (this.students = students));
    if(isNullOrUndefined(this.students))
    {
      this.students = [{
        strStudentID: "Fake name"
      }];
    }
  }

  goToStudent(userID: string)
  {
    this.router.navigateByUrl('user-tabs/student/student-info/' + userID);
  }

}
