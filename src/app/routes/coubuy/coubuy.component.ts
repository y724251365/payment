import {Component, OnInit} from '@angular/core';
import {InitService} from '../../service/init.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-coubuy',
  templateUrl: './coubuy.component.html',
  styleUrls: ['./coubuy.component.scss']
})
export class CoubuyComponent implements OnInit {
  machine = {
    mcode: '',
    appid: '',
    client: '',
    aux: '',
    sn: '',
  };
  card = {
    cardno: '',
    mqttpswd: '',
    namount: 0,
    red_packet: 0,
  };
  room = {
    id: 0,
    appid: '',
    address: '',
    room: '',
    tel: '',
    title: ''
  };
  hotel = {
    name: '',
    tel: '',
    logo: '',
  };
  history = {
    ordernum: '',
    status: '',
    client: '',
    amount: '',
    create_time: '',
    count: ''
  }
  links = [];
  // cardNum: string;

  constructor(private _init: InitService,
              private _router: Router) {
  }

  ngOnInit() {
    this._init.getInit().then(res => {
      this.machine = res.json().result;
      // console.log(this.machine);

      // 获取卡信息
      this._init.getCard().then(res2 => {
        this.card = res2.json().result;
        // console.log(this.card);
        // this.cardNum = res2.json().result.cardno;
        // console.log(this.cardNum);
      })
    //   .then(() => {
    //     // 获取用户购物车历史订单
    // this._init.getShoppingHistory(this.cardNum, 1).then(res7 => {
    //   this.history = res7.json().result;
    //   // console.log(this.history);
    // })
    //   });

      // 获取酒店信息
      this._init.getAddr(this.machine.appid).then(res4 => {
        this.room = res4.json().result;
      });
      this._init.getHotel(this.machine.appid).then(res5 => {
        this.hotel = res5.json().result;
      });

      this._init.getLinks(this.machine.appid).then(res6 => {
        this.links = res6.json().result.data;
        console.log(this.links);
      });
      
    });
    
  }
  //购物车的方法
// shoppingCar() {
//   if(this.history.count){
//     this._router.navigateByUrl('/order');
//     
//   }
// }
}
