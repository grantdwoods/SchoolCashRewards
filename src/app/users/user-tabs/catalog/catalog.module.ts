import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { CatalogPage } from './catalog.page';
import { SharedComponentsModule } from '../../../shared-components/shared-components.module';

const routes: Routes = [
  {
    path: '',
    component: CatalogPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    SharedComponentsModule
  ],
  declarations: [CatalogPage]
})
export class CatalogPageModule {}