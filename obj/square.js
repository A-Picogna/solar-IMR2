function square(parent)
	{
		this.base = worldObject;
		this.base (parent);
		this.vertexPositionBuffer = this.initVertexPositionBuffer();
		this.vertexTextureCoordBuffer = this.initTextureCoordPositionBuffer();
	}
	square.prototype= new worldObject;
	square.prototype.initVertexPositionBuffer = function()
	{
		var vertices = [
             1.0,  1.0,  0.0,//A
            -1.0,  1.0,  0.0,//B
             1.0, -1.0,  0.0,//C
			 -1.0,  1.0,  0.0,//B
             1.0, -1.0,  0.0,//C
            -1.0, -1.0,  0.0];//D
        vertexPositionBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, vertexPositionBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);
        vertexPositionBuffer.itemSize = 3;
        vertexPositionBuffer.numItems = 6;
		return vertexPositionBuffer;
	}
	square.prototype.initTextureCoordPositionBuffer = function()
	{
		var textureCoords = [
			1.0,  1.0,
			0,  1.0,
			1.0, 0,
			0,  1.0,
			1.0, 0,
			0, 0];
		vertexTextureCoordBuffer = gl.createBuffer();
		gl.bindBuffer(gl.ARRAY_BUFFER, vertexTextureCoordBuffer);
		gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(textureCoords), gl.STATIC_DRAW);
		vertexTextureCoordBuffer.itemSize = 2;
        vertexTextureCoordBuffer.numItems = 6;
		return vertexTextureCoordBuffer;
	}