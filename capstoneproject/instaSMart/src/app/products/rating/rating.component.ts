import { Component, EventEmitter, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-rating',
  templateUrl: './rating.component.html',
  styleUrls: ['./rating.component.css']
})
export class RatingComponent implements OnInit ,OnChanges{
  //rating and cropping of the stars
  @Input() rating!:number;
  cropWidth:number = 75;

  @Input() message: string = '';


  constructor() { }
  ngOnChanges(changes: SimpleChanges): void {

    this.cropWidth =  (this.rating*75)/5;

  }

  ngOnInit(): void {
    
    
  }

  onClick(){
    console.log(this.rating);
  
  }

}