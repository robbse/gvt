import { Component, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { WebglService } from '../services/webgl.service';
import { Renderer2 } from '@angular/core';

@Component({
  selector: 'app-ea3',
  templateUrl: './ea3.component.html',
  styleUrls: ['./ea3.component.css']
})
export class Ea3Component implements AfterViewInit {

  @ViewChild('webglContainer') container: ElementRef;

  constructor(
    private renderer2: Renderer2,
    private webglService: WebglService
  ) { }

  ngAfterViewInit() {
    this.webglService.init(this.container, this.renderer2);
    this.webglService.drawLineFromFont();
    this.webglService.drawLine();

    console.log('App works, yeah!');
  }

}
