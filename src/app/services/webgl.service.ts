import { Injectable, ElementRef, Renderer2 } from '@angular/core';

import * as THREE from 'three';

@Injectable({
  providedIn: 'root'
})
export class WebglService {
  private camera: THREE.Camera;
  private scene = new THREE.Scene();
  private webGlRenderer = new THREE.WebGLRenderer();
  private fontLoader = new THREE.FontLoader();

  init(hostElementRef: ElementRef, ngRenderer: Renderer2): void {
    const hostElement = hostElementRef.nativeElement;

    this.webGlRenderer.setSize(640, 480);

    ngRenderer.appendChild(
      hostElement,
      this.webGlRenderer.domElement
    );

    this.camera = new THREE.PerspectiveCamera(23, 1.77, 10, 3000);
    this.camera.position.set(0, 0, 2500);
    this.camera.lookAt(new THREE.Vector3(0, 10, 0));

    const ambient = new THREE.AmbientLight(0x5E5E5E);
    this.scene.add(ambient);
    const light = new THREE.SpotLight(0x00008B);
    light.position.set(0, 1500, 1000);
    this.scene.add(light);

    this.webGlRenderer.render(this.scene, this.camera);

    console.log('webglService init');

  }

  drawLineFromFont(): THREE.Line {

    this.fontLoader.load('assets/Baloo_Bhaijaan_Regular.json', (font) => {

      const geometry = new THREE.TextGeometry('Hello World!', {
        font: font,
        size: 200,
        height: 15,
        curveSegments: 10,
        bevelEnabled: true,
        bevelThickness: 1,
        bevelSize: 5,
        bevelSegments: 5
      });

      geometry.center();

      const material = new THREE.LineBasicMaterial({
        color: 0xfc913a
      });

      const line = new THREE.Line(geometry, material);

      this.scene.add(line);

      this.webGlRenderer.render(this.scene, this.camera);

      return line;

    });

  }

  drawLine(): THREE.Line {

    const geometry = new THREE.Geometry();

    for (let i = 1; i < 30; i++) {
      geometry.vertices.push(
        new THREE.Vector3(-500 * Math.random(), 0, 0),
        new THREE.Vector3(0, 500 * Math.random(), 0),
        new THREE.Vector3(500 * Math.random(), 0, 0)
      );
    }

    const material = new THREE.LineBasicMaterial({
      color: 0xffffff
    });

    const line = new THREE.LineLoop(geometry, material);

    this.scene.add(line);

    this.webGlRenderer.render(this.scene, this.camera);

    return line;
  }

}
