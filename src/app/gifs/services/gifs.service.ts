import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Gifs, SearchResponse } from '../interfaces/gifs.interfaces';

@Injectable({ providedIn: 'root' })
export class GifsService {

  public gifList: Gifs[] = [];
  private _tagHistory: string[] = [];

  private apiKey: string = 'rfAtMGfhN6ZwaxWdPssGdHGvx3XdTkSs';
  private serviceUrl: string = 'http://api.giphy.com/v1/gifs';

  constructor(private http: HttpClient) {
    this.loadLocalStorage();
    console.log('Gifs has been received');
  }

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
    this.saveLocalStorage();
  }


  private saveLocalStorage(): void {
    localStorage.setItem('history', JSON.stringify(this._tagHistory));
  }

  private loadLocalStorage(): void {
    if (!localStorage.getItem('history')) return;
    /* Aquí obtenemos el stringify del objeto de strings que almacena a nuestros GIFS.
    Esto lo hacemos por medio de JSON.parse y el operator not null para indicar que siempre recibiremos data */
    this._tagHistory = JSON.parse(localStorage.getItem('history')!);

    if (this._tagHistory.length === 0) return;
    this.searchTag(this._tagHistory[0]);
  }

  public searchTag(tag: string): void {

    if (tag.length == 0) return;
    this.organizeHistory(tag);
    /* Creamos un objeto para nuestros query params */
    const params = new HttpParams()
      .set('api_key', this.apiKey)
      .set('limit', '10')
      .set('q', tag)

    /* Obetener datos mediante http */
    this.http.get<SearchResponse>(`${this.serviceUrl}/search?`, { params })
      .subscribe(resp => {
        this.gifList = resp.data;
        console.log({ gifs: this.gifList });

      })
  }


}
