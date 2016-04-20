camera.prototype= new worldObject;
function camera(parent)
{
	this.base = worldObject;
	this.base(parent);
	this.x = 0;
	this.z = 0;
	this.height = 0;
}

camera.prototype.draw = function()
{
	mat4.multiply(mvMatrix, this.localTransformation);

	setMatrixUniforms();

	//draws children
	for(var i =0; i< this.children.length; i++)
	{
		this.children[i].draw();
	}
}

camera.prototype.animate = function(elapsedTime)
{
	//animate children
	for(var i =0; i< this.children.length; i++)
	{
		this.children[i].animate();
	}
}