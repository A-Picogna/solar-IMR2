triangle.prototype = new worldObject;

function triangle(parent)
{
	this.base = worldObject;
	this.base (parent);
	this.vertexPositionBuffer = this.initVertexPositionBuffer();
	this.vertexTextureCoordBuffer = this.initTextureCoordPositionBuffer();
	this.vertexNormalBuffer = this.initVertexNormalBuffer();
}
triangle.prototype.initVertexPositionBuffer = function()
{
	var vertices = [
		 0.0,  1.0,  0.0,
		-1.0, -1.0,  0.0,
		 1.0, -1.0,  0.0];
	var vertexPositionBuffer = gl.createBuffer();
	gl.bindBuffer(gl.ARRAY_BUFFER, vertexPositionBuffer);
	gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);
	vertexPositionBuffer.itemSize = 3;
	vertexPositionBuffer.numItems = 3;
	return vertexPositionBuffer;
}
triangle.prototype.initTextureCoordPositionBuffer = function()
{
	var textureCoords = [
		1.0, 0.0,
		0.0, 1.0,
		0.0, 0.0,];
	vertexTextureCoordBuffer = gl.createBuffer();
	gl.bindBuffer(gl.ARRAY_BUFFER, vertexTextureCoordBuffer);
	gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(textureCoords), gl.STATIC_DRAW);
	vertexTextureCoordBuffer.itemSize = 2;
	vertexTextureCoordBuffer.numItems = 3;
	return vertexTextureCoordBuffer;
}
triangle.prototype.initVertexNormalBuffer = function()
{
	var normals = [
		0.0,  0.0,  1.0,
		0.0,  0.0,  1.0,
		0.0,  0.0,  1.0];
	vertexNormalBuffer = gl.createBuffer();
	gl.bindBuffer(gl.ARRAY_BUFFER, vertexNormalBuffer);
	gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(normals), gl.STATIC_DRAW);
	vertexNormalBuffer.itemSize = 3;
	vertexNormalBuffer.numItems = 3;
	return vertexNormalBuffer;
}