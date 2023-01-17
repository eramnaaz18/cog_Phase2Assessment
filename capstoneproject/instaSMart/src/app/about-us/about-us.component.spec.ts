import { DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { AboutUsComponent } from './about-us.component';

describe('AboutUsComponent', () => {
  let component: AboutUsComponent;
  let fixture: ComponentFixture<AboutUsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AboutUsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AboutUsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  //creation of component
  it('should create', () => {
    expect(component).toBeTruthy();
  });


  //rendering of page title
  it('should render page title as About Us',() =>{
    component.pageTitle = "About Us";
    fixture.detectChanges();
    const rootEle: DebugElement = fixture.debugElement;
    const h1 = rootEle.query(By.css('h1'));
    const h1Element : HTMLElement = h1.nativeElement;
    expect(h1Element.textContent).toContain('About Us');
  });
});
