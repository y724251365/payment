import { Component, OnInit } from '@angular/core';
import { InitService } from '../../service/init.service';
import {FormBuilder, FormGroup, Validators, FormControl} from '@angular/forms';
@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {
  isFormOpen: boolean=false;
  validateForm: FormGroup;
  user = {
    'id':  0,
    'name': '',
    'pic': '',
    'gender': 0,
    'client': 0,
    'tel':'',
    'create_time': '',
    'update_time':''
  };
  username: string='';
  userphone: string='';
  cardNo: string = '';
  formsVail: any = {userName:'',userTel:'',userSex:0};// 更改信息提交
  constructor(private _init: InitService, private fb: FormBuilder,) {
    // 请求卡号，之后在请求个人信息。
    this._init.getCard().then(res => {
      this.cardNo = res.json().result.cardno;
      // console.log(this.cardNo);
    }).then(() => {
      this._init.getUserInfo(this.cardNo).then(res2 => {
        this.user = res2.json().result;
        // console.log(this.user);
        this.username=this.user.name;
        this.userphone = this.user.tel;
      })
    })
   }

  ngOnInit() {
      // 表单控件
      this.validateForm = new FormGroup({
        'userName':new FormControl(this.formsVail.userName, [Validators.required, Validators.maxLength(20)]),
        'userTel': new FormControl(this.formsVail.userTel, [Validators.required, Validators.maxLength(11), Validators.minLength(8)]),
        'userSex': new FormControl(this.formsVail.userSex,[])
      })
      
  }
  //  控件按钮控制关闭
  isCloseWindow(){
    this.isFormOpen = false;
  }

  // 按钮点击显示表单控件
  isFormHidden(){
    if(this.isFormOpen == true) {
      this.isFormOpen = false;
    }else{
      this.isFormOpen = true;
  }
}
// 验证表单控件！
get userName() {return this.validateForm.get('userName')};
get userTel() {return this.validateForm.get('userTel')};

upload() {
      // console.log(this.formsVail.userName);
      // console.log(this.formsVail.userTel);
      // console.log(this.formsVail.userSex);
      this._init.getUpdateInfo(this.formsVail.userName, Number(this.formsVail.userSex), 
        this.formsVail.userTel).then(res3 => {
                                  // console.log(res3);
                               }).then(() => {
                                 this._init.getUserInfo(this.cardNo).then(res4 => {
                                  this.user = res4.json().result;
                                  // console.log(this.user);
                                  this.isFormOpen = false;
                                 })
                               })               
  }
}