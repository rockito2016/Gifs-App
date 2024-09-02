import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class GifsService {

  private _tagHistory: string[] = []

  private apiKey: string = 'rfAtMGfhN6ZwaxWdPssGdHGvx3XdTkSs';

  constructor() { }

  /* Utilizamos el operador spred para crear una copia de valor de los tag history
  Esto se da ya que en JS los array pasan por referencia */

  get tagsHistory() {
    return [...this._tagHistory];
  }

  private organizeHistory(tag: string) {
    tag = tag.toLowerCase();

    if (this._tagHistory.includes(tag)) {
      this._tagHistory = this._tagHistory.filter((oldTag) => oldTag !== tag)
    }

    this._tagHistory.unshift(tag);
    this._tagHistory = this.tagsHistory.splice(0, 10);
  }

  public searchTag(tag: string): void {

    if (tag.length == 0) return;
    this.organizeHistory(tag);

    console.log(this.tagsHistory);

  }


}
