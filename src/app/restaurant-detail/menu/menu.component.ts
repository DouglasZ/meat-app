import {ActivatedRoute} from '@angular/router';
import { Component, OnInit } from '@angular/core';

import {RestaurantsService} from '../../restaurants/restaurants.service';
import {MenuItem} from '../menu-item/menu-item.model';

import {Observable} from 'rxjs/Observable';

@Component({
  selector: 'mt-menu',
  templateUrl: './menu.component.html'
})
export class MenuComponent implements OnInit {

  menu: Observable<MenuItem[]>;

  constructor(private restaurantsService: RestaurantsService,
              private route: ActivatedRoute) { }

  ngOnInit() {
    // Acessamos o 'this.route.parent', pois precisamos pegar ID que é paramentro da rota 'Pai'.
    this.menu = this.restaurantsService.menuOfRestaurant(this.route.parent.snapshot.params['id']);
    // this.restaurantsService.menuOfRestaurant(this.route.parent.snapshot.params['id'])
    //   .subscribe(menu => this.menu = menu);
  }

  addMenuItem(item: MenuItem) {
    console.log(item);
  }
}
