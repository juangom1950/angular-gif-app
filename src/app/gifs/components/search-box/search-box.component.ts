import { Component, ElementRef, ViewChild } from '@angular/core';
import { GifsService } from '../../services/gifs.service';

@Component({
  selector: 'gifs-search-box',
  template: `
    <h5>Buscar:</h5>
    <input type="text"
      class="form-control"
      placeholder="Buscar gifs..."
      (keyup.enter)="searchTag()"
      #txtTagInput
    >
  `
})

export class SearchBoxComponent  {

  // Here with the "!" I am telling it that it always going to have a value
  @ViewChild('txtTagInput')
  public tagInput!: ElementRef<HTMLInputElement>;

  // Here we are injecting the service
  constructor( private gifsService: GifsService ) { }


  // searchTag( newTag: string ) {
  searchTag() {
    const newTag = this.tagInput.nativeElement.value;

    this.gifsService.searchTag(newTag);

    // Reset value
    this.tagInput.nativeElement.value = '';

  }

}
