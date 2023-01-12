import { trigger, transition, useAnimation } from '@angular/animations';
import { Component, Input, OnChanges, OnDestroy, OnInit } from '@angular/core';
import { fadeIn, fadeOut, scaleIn, scaleOut,} from "./carousel.animations";
@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.css'],
  animations: [
    trigger("slideAnimation", [
      /* scale */
      transition("void => *", [useAnimation(scaleIn, {params: { time: '500ms' }} )]),
      transition("* => void", [useAnimation(scaleOut, {params: { time: '500ms' }})]),
    ]),
    
    trigger("carouselAnimation", [
      transition("void => *", [useAnimation(fadeIn, {params: { time: '800ms' }} )]),
      transition("* => void", [useAnimation(fadeOut, {params: { time: '800ms' }})]),
    ])
  ]
})
export class CarouselComponent implements OnInit, OnChanges, OnDestroy {

  //Takes in input from parent component (Home) where the slider[] is defined with all five images
  @Input() slides:any;

  //The starting position of slide
  currentSlide = 0;

  //take in id for timeOut to let animation play on its own
  timeOutId?:number;

  ngOnInit(){
    //on the initialisation the timer is set to 0
    this.resetTimer();
  }

  ngOnChanges(){
    //with every change happening it loads the previous and next image for animation to happen
    this.preloadImages();
  }
  preloadImages() {
    for (const slide of this.slides) {
      new Image().src = slide.src;
    }
  }

  ngOnDestroy(){
    //making sure that id of timeOut is cleared when the app is closed
    window.clearTimeout(this.timeOutId);
    
  }


  //the function takes in the time value as 3s for image to move to next image on its own
  //without user clicking on the next button
  resetTimer(){
    if(this.timeOutId){
      window.clearTimeout(this.timeOutId);
    }
    this.timeOutId = window.setTimeout(()=>this.onNextClick(),3000);
  }


  constructor() {}
  
  //this is the function to go to previous slider image
  //It also checks if negative index reached or not
  //If index is less than 0 it should display the last slider image of the slider[]
  //Else it should display the previous image with respect to the current image index
  onPreviousClick() {
    const previous = this.currentSlide - 1;
    this.currentSlide = previous < 0 ? this.slides.length - 1 : previous;
    //console.log("previous clicked, new current slide is: ", this.currentSlide);
    this.resetTimer();
  }


  //this is the function for viewing next image in the slider[]
  //if it reaches the last position, it makes sure to start all over again with the image at first position
  //Else it keeps on moving to the next image in the slider[]
  onNextClick() {
    const next = this.currentSlide + 1;
    this.currentSlide = next === this.slides.length ? 0 : next;
    //console.log("next clicked, new current slide is: ", this.currentSlide);
    this.resetTimer();
  }

}
