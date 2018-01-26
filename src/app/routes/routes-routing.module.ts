import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {environment} from '../../environments/environment';
import {AuthGuardService} from '../service/auth-guard.service';

import {CoubuyComponent} from './coubuy/coubuy.component';
import {ErrorComponent} from './error/error.component';
import {OrderComponent} from './order/order.component';
import { HistoryComponent } from './history/history.component';
import { HistoryDetailComponent } from './history-detail/history-detail.component';
import { UserComponent } from './user/user.component';
const routes: Routes = [
  {path: 'coubuy', component: CoubuyComponent, canActivate: [AuthGuardService]},
  {path: 'error', component: ErrorComponent},
  {path: 'order', component: OrderComponent},
  {path: 'history', component: HistoryComponent},
  {path: 'historyDetail/:ordernum', component: HistoryDetailComponent},
  {path: 'user', component:UserComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: environment.useHash})],
  exports: [RouterModule]
})
export class RouteRoutingModule {
}
