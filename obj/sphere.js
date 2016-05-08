sphere.prototype = new worldObject;
	function sphere(parent)
	{
		this.base = worldObject;
		this.base(parent);
		var buffers = this.initBuffers();
		this.vertexPositionBuffer = buffers[0];
		this.vertexTextureCoordBuffer = buffers[1];
		this.vertexIndexBuffer = buffers[2];
		// Ajout du buffer des normales
		this.vertexNormalBuffer = buffers[3];
	}

	sphere.prototype.initBuffers = function()
	{	
		//il manque le code des normales à ajouter!
		normals = [];
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
				normals = vertices.concat(pol2Cart(longi, lat)); // On teste un truc
				//il manque le code des normales à ajouter!
				textureCoords = textureCoords.concat([longi/tetaMax, (90+lat)/(90+phiMax)]);
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

		vertexNormalBuffer = gl.createBuffer();
		gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER,vertexNormalBuffer);
		gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(normals), gl.STATIC_DRAW);
		vertexNormalBuffer.itemSize = 1;
		vertexNormalBuffer.numItems = vertexIndexBuffer.numItems;	
		//il manque le code des normales à ajouter!
		
		return [vertexPositionBuffer, vertexTextureCoordBuffer, vertexIndexBuffer];
	}