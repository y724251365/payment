import { Component, OnInit } from '@angular/core';
import { RouterModule, RouterLinkActive, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { InitService } from '../../service/init.service';
@Component({
  selector: 'app-history-detail',
  templateUrl: './history-detail.component.html',
  styleUrls: ['./history-detail.component.scss']
})
export class HistoryDetailComponent implements OnInit {
  routeUrl: any;
  detailProduct: any;
  constructor(private location: Location, 
              private route: ActivatedRoute,
              private _init: InitService) {
                   
   }
  
  ngOnInit() {
    this.getOrderNumber()
  }
  toBackPrev() {
    this.location.back();
  }

  // 封装拿订单号方法
  getOrderNumber(){
         // 拿到路由地址上的卡号信息
     this.route.params.subscribe((data: any) => {
      this.routeUrl= data.ordernum;
      // console.log(this.routeUrl);
      this._init.getOrdernumDetail(this.routeUrl).then(res => {
        // console.log(res.json());
        this.detailProduct = res.json().result.wl;
        // console.log(this.detailProduct);
      })
    })
  }

  
}
