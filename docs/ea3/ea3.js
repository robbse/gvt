'use strict';

// Compile fragment shader.
var fsSouce = 'precision mediump float;' +
  'varying vec4 color;' +
  'void main() {' +
  'gl_FragColor = color;' +
  '}';

// Compile vertex shader.
var vsSource = '' +
  'attribute vec2 pos;' +
  'attribute vec4 col;' +
  'varying vec4 color;' +
  'void main(){' +
  'color = col;' +
  'gl_Position = vec4(pos*0.2-0.5, 0, 1);' +
  '}';

main()

function main() {

  // Get the WebGL context.
  var canvas = document.getElementById('glcanvas');
  var gl = canvas.getContext('webgl');

  if (!gl) {
    gl = canvas.getContext('experimental-webgl');
  }

  // Pipeline setup.
  gl.clearColor(0.9, 0.9, 0.9, 1);
  // Backface culling.
  gl.frontFace(gl.CCW);
  gl.enable(gl.CULL_FACE);
  gl.cullFace(gl.BACK); // or gl.FRONT

  var vs = gl.createShader(gl.VERTEX_SHADER);
  gl.shaderSource(vs, vsSource);
  gl.compileShader(vs);

  var fs = gl.createShader(gl.FRAGMENT_SHADER);
  gl.shaderSource(fs, fsSouce);
  gl.compileShader(fs);

  // Link shader together into a program.
  var prog = gl.createProgram();
  gl.attachShader(prog, vs);
  gl.attachShader(prog, fs);
  gl.linkProgram(prog);
  gl.useProgram(prog);

  drawScene(gl, prog);

}

function drawScene(gl, prog) {
  // Vertex data

  // Positions.
  var vertices = new Float32Array([
    0, 0,
    2, 0,
    2, 2,
    3, 2,
    3, 0,
    5, 0,
    5, 5,
    2.5, 7,
    0, 5
  ]);

  // Colors as rgba.
  var colors = new Float32Array(
    [
      Math.random(), Math.random(), Math.random(), 1,
      Math.random(), Math.random(), Math.random(), 1,
      Math.random(), Math.random(), Math.random(), 1,
      Math.random(), Math.random(), Math.random(), 1,
      Math.random(), Math.random(), Math.random(), 1,
      Math.random(), Math.random(), Math.random(), 1,
      Math.random(), Math.random(), Math.random(), 1,
      Math.random(), Math.random(), Math.random(), 1,
      Math.random(), Math.random(), Math.random(), 1,
    ]);

  // Index data.
  var indices = new Uint16Array([
    0, 1, 2,
    0, 2, 8,
    2, 7, 8,
    2, 3, 7,
    3, 6, 7,
    3, 5, 6,
    3, 4, 5
  ]);

  // Setup position vertex buffer object.
  var vboPos = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, vboPos);
  gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);

  // Bind vertex buffer to attribute variable.
  var posAttrib = gl.getAttribLocation(prog, 'pos');
  gl.vertexAttribPointer(posAttrib, 2, gl.FLOAT, false, 0, 0);
  gl.enableVertexAttribArray(posAttrib);

  // Setup color vertex buffer object.
  var buffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
  gl.bufferData(gl.ARRAY_BUFFER, colors, gl.STATIC_DRAW);

  // Bind vertex buffer to attribute variable.
  var colAttrib = gl.getAttribLocation(prog, 'col');
  gl.vertexAttribPointer(colAttrib, 4, gl.FLOAT, false, 0, 0);
  gl.enableVertexAttribArray(colAttrib);

  var ibo = gl.createBuffer();
  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, ibo);
  gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, indices, gl.STATIC_DRAW);
  ibo.numerOfEmements = indices.length;

  // Clear framebuffer and render primitives.
  gl.clear(gl.COLOR_BUFFER_BIT);
  gl.drawElements(gl.TRIANGLES, ibo.numerOfEmements, gl.UNSIGNED_SHORT, 0);

}
