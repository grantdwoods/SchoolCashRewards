import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { UserTabsPage } from './user-tabs.page';

const routes: Routes = [
  {path: '',component: UserTabsPage, children: [
    { path: 'class', loadChildren: './class/class.module#ClassPageModule' },
    { path: 'catalog', loadChildren: './catalog/catalog.module#CatalogPageModule' },
    { path: 'student', loadChildren: './student/student.module#StudentPageModule' }
  ]},
  {path: '', redirectTo:'user-tabs/class', pathMatch:'full'}

  
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [UserTabsPage]
})
export class UserTabsPageModule {}
