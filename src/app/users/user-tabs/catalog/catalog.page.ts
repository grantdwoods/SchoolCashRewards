import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../../services/authentication.service';
import { CatalogService } from '../../../services/catalog.service';

@Component({
  selector: 'app-catalog',
  templateUrl: './catalog.page.html',
  styleUrls: ['./catalog.page.scss'],
})
export class CatalogPage implements OnInit {

  constructor(private authService: AuthenticationService, private catalogService: CatalogService) { }

  private catalogOwners :object;
  private hasCatalog :boolean = false;

  async ngOnInit() {
    this.catalogOwners = await this.catalogService.getCatalogOwners().toPromise();
    
    let userId = this.authService.getUserID();
    Object.keys(this.catalogOwners).map(key => {
      console.log(this.catalogOwners[key]);
      if(this.catalogOwners[key]['strTeacherID'] == userId){
        this.hasCatalog == true;
      }
    });
    
  }

  logout(){
    this.authService.logout();
  }
}
