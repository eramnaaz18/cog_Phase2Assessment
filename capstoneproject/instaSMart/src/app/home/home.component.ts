import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  constructor(){}

  //this has 5 slider images that is inputted in carousel component
  public slides = [
    { src: "../../assets/images/image.jpg" },
    { src: "../../assets/images/image1.jpg"  },
    { src: "../../assets/images/image2.jpg"  },
    { src: "../../assets/images/image3.jpg"  },
    { src: "../../assets/images/image4.jpg"  }
  ];
}
