import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
 
const routes: Routes = [
  { path: 'class', loadChildren: './class/class.module#ClassPageModule' },  { path: 'catalog', loadChildren: './catalog/catalog.module#CatalogPageModule' },
  { path: 'student', loadChildren: './student/student.module#StudentPageModule' }

];
 
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
