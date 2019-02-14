import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { AddClassPage } from './add-class.page';
import { SharedComponentsModule } from '../../../../shared-components/shared-components.module';

const routes: Routes = [
  {
    path: '',
    component: AddClassPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SharedComponentsModule,
    RouterModule.forChild(routes)
  ],
  declarations: [AddClassPage]
})
export class AddClassPageModule {}
