import {Inject, Injectable} from '@angular/core';
import {Headers, Http} from '@angular/http';
import {CookiesService} from './cookies.service';
import {environment} from '../../environments/environment';


@Injectable()
export class InitService {
  private headers = new Headers({
    'Content-Type': 'application/json; charset=UTF-8',
    'x-access-token': this._cookie.getCookie('t'),
  });
  uri = environment.production ? 'http://oauth.counect.com/' : '/';
  // 'http://oauth.counect.com/';

  constructor(private http: Http,
              private _cookie: CookiesService) {
  }

  getInit(): Promise<any> {
    const uri = `${this.uri}api/init`;
    return this.http
      .get(uri, {headers: this.headers})
      .toPromise();
  }

  getCard(): Promise<any> {
    const uri = `${this.uri}api/card/info`;
    return this.http
      .get(uri, {headers: this.headers})
      .toPromise();
  }

  getAddr(appid): Promise<any> {
    const body = {
      'data': {
        'appid': appid,
      },
      'sign': '1234'
    };
    const uri = `${this.uri}api/kfpage/addr`;
    return this.http
      .post(uri, JSON.stringify(body), {headers: this.headers})
      .toPromise();
  }

  getHotel(appid): Promise<any> {
    const body = {
      'data': {
        'appid': appid,
      },
      'sign': '1234'
    };
    const uri = `${this.uri}api/kfpage/sellers`;
    return this.http
      .post(uri, JSON.stringify(body), {headers: this.headers})
      .toPromise();
  }

  getLinks(appid): Promise<any> {
    const body = {
      'data': {
        'appid': appid,
      },
      'sign': '1234'
    };
    const uri = `${this.uri}api/kfpage/links`;
    return this.http
      .post(uri, JSON.stringify(body), {headers: this.headers})
      .toPromise();
  }

  // 查询用户购物车的购买历史订单

  // getShoppingHistory(cardno:any): Promise<any> {
    
  //   const uri = `${this.uri}api/card/order?cardno=${cardno}&page=1&pageSize=5`;
  //   console.log(cardno);
  //   return this.http
  //   .get(uri, {headers:this.headers})
  //   .toPromise();
  // }
   
  // 测试
   getShoppingHistory(cardno:any, page: number): Promise<any> {
    // 测试历史购物车里有东西
    const uri = `${this.uri}api/card/order?cardno=${cardno}&page=${page}&pageSize=5`;
    // console.log(cardno);
    return this.http
    .get(uri, {headers:this.headers})
    .toPromise();
  }

  // 查询个人信息
  getUserInfo(cardno: string): Promise<any> {
    const uri = `${this.uri}api/card/query?cardno=${cardno}`;
    // console.log(cardno);
    // const uri = `${this.uri}api/cardno/query?cardno=1010000092738941`;
    return this.http
    .get(uri, {headers: this.headers})
    .toPromise();
  }
  // 更新个人信息
  getUpdateInfo(name: string, gender: number, tel: string): Promise<any> {
    const body = {
      'data': {
        'name': name,
        'pic': '图片',
        'gender':gender,
        'tel': tel
      },
      'sign':'1234'
    }
    // console.log(body);
    const uri = `${this.uri}api/card/update`;
    return this.http
    .post(uri, JSON.stringify(body), {headers: this.headers})
    .toPromise();
  }

  // 请求每一个订单号下的订单详情
  getOrdernumDetail(ordernum: string): Promise<any> {
    const uri = `${this.uri}api/card/detail?ordernum=${ordernum}`;
    // console.log(ordernum);
    return this.http
    .get(uri, {headers: this.headers})
    .toPromise();
  }
}
