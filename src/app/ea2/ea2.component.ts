import { Component, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { WebglService } from './../services/webgl.service';
import { Renderer2 } from '@angular/core';

@Component({
  selector: 'app-ea2',
  templateUrl: './ea2.component.html',
  styleUrls: ['./ea2.component.css']
})
export class Ea2Component implements AfterViewInit {

  @ViewChild('webglContainer') container: ElementRef;

  constructor(
    private renderer2: Renderer2,
    private webglService: WebglService
  ) { }

  ngAfterViewInit() {
    this.webglService.init(this.container, this.renderer2);
    this.webglService.drawLine();
  }

}
