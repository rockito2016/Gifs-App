import { Component, Input } from '@angular/core';
import { Gifs } from '../../interfaces/gifs.interfaces';

@Component({
  selector: 'gifs-card-list',
  templateUrl: './card-list.component.html',
})
export class CardListComponent {

  /* Este card list va a recibir información del padre y lo hacemos por medio del decorador input */
  @Input()
  public gifs: Gifs[] = [];

}
