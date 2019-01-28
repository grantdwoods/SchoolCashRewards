import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { StudentPage } from './student.page';
import { AllClassesComponent } from './all-classes/all-classes.component';
import { SingleClassComponent } from './single-class/single-class.component';
import { StudentInfoComponent } from './student-info/student-info.component';

const routes: Routes = [
  {
    path: '',
    component: StudentPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [StudentPage, AllClassesComponent, SingleClassComponent, StudentInfoComponent]
})
export class StudentPageModule {}
