import {NgModule} from '@angular/core';
import {SharedModule} from '../shared/shared.module';
import {RouteRoutingModule} from './routes-routing.module';
import {CoubuyComponent} from './coubuy/coubuy.component';
import { ErrorComponent } from './error/error.component';
import { OrderComponent } from './order/order.component';
import { FooterComponent } from './footer/footer.component';
import { HistoryComponent } from './history/history.component';
import { HistoryDetailComponent } from './history-detail/history-detail.component';
import { UserComponent } from './user/user.component';

@NgModule({
  imports: [SharedModule, RouteRoutingModule],
  declarations: [CoubuyComponent, ErrorComponent, OrderComponent, FooterComponent, HistoryComponent, HistoryDetailComponent, UserComponent]
})

export class RoutesModule {
}
