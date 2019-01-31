import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ClassService } from '../../../../services/class.service';

@Component({
  selector: 'app-all-classes',
  templateUrl: './all-classes.component.html',
  styleUrls: ['./all-classes.component.scss']
})
export class AllClassesComponent implements OnInit {
  classes: object;
  constructor(private router: Router, private classService: ClassService) { }

  ngOnInit() {
    this.classService.getClassesInSchool().subscribe(classes => (this.classes = classes));
  }

  goToClass(id: number)
  {
    this.router.navigateByUrl('student/single-class/' + id);
  }

}
