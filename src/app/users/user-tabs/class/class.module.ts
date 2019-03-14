import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { ClassPage } from './class.page';
import { SharedComponentsModule } from '../../../shared-components/shared-components.module';
import { ShowClassComponent } from './show-class/show-class.component';
import { AddClassComponent } from './add-class/add-class.component';
import { EditClassComponent } from './edit-class/edit-class.component';
import { EntryViewComponent } from './entry-view/entry-view.component';
import { ShowStudentComponent } from './show-student/show-student.component';

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
        path: 'add-class',
        component: AddClassComponent
      },
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
  declarations: [ClassPage, ShowClassComponent, AddClassComponent, EditClassComponent, EntryViewComponent, ShowStudentComponent]
})
export class ClassPageModule {}
