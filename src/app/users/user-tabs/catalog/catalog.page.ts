import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../../services/authentication.service';
import { CatalogService } from '../../../services/catalog.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-catalog',
  templateUrl: './catalog.page.html',
  styleUrls: ['./catalog.page.scss'],
})
export class CatalogPage implements OnInit {

  constructor(private authService: AuthenticationService, private catalogService: CatalogService) { }

  private catalogOwners :object;
  private hasCatalog :boolean = false;
  private selectedUser:string;
  private catalogItems: Observable<object>;
  private i = Array;

  async ngOnInit() {
    this.catalogOwners = await this.catalogService.getCatalogOwners().toPromise();
    
    let userId = this.authService.getUserID();
    Object.keys(this.catalogOwners).map(key => {
      console.log(this.catalogOwners[key]);
      if(this.catalogOwners[key]['strTeacherID'] == userId){
        this.hasCatalog = true;
      }
    });
  }

  logout(){
    this.authService.logout();
  }

  changeCatalog(){ 
    console.log("Event fired");
    console.log(this.selectedUser);
    
    this.catalogItems = this.catalogService.getCatalog(this.selectedUser);
    // Object.keys(this.catalogItems).map(key =>{
    //   console.log(this.catalogItems[key]);
    // });
  }
}
