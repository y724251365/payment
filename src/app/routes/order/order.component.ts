import { Component, OnInit } from '@angular/core';
import { InitService } from '../../service/init.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent implements OnInit {
  history = {
    ordernum: '',
    status: '',
    client: '',
    amount: '',
    create_time: '',
    count: ''
  }
  constructor(private _init: InitService) { }

  ngOnInit() {
  }

}
