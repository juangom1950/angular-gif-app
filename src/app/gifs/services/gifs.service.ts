import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { SearchResponse, Gif } from '../interfaces/gifs.interfaces';

//providedIn: 'root' will allows it to get access to this service through all the application.
@Injectable({ providedIn: 'root' })
export class GifsService {

  public gifList: Gif[] = [];

  private _tagsHistory: string[] = [];
  private apiKey:       string = 'xWyh2FPYB2oyrtudeFuxEr7iQghusSQW';
  private serviceUrl:   string = 'https://api.giphy.com/v1/gifs';

  constructor( private http: HttpClient ) {
    this.loadLocalStorage();
    console.log('Gifs Service Ready');
  }

  get tagsHistory() {
    // We use the spread operator here to create a copy of the tagHistory
    return [...this._tagsHistory];
  }

  private organizeHistory(tag: string) {
    tag = tag.toLowerCase();

    if ( this._tagsHistory.includes( tag ) ) {
      // This will filter the tags that we already had in the list
      // This is to avoid duplicates
      this._tagsHistory = this._tagsHistory.filter( (oldTag) => oldTag !== tag )
    }

    // Inserts new element to the start of the array
    this._tagsHistory.unshift( tag );
    // It looks like it removes element 10
    this._tagsHistory = this.tagsHistory.splice(0,10);

    this.saveLocalStorage();
  }

  private saveLocalStorage():void {
    localStorage.setItem('history', JSON.stringify( this._tagsHistory ));
  }

  private loadLocalStorage():void {
    // Verify if it is not null
    if( !localStorage.getItem('history')) return;

    // this ! is the "Not null Operator" assertion. I am telling Angular, it isn't null.
    this._tagsHistory = JSON.parse( localStorage.getItem('history')! );

    // Search for the tag
    if ( this._tagsHistory.length === 0 ) return;
    this.searchTag( this._tagsHistory[0] );
  }


  searchTag( tag: string ):void {
    if ( tag.length === 0 ) return;
    this.organizeHistory(tag);

    const params = new HttpParams()
      .set('api_key', this.apiKey )
      .set('limit', '10' )
      .set('q', tag )

    // This isn't a promise, this is an observable
    this.http.get<SearchResponse>(`${ this.serviceUrl }/search`, { params })
      .subscribe( resp => {

        this.gifList = resp.data;
        // console.log({ gifs: this.gifList });

      });

  }

}
