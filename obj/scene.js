/**
 * Created by Alexandre on 17/05/2016.
 */

var textureTerre;
var textureSoleil;
var textureLune;

var soleil;

function initWorldObjects()
{
    // Ca va être la zone ou on va développer le gestionnaire de scène (SceneManager)

    soleil = new sphere(null, -1);
    soleil.texture = textureSoleil;
    objects.push(soleil);

    terre = new sphere(soleil);
    terre.texture = textureTerre;
    terre.scale([0.75, 0.75, 0.75]);
    terre.translate([5, 0, 0]);
    objects.push(terre);

    lune = new sphere(terre);
    lune.texture = textureLune;
    lune.scale([0.5, 0.5, 0.5]);
    lune.translate([5,0,0]);
    objects.push(lune);

    return soleil;
}

//TEXTURES
function initTexture()
{
    // (SceneManager)
    texture0 = gl.createTexture();
    texture0.image = new Image();
    texture0.image.onload = function()
    {
        handleLoadedTexture(texture0)
    }
    texture0.image.src = "./img/earth.jpg"; // note : croos origin problem with chrome outside webserver

    textureTerre = gl.createTexture();
    textureTerre.image = new Image();
    textureTerre.image.onload = function()
    {
        handleLoadedTexture(textureTerre)
    }
    textureTerre.image.src = "./img/earth.jpg"; // note : croos origin problem with chrome outside webserver

    textureSoleil = gl.createTexture();
    textureSoleil.image = new Image();
    textureSoleil.image.onload = function()
    {
        handleLoadedTexture(textureSoleil)
    }
    textureSoleil.image.src = "./img/sun.jpg"; // note : croos origin problem with chrome outside webserver

    textureLune = gl.createTexture();
    textureLune.image = new Image();
    textureLune.image.onload = function()
    {
        handleLoadedTexture(textureLune)
    }
    textureLune.image.src = "./img/moon.gif"; // note : croos origin problem with chrome outside webserver
}

function drawScene()
{
    gl.viewport(0, 0, gl.viewportWidth, gl.viewportHeight);
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

    mat4.perspective(45, gl.viewportWidth / gl.viewportHeight, 0.1, 100.0, pMatrix);
    mat4.identity(mvMatrix);
    // Notons que la caméra est gérée à l'extérieur du SceneManager (avec des varriables générales) (SceneManager)
    mat4.rotate(mvMatrix, -camHeight, [1, 0, 0]);

    mat4.translate(mvMatrix, [camX, 0.0, camZ]);
    mat4.translate(mvMatrix, [0, 0.0, -10.0]);

    //////////////
    // Gestion de la lumière
    //////////////
    couleurLumiere=[0.9, 0.9, 0.9];
    couleurAmbiante=[0.1, 0.1, 0.2];
    positionLumiere=[0.0, 0.0, 0.0];
    // Envoi du paramêtre couleurAmbiante et couleurLumiere au shader
    gl.uniform3f(
        shaderProgram.ambientColorUniform, // Adresse récupéré dans initShader
        parseFloat(couleurAmbiante[0]),
        parseFloat(couleurAmbiante[1]),
        parseFloat(couleurAmbiante[2])
    );
    gl.uniform3f(
        shaderProgram.lightColorUniform, // Adresse récupéré dans initShader
        parseFloat(couleurLumiere[0]),
        parseFloat(couleurLumiere[1]),
        parseFloat(couleurLumiere[2])
    );

    // Envoi de du point au Shader
    gl.uniform3fv(shaderProgram.lightingLocationUniform, positionLumiere);

    // Code déplacé dans setUniforms
    //gl.activeTexture(gl.TEXTURE0);
    //gl.uniform1i(shaderProgram.samplerUniform, 0);

    soleil.draw();
}

function handleLoadedTexture(texture)
{
    gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
    gl.bindTexture(gl.TEXTURE_2D, texture);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, texture.image);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR_MIPMAP_NEAREST);
    gl.generateMipmap(gl.TEXTURE_2D);
    gl.bindTexture(gl.TEXTURE_2D, null);
}