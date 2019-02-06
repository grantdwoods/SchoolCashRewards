import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { StudentPage } from './student.page';
import { AllClassesComponent } from './all-classes/all-classes.component';
import { SingleClassComponent } from './single-class/single-class.component';
import { StudentInfoComponent } from './student-info/student-info.component';
import { SharedComponentsModule } from '../../../shared-components/shared-components.module';

const routes: Routes = [
  { path: '', redirectTo: 'all-classes', pathMatch: 'full'},
  {
    path: '',
    component: StudentPage,
    children: [
      {
        path: 'all-classes',
        component: AllClassesComponent
      },
      {
        path: 'single-class/:id/:className',
        component: SingleClassComponent
      },
      {
        path: 'student-info/:id',
        component: StudentInfoComponent
      },
    ]
  },
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    SharedComponentsModule
  ],
  declarations: [StudentPage, AllClassesComponent, SingleClassComponent, StudentInfoComponent]
})
export class StudentPageModule {}
