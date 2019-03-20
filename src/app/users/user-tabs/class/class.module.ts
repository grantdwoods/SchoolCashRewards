import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { ClassPage } from './class.page';
import { SharedComponentsModule } from '../../../shared-components/shared-components.module';
import { ShowClassComponent } from './show-class/show-class.component';
import { EditClassComponent } from './edit-class/edit-class.component';
import { EntryViewComponent } from './entry-view/entry-view.component';
import { ShowStudentComponent } from './show-student/show-student.component';
import { AdminRemoveTeacherComponent } from './admin-remove-teacher/admin-remove-teacher.component';
import { AdminRemoveStudentComponent } from './admin-remove-student/admin-remove-student.component';

const routes: Routes = [
  {
    path: '', 
    redirectTo: 'entry-view',
    pathMatch: 'full'
  },
  {
    path: '',
    component: ClassPage,
    children: [
      {
        path: 'edit-class',
        component: EditClassComponent
      },
      {
        path: 'show-class',
        component: ShowClassComponent
      },
      {
        path: 'entry-view',
        component: EntryViewComponent
      },
      {
        path: 'admin-remove-teacher',
        component: AdminRemoveTeacherComponent
      },
      {
        path: 'admin-remove-student',
        component: AdminRemoveStudentComponent
      }
    ]
  },
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    SharedComponentsModule,
  ],
  declarations: [ClassPage, ShowClassComponent, EditClassComponent, EntryViewComponent, ShowStudentComponent, AdminRemoveTeacherComponent, AdminRemoveStudentComponent]
})
export class ClassPageModule {}
