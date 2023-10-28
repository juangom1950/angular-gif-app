import { Component, Input } from '@angular/core';
import { Gif } from '../../interfaces/gifs.interfaces';

@Component({
  selector: 'gifs-card-list',
  templateUrl: './card-list.component.html',
})
export class CardListComponent {

  // This gigs is comming from home-page.component.html
  @Input()
  public gifs: Gif[] = [];

}
