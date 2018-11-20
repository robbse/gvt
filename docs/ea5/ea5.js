'use strict';

// Compile fragment shader.
var fsSouce = 'precision mediump float;' +
  'varying vec4 color;' +
  'void main() {' +
  'gl_FragColor = color;' +
  '}';

// Compile vertex shader.
var vsSource = '' +
  'attribute vec3 pos;' +
  'attribute vec4 col;' +
  'varying vec4 color;' +
  'void main(){' + 'color = col;' +
  'gl_Position = vec4(pos, 1);' +
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

  // Depth(Z)-Buffer.
  gl.enable(gl.DEPTH_TEST);
  gl.depthFunc(gl.LEQUAL);

  // Polygon offset of rastered Fragments.
  gl.enable(gl.POLYGON_OFFSET_FILL);
  gl.polygonOffset(1.0, 1.0);

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
  gl.bindAttribLocation(prog, 0, "pos");
  gl.linkProgram(prog);
  gl.useProgram(prog);

  // Draw scene
  drawScene(gl, prog);

}

function drawScene(gl, prog) {
  // Vertex data

  // Positions.
  var vertices;

  // Index data.
  var indicesLines, indicesTris;

  // Fill the data arrays.
  _createVertexData(vertices, indicesLines, indicesTris,
    function (verticesFilled, indicesLinesFilled, indicesTrisFilled) {
      vertices = verticesFilled;
      indicesLines = indicesLinesFilled;
      indicesTris = indicesTrisFilled;
    });

  // Setup position vertex buffer object.
  var vboPos = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, vboPos);
  gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);

  // Bind vertex buffer to attribute variable.
  var posAttrib = gl.getAttribLocation(prog, 'pos');
  gl.vertexAttribPointer(posAttrib, 3, gl.FLOAT, false, 0, 0);
  gl.enableVertexAttribArray(posAttrib);

  // Setup constant color.
  var colAttrib = gl.getAttribLocation(prog, 'col');
  gl.vertexAttrib4f(colAttrib, 0, 0, 1, 1);

  // Setup lines index buffer object.
  var iboLines = gl.createBuffer();
  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, iboLines);
  gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, indicesLines, gl.STATIC_DRAW);
  iboLines.numberOfElements = indicesLines.length;
  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, null);

  // Setup tris index buffer object.
  var iboTris = gl.createBuffer();
  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, iboTris);
  gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, indicesTris, gl.STATIC_DRAW);
  iboTris.numberOfElements = indicesTris.length;
  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, null);

  // Clear framebuffer and render primitives.
  gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

  // Setup rendering tris.
  gl.vertexAttrib4f(colAttrib, 1, 1, 1, 1);
  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, iboTris);
  gl.drawElements(gl.TRIANGLES, iboTris.numberOfElements, gl.UNSIGNED_SHORT, 0);

  // Setup rendering lines.
  gl.vertexAttrib4f(colAttrib, 0, 0, 0.1, 0.2);
  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, iboLines);
  gl.drawElements(gl.LINES, iboLines.numberOfElements, gl.UNSIGNED_SHORT, 0);
}


function _createVertexData(vertices, indicesLines, indicesTris, callback) {

  // Kugel / Torus
  var n = 32;
  var m = 32;

  // Zylinder/Kegel
  // var n = 64;
  // var m = 12;

  // Positions.
  vertices = new Float32Array(3 * (n + 1) * (m + 1));

  // Index data.
  indicesLines = new Uint16Array(2 * 2 * n * m);
  indicesTris = new Uint16Array(3 * 2 * n * m);

  var du = 2 * Math.PI / n;
  var dv = Math.PI / m;

  // Zylinder / Kegel
  // var du = 2 * Math.PI / n;
  // var dv = 1 / m;

  // Kugel
  // var r = 0.6;

  // Torus
  var r = 0.3;
  var R = 0.5;

  // Counter for entries in index array.
  var iLines = 0;
  var iTris = 0;

  // Loop angle u
  for (var i = 0, u = Math.PI; i <= n; i++, u += du) {

    // Loop height v
    for (var j = 0, v = 0; j <= m; j++, v += dv) {

      var iVertex = i * (m + 1) + j;

      // Zylinder
      // var x = r * Math.cos(u);
      // var y = v - 0.5;
      // var z = Math.sin(u);

      // Kegel
      // var x = v * Math.cos(u);
      // var z = v * Math.sin(u);
      // var y = -v + 0.5; // v

      // Kugel
      // var x = r * Math.sin(v) * Math.cos(u);
      // var z = r * Math.cos(v);
      // var y = r * Math.sin(v) * Math.sin(u);

      // Torus
      var x = (R + r * Math.cos(u)) * Math.cos(v);
      var y = r * Math.sin(u);
      var z = (R + r * Math.cos(u)) * Math.sin(v);

      // Set vertex positions.
      vertices[iVertex * 3] = x;
      vertices[iVertex * 3 + 1] = y;
      vertices[iVertex * 3 + 2] = z;

      // Set index.
      // Line on beam.
      if (j > 0 && i > 0) {
        indicesLines[iLines++] = iVertex - 1;
        indicesLines[iLines++] = iVertex;
      }

      // Line on ring.
      if (j > 0 && i > 0) {
        indicesLines[iLines++] = iVertex - (m + 1);
        indicesLines[iLines++] = iVertex;
      }

      // Set index.
      // Two Triangles.
      if (j > 0 && i > 0) {
        indicesTris[iTris++] = iVertex;
        indicesTris[iTris++] = iVertex - 1;
        indicesTris[iTris++] = iVertex - (m + 1);
        //        
        indicesTris[iTris++] = iVertex - 1;
        indicesTris[iTris++] = iVertex - (m + 1) - 1;
        indicesTris[iTris++] = iVertex - (m + 1);
      }

    }

  }

  callback(vertices, indicesLines, indicesTris);

}
