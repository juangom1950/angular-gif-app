import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'shared-lazy-image',
  templateUrl: './lazy-image.component.html'
})
export class LazyImageComponent implements OnInit {

  // This comes from card.component.ts
  @Input()
  public url!: string;

  @Input()
  public alt: string = '';


  public hasLoaded: boolean = false;


  // Validate if this url doesn't comes
  ngOnInit(): void {
    if ( !this.url ) throw new Error('URL property is required');
  }

  onLoad() {
    setTimeout(() => {
      this.hasLoaded = true;
    }, 1000)
  }


}
