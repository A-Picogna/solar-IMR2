
//INITWORLD
function worldObject(parent)
{
    this.localTransformation = mat4.create();
    this.revolutionTransformation = mat4.create();
    this.rotationTransformation = mat4.create();
    this.children = [];
    this.vertexPositionBuffer = null;
    this.vertexTextureCoordBuffer = null;
    this.vertexIndexBuffer = null;
    this.toggled = true;
    this.vertexNormalBuffer = null;
    this.texture = null;
    this.vitesseRevolution = 0;
    this.vitesseRotation = 0;
    this.sensDeRotation = 1;
    mat4.identity(this.localTransformation);
    mat4.identity(this.revolutionTransformation);
    mat4.identity(this.rotationTransformation);
    if(parent != null) parent.addChild(this);
}

worldObject.prototype.addChild = function(child)
{
    this.children.push(child);
}

worldObject.prototype.translate = function(translation)
{
    mat4.translate(this.localTransformation, translation);
}

worldObject.prototype.orbite = function (rotation, axis) {
    mat4.rotate(this.revolutionTransformation, rotation, axis);
};

worldObject.prototype.rotation = function (rotation, axis) {
    mat4.rotate(this.rotationTransformation, rotation, axis);
};

worldObject.prototype.scale = function(scale)
{
    mat4.scale(this.localTransformation, scale);
}

worldObject.prototype.draw = function()
{
    if(this.toggled)
    {
        if(this.texture != null)
        {
            //gl.activeTexture(this.texture.getbind());
            gl.activeTexture(gl.TEXTURE0);
            gl.bindTexture(gl.TEXTURE_2D, this.texture);
            gl.uniform1i(shaderProgram.samplerUniform, this.texture.bindNumber);
        }

        //on utilise les push matrix pour les rotations des planètes à des vitesss différentes
        mvPushMatrix();
        mat4.multiply(mvMatrix, this.revolutionTransformation); // gère la revolution autour du soleil
        mat4.multiply(mvMatrix, this.localTransformation); // gere la translation par rapport au soleil
        mvPushMatrix();
        mat4.multiply(mvMatrix, this.rotationTransformation); // gere la roation de l'astre sur lui même

        gl.bindBuffer(gl.ARRAY_BUFFER, this.vertexPositionBuffer);
        gl.vertexAttribPointer(shaderProgram.vertexPositionAttribute, this.vertexPositionBuffer.itemSize, gl.FLOAT, false, 0, 0);

        gl.bindBuffer(gl.ARRAY_BUFFER, this.vertexTextureCoordBuffer);
        gl.vertexAttribPointer(shaderProgram.textureCoordAttribute, this.vertexTextureCoordBuffer.itemSize, gl.FLOAT, false, 0, 0);

        setMatrixUniforms();

        //if(this.vertexNormalBuffer != null) {
        gl.bindBuffer(gl.ARRAY_BUFFER, this.vertexNormalBuffer);
        gl.vertexAttribPointer(shaderProgram.vertexNormalAttribute, this.vertexNormalBuffer.itemSize, gl.FLOAT, false, 0, 0);
        //}

        if(this.vertexIndexBuffer == null)
        {
            gl.drawArrays(drawStyle, 0, this.vertexPositionBuffer.numItems);
        }
        else
        {
            gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.vertexIndexBuffer);
            gl.drawElements(drawStyle, this.vertexIndexBuffer.numItems, gl.UNSIGNED_SHORT, 0);
        }

        mvPopMatrix();

        //draws children
        for(var i =0; i< this.children.length; i++)
        {
            this.children[i].draw();
        }
        mvPopMatrix();
    }
}

worldObject.prototype.animate = function(elapsedTime)
{
    //animate children
    for(var i =0; i< this.children.length; i++)
    {
        this.children[i].animate(elapsedTime);
    }
    this.orbite(this.vitesseRevolution , [0, 1, 0]);
    this.rotation(this.vitesseRotation , [0, this.sensDeRotation, 0]);
}