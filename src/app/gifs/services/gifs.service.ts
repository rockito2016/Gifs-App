import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class GifsService {

  private _tagHistory: string[] = []

  constructor() { }

  /* Utilizamos el operador spred para crear una copia de valor de los tag history
  Esto se da ya que en JS los array pasan por referencia */

  get tagsHistory() {
    return [...this._tagHistory];
  }

  public searchTag(tag: string): void {
    this._tagHistory.unshift(tag);
  }


}
