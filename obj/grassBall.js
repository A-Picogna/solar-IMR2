grassBall.prototype= new worldObject;
	function grassBall(parent)
	{
		this.base = worldObject;
		this.base (parent);
		var buffers = this.initBuffers();
		//this.vertexPositionBuffer = this.initVertexPositionBuffer();
		//this.vertexTextureCoordBuffer = this.initTextureCoordPositionBuffer();
		this.vertexPositionBuffer = buffers[0];
		this.vertexTextureCoordBuffer = buffers[1];
		this.vertexIndexBuffer = buffers[2];
	}

	grassBall.prototype.initBuffers = function()
	{
		vertexPositionBuffer = gl.createBuffer();
		vertexTextureCoordBuffer = gl.createBuffer();
		vertexIndexBuffer = gl.createBuffer();

		vertices = [];
        textureCoords = [];
		var nbVertice = 0;
		var sphereVertexIndices = [];
		var nbTriangles = 0;
		var resLat = 0;
		var resLongi = tetaMax/pasLong+1;
		for (var lat=-90; lat <= phiMax; lat+=pasLat)
		{
			for (var longi=0; longi <= tetaMax; longi+=pasLong)
            {
				vertices = vertices.concat(pol2Cart(longi, lat)); //A

				textureCoords = textureCoords.concat([10*longi/tetaMax, 10*(90+lat)/(90+phiMax)]);
				if(longi != tetaMax)
				{
					if(lat < phiMax)
					{
						sphereVertexIndices = sphereVertexIndices.concat([
							nbVertice,
							nbVertice+1,
							nbVertice+1+resLongi,

							nbVertice,
							nbVertice+1+resLongi,
							nbVertice+resLongi,
						]);

						nbTriangles+=2;
					}
				}
				nbVertice +=1;
			}
			resLat++;
        }

		vertexPositionBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, vertexPositionBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);
        vertexPositionBuffer.itemSize = 3;
        vertexPositionBuffer.numItems = nbVertice;

		vertexIndexBuffer = gl.createBuffer();
		gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, vertexIndexBuffer);
		gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(sphereVertexIndices), gl.STATIC_DRAW);
		vertexIndexBuffer.itemSize = 1;
		vertexIndexBuffer.numItems = nbTriangles*3;

		vertexTextureCoordBuffer = gl.createBuffer();
		gl.bindBuffer(gl.ARRAY_BUFFER, vertexTextureCoordBuffer);
		gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(textureCoords), gl.STATIC_DRAW);
		vertexTextureCoordBuffer.itemSize = 2;
		vertexTextureCoordBuffer.numItems = nbVertice;
		return [vertexPositionBuffer, vertexTextureCoordBuffer, vertexIndexBuffer];
	}