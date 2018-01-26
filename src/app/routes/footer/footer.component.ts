import { Component, OnInit } from '@angular/core';
import { RouterModule, RouterLinkActive, ActivatedRoute } from '@angular/router';
 
@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {
  url: any='';
  arr: Array<any>=[];
  isCoubuyActive: boolean=false;
  isHistoryActive: boolean=false;
  isPersonCenterActive: boolean=false;
  constructor(route: ActivatedRoute) {
      //  console.log(route.url);
       for(let i in route.url){
         this.arr.push(route.url[i]);
       }
      //  console.log(this.arr[6][0].path);
      this.url=this.arr[6][0].path;
   }

  ngOnInit() {
    this.urlActive();
  }
  urlActive() {
    if(this.url == 'coubuy') {
      this.isCoubuyActive = true;
      this.isHistoryActive = false;
      this.isPersonCenterActive = false;
    }else if(this.url == 'history') {
      this.isCoubuyActive = false;
      this.isHistoryActive = true;
      this.isPersonCenterActive = false;
    }else if(this.url == 'user') {
      this.isCoubuyActive = false;
      this.isHistoryActive = false;
      this.isPersonCenterActive = true;
    }
  }
}
