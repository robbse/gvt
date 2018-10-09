import { Component, AfterViewInit, ViewChild, ElementRef, DoCheck, HostListener } from '@angular/core';
import anime from 'animejs';
import { ParseSourceSpan } from '@angular/compiler';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewInit, DoCheck {
  title = 'ea1-app';

  public animation: any;
  public angle = '';

  @ViewChild('infiniteEarthLoop') infiniteEarthLoop: ElementRef;

  @HostListener('document:keypress', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    console.log(event.key);
    switch (event.key) {
      case 'l':
        this.rotate(-10);
        break;
      case 'r':
        this.rotate(10);
        break;
      default:
        break;
    }
  }

  ngDoCheck(): void {
    this.angle = this.infiniteEarthLoop.nativeElement.style.transform;
  }

  ngAfterViewInit() {
    this.animation = anime({
      targets: 'img',
      rotate: 360,
      loop: true,
      autoplay: true,
      easing: 'linear',
      duration: 5000
    });
  }

  pause() {
    this.animation.pause();
  }

  play() {
    this.animation.play();
  }

  rotate(angle: number) {
    this.animation.pause();
    let currentAngle = this.infiniteEarthLoop.nativeElement.style.transform;
    const regex = new RegExp(/[^\D]\d*/g);
    currentAngle = currentAngle.match(regex);
    currentAngle = parseInt(currentAngle[0], 10);
    this.infiniteEarthLoop.nativeElement.style.transform = 'rotate(' + (currentAngle + angle) + 'deg)';
  }

}
