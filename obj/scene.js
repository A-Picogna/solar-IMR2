/**
 * Created by Alexandre on 17/05/2016.
 */

var textureTerre;
var textureSoleil;
var textureLune;
var textureMercure;
var textureVenus;
var textureMars;
var textureJupiter;
var textureSaturne;
var textureUranus;
var textureNeptune;

var soleil;

var planetesData;

function getJsonData(url){
    var resGetJson = null;
    $.ajaxSetup({
        async: false
    });
    $.getJSON(url, function(data) {
        resGetJson = data;
    });
    $.ajaxSetup({
        async: true
    });
    return resGetJson;
}

function initWorldObjects()
{
    // Ca va être la zone ou on va développer le gestionnaire de scène (SceneManager)
    var resizeValue; // on redimenssione les astres pour garder une certaine proportionnalité sans être vraiment à l"échelle
    var translateValue; // la distance est aussi redécrite avec les distance réèles, mais on triche un peu pour éviter que les planetes gazeuses ne soient trop loin
    var terreTranslateValue = 20; // valeur de translation de la terre, valeur de référence

    planetesData = getJsonData("./obj/planetesData.json");
    var refVitesseRevolution = 0.0001; // ce sera la vitesse de revolution de la terre en 365.36 jours, on calcule donc les autres vitesse proportionellement
    var refVitesseRotation = 0.01 // ce sera la vitesse de rotation de la terre en 1 jour, on calcule le reste proportionnelement

    /* On admet que la vitesse de révolution et rotation sont indépendantes pour la démonstration
    dans l'idéal d'un modèle proportionnel, la vitesse de revolution devrait directement dépendre de la vitesse de rotation
     */

    soleil = new sphere(null, -1);
    soleil.texture = textureSoleil;
    soleil.vitesseRotation = refVitesseRotation/planetesData.soleil.periodeDeRotation ;
    objects.push(soleil);

    terre = new sphere(soleil);
    terre.texture = textureTerre;
    soleil.vitesseRotation = refVitesseRotation;
    soleil.vitesseRevolution = refVitesseRevolution;
    resizeValue = Math.pow( (planetesData.terre.diametreEquatorial/planetesData.soleil.diametreEquatorial) , 1/10);
    terre.scale([resizeValue, resizeValue, resizeValue]);
    terre.translate([terreTranslateValue, 0, 0]);
    objects.push(terre);

    lune = new sphere(terre);
    lune.texture = textureLune;
    lune.vitesseRotation = refVitesseRotation*(planetesData.terre.periodeDeRotation/planetesData.lune.periodeDeRotation);
    lune.vitesseRevolution = refVitesseRevolution*(planetesData.terre.periodeDeRevolution/planetesData.lune.periodeDeRevolution);
    resizeValue = Math.pow( (planetesData.lune.diametreEquatorial/planetesData.terre.diametreEquatorial) , 1/2);
    lune.scale([resizeValue, resizeValue, resizeValue]);
    lune.translate([5,0,0]);
    objects.push(lune);

    // PLANETES TELLURIQUES

    mercure = new sphere(soleil);
    mercure.texture = textureMercure;
    mercure.vitesseRotation = refVitesseRotation*(planetesData.terre.periodeDeRotation/planetesData.mercure.periodeDeRotation);
    mercure.vitesseRevolution = refVitesseRevolution*(planetesData.terre.periodeDeRevolution/planetesData.mercure.periodeDeRevolution);
    resizeValue = Math.pow( (planetesData.mercure.diametreEquatorial/planetesData.soleil.diametreEquatorial) , 1/10);
    mercure.scale([resizeValue, resizeValue, resizeValue]);
    translateValue = Math.pow( (planetesData.mercure.demiGrandAxe) , 1/1) * terreTranslateValue;
    mercure.translate([translateValue,0,0]);
    objects.push(mercure);

    venus = new sphere(soleil);
    venus.texture = textureVenus;
    venus.sensDeRotation = -1; // venus est la seule planete du systeme solaire à tournée dans le sens inverse des autres.
    // pour observer le sens inverse de rotation de venus, il faut mettre une vitesse de révolution très lente, par exemple 0.000001 et augmenter la vitesse de rotation, par exemple 0.1
    venus.vitesseRotation = refVitesseRotation*(planetesData.terre.periodeDeRotation/planetesData.venus.periodeDeRotation);
    venus.vitesseRevolution = refVitesseRevolution*(planetesData.terre.periodeDeRevolution/planetesData.venus.periodeDeRevolution);
    resizeValue = Math.pow( (planetesData.venus.diametreEquatorial/planetesData.soleil.diametreEquatorial) , 1/10);
    venus.scale([resizeValue, resizeValue, resizeValue]);
    translateValue = Math.pow( (planetesData.venus.demiGrandAxe) , 1/1) * terreTranslateValue;
    venus.translate([translateValue,0,0]);
    objects.push(venus);

    mars = new sphere(soleil);
    mars.texture = textureMars;
    mars.vitesseRotation = refVitesseRotation*(planetesData.terre.periodeDeRotation/planetesData.mars.periodeDeRotation);
    mars.vitesseRevolution = refVitesseRevolution*(planetesData.terre.periodeDeRevolution/planetesData.mars.periodeDeRevolution);
    resizeValue = Math.pow( (planetesData.mars.diametreEquatorial/planetesData.soleil.diametreEquatorial) , 1/10);
    mars.scale([resizeValue, resizeValue, resizeValue]);
    translateValue = Math.pow( (planetesData.mars.demiGrandAxe) , 1/1) * terreTranslateValue;
    console.log(translateValue);
    mars.translate([translateValue,0,0]);
    objects.push(mars);

    // PLANETES GAZEUSES

    jupiter = new sphere(soleil);
    jupiter.texture = textureJupiter;
    jupiter.vitesseRotation = refVitesseRotation*(planetesData.terre.periodeDeRotation/planetesData.jupiter.periodeDeRotation);
    jupiter.vitesseRevolution = refVitesseRevolution*(planetesData.terre.periodeDeRevolution/planetesData.jupiter.periodeDeRevolution);
    resizeValue = Math.pow( (planetesData.jupiter.diametreEquatorial/planetesData.soleil.diametreEquatorial) , 1/10);
    jupiter.scale([resizeValue, resizeValue, resizeValue]);
    translateValue = Math.pow( (planetesData.jupiter.demiGrandAxe) , 1/3) * terreTranslateValue;
    jupiter.translate([translateValue,0,0]);
    objects.push(jupiter);

    saturne = new sphere(soleil);
    saturne.texture = textureSaturne;
    saturne.vitesseRotation = refVitesseRotation*(planetesData.terre.periodeDeRotation/planetesData.saturne.periodeDeRotation);
    saturne.vitesseRevolution = refVitesseRevolution*(planetesData.terre.periodeDeRevolution/planetesData.saturne.periodeDeRevolution);
    resizeValue = Math.pow( (planetesData.saturne.diametreEquatorial/planetesData.soleil.diametreEquatorial) , 1/10);
    saturne.scale([resizeValue, resizeValue, resizeValue]);
    translateValue = Math.pow( (planetesData.saturne.demiGrandAxe) , 1/3) * terreTranslateValue;
    saturne.translate([translateValue,0,0]);
    objects.push(saturne);


    uranus = new sphere(soleil);
    uranus.texture = textureUranus;
    uranus.vitesseRotation = refVitesseRotation*(planetesData.terre.periodeDeRotation/planetesData.uranus.periodeDeRotation);
    uranus.vitesseRevolution = refVitesseRevolution*(planetesData.terre.periodeDeRevolution/planetesData.uranus.periodeDeRevolution);
    resizeValue = Math.pow( (planetesData.uranus.diametreEquatorial/planetesData.soleil.diametreEquatorial) , 1/10);
    uranus.scale([resizeValue, resizeValue, resizeValue]);
    translateValue = Math.pow( (planetesData.uranus.demiGrandAxe) , 1/3) * terreTranslateValue;
    uranus.translate([translateValue,0,0]);
    objects.push(uranus);

    neptune = new sphere(soleil);
    neptune.texture = textureNeptune;
    neptune.vitesseRotation = refVitesseRotation*(planetesData.terre.periodeDeRotation/planetesData.neptune.periodeDeRotation);
    neptune.vitesseRevolution = refVitesseRevolution*(planetesData.terre.periodeDeRevolution/planetesData.neptune.periodeDeRevolution);
    resizeValue = Math.pow( (planetesData.neptune.diametreEquatorial/planetesData.soleil.diametreEquatorial) , 1/10);
    neptune.scale([resizeValue, resizeValue, resizeValue]);
    translateValue = Math.pow( (planetesData.neptune.demiGrandAxe) , 1/3) * terreTranslateValue;
    neptune.translate([translateValue,0,0]);
    objects.push(neptune);


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
    texture0.image.src = "./img/earth.jpg";

    textureTerre = gl.createTexture();
    textureTerre.image = new Image();
    textureTerre.image.onload = function()
    {
        handleLoadedTexture(textureTerre)
    }
    textureTerre.image.src = "./img/earth.jpg";

    textureSoleil = gl.createTexture();
    textureSoleil.image = new Image();
    textureSoleil.image.onload = function()
    {
        handleLoadedTexture(textureSoleil)
    }
    textureSoleil.image.src = "./img/sun.jpg";

    textureLune = gl.createTexture();
    textureLune.image = new Image();
    textureLune.image.onload = function()
    {
        handleLoadedTexture(textureLune)
    }
    textureLune.image.src = "./img/moon.gif";

    textureMercure = gl.createTexture();
    textureMercure.image = new Image();
    textureMercure.image.onload = function()
    {
        handleLoadedTexture(textureMercure)
    }
    textureMercure.image.src = "./img/mercure.jpg";

    textureVenus = gl.createTexture();
    textureVenus.image = new Image();
    textureVenus.image.onload = function()
    {
        handleLoadedTexture(textureVenus)
    }
    textureVenus.image.src = "./img/venus.jpg";

    textureMars = gl.createTexture();
    textureMars.image = new Image();
    textureMars.image.onload = function()
    {
        handleLoadedTexture(textureMars)
    }
    textureMars.image.src = "./img/mars.jpg";

    textureJupiter = gl.createTexture();
    textureJupiter.image = new Image();
    textureJupiter.image.onload = function()
    {
        handleLoadedTexture(textureJupiter)
    }
    textureJupiter.image.src = "./img/jupiter.jpg";

    textureSaturne = gl.createTexture();
    textureSaturne.image = new Image();
    textureSaturne.image.onload = function()
    {
        handleLoadedTexture(textureSaturne)
    }
    textureSaturne.image.src = "./img/saturn.png";


    textureUranus = gl.createTexture();
    textureUranus.image = new Image();
    textureUranus.image.onload = function()
    {
        handleLoadedTexture(textureUranus)
    }
    textureUranus.image.src = "./img/uranus.jpg";

    textureNeptune = gl.createTexture();
    textureNeptune.image = new Image();
    textureNeptune.image.onload = function()
    {
        handleLoadedTexture(textureNeptune)
    }
    textureNeptune.image.src = "./img/neptune.jpg";

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