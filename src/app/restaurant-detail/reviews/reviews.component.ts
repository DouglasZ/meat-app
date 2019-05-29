import {ActivatedRoute} from '@angular/router';
import { Component, OnInit } from '@angular/core';

import {RestaurantsService} from '../../restaurants/restaurants.service';
import {Observable} from 'rxjs/Observable';

@Component({
  selector: 'mt-reviews',
  templateUrl: './reviews.component.html'
})
export class ReviewsComponent implements OnInit {

  reviews: Observable<any>;

  constructor(private restaurantsService: RestaurantsService,
              private route: ActivatedRoute) { }

  ngOnInit() {
    // Acessamos o 'this.route.parent', pois precisamos pegar ID que é paramentro da rota 'Pai'.
    this.reviews = this.restaurantsService.reviewsOfRestaurant(this.route.parent.snapshot.params['id']);
    // this.restaurantsService.reviewsOfRestaurant(this.route.parent.snapshot.params['id'])
    //   .subscribe(reviews => this.reviews = reviews);
  }

}
