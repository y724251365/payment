import { Component, OnInit } from '@angular/core';
import { Route, RouterModule, RouterLinkActive, ActivatedRoute } from '@angular/router';
import { InitService } from '../../service/init.service';
@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.scss']
})
export class HistoryComponent implements OnInit {
  historyProduct = [];
  isOrderBottom: boolean = false;
  card = {
    cardno: '',
    mqttpswd: '',
    namount: 0,
    red_packet: 0,
  };
  i: number = 0;
  count: any;
  cardNum: string='';
  constructor(private _init: InitService, private route: ActivatedRoute) { }

  ngOnInit() {
     // 获取卡信息
     this._init.getCard().then(res2 => {
      this.card = res2.json().result;
      // console.log(this.card);
      this.cardNum = res2.json().result.cardno;
      // console.log(this.cardNum);
    }).then(() => {
      // 获取用户购物车历史订单
  this._init.getShoppingHistory(this.cardNum, this.i).then(res7 => {
    // console.log(this.i);
    this.historyProduct = res7.json().result.data;
    // console.log(this.historyProduct);
    this.count = res7.json().result.count;
  })
    })

    // 滚动
    this.scroll();
  }
  scroll() { // 滚动到底自动加载下一页
    function getScrollTop() {// 获取滚动条当前的位置
    let scrollTop = 0;
    if (document.documentElement && document.documentElement.scrollTop) {
    scrollTop = document.documentElement.scrollTop;
    } else if (document.body) {
    scrollTop = document.body.scrollTop;
    }
    // console.log(scrollTop);
    return scrollTop;
    }
    function getClientHeight() { // 获取当前可视范围的高度
    let clientHeight = 0;
    if (document.body.clientHeight && document.documentElement.clientHeight) {
    clientHeight = Math.min(document.body.clientHeight, document.documentElement.clientHeight);
    } else {
    clientHeight = Math.max(document.body.clientHeight, document.documentElement.clientHeight);
    }
    // console.log(clientHeight);
    return clientHeight;
    }
    function getScrollHeight() { // 获取文档完整的高度
    return Math.max(document.body.scrollHeight, document.documentElement.scrollHeight);
    }
    window.onscroll = () => {
    if (getScrollTop() + getClientHeight() >= getScrollHeight()) {
    // console.log('到底了');
    if (this.historyProduct) {
    if (this.historyProduct.length < this.count) {
      // console.log(this.historyProduct.length);
      // console.log(this.count);
    this.i += 1;
    this._init.getShoppingHistory(this.cardNum,this.i)
    .then(res => {
    for (let i = 0 ; i < res.json().result.data.length; i++ ) { // 遍历新获取到的数据数组，push到goods后
    this.historyProduct.push(res.json().result.data[i]);
    }
    });
    }else {
      this.isOrderBottom = true;
      // console.log(this.isOrderBottom);
      // console.log(this.historyProduct.length);
    }
    }
    }
    };
    }
}
