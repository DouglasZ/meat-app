import {NgModule} from '@angular/core';

import {OrderComponent} from './order.component';
import {RouterModule, Routes} from '@angular/router';

import {OrderItemsComponent} from './order-items/order-items.component';
import {DeliveryCostsComponent} from './delivery-costs/delivery-costs.component';

import {SharedModule} from '../shared/shared.module';
import {LeaveOrderGuard} from './leave-order.guard';


const ROUTES: Routes = [
  {path: '', component: OrderComponent, canDeactivate: [LeaveOrderGuard]}
];

@NgModule({
  declarations: [
    OrderComponent,
    OrderItemsComponent,
    DeliveryCostsComponent
  ],
  imports: [
    SharedModule,
    RouterModule.forChild(ROUTES)
  ],
  exports: [
  ]
})
export class OrderModule {

}
