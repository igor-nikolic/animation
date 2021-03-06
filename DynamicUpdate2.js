var anim;
var podaci;
var innerHtml = "";
$.getJSON("download.json", function (data) {
    podaci = data;
    insertFields();
    start();    
});
function start() {
    var elem = document.getElementById("lottie");
    var animData = {
        container: elem,
        renderer: "svg",
        loop: true,
        autoplay: true,
        rendererSettings: {
            progressiveLoad: false,
            preserveAsceptRatio:'xMidYMid meet'
        },
        animationData: podaci
    };
    anim = lottie.loadAnimation(animData);
    console.log(anim);
}
//canvas
function start2() {
    var elem = document.getElementById("lottie");
    var kanvas = document.getElementById("kanvas");
    var ctx = kanvas.getContext("2d");
    var animData = {
        container: elem,
        renderer: "canvas",
        loop: true,
        autoplay: true,
        rendererSettings: {
            context: ctx,
            progressiveLoad: false,
            scaleMode: "noScale",
            preserveAsceptRatio:'xMidYMid meet',
            clearCanvas: true,
            hideOnTransparent: true,
            className: "nekaklasa"
        },
        animationData: podaci
    };
    anim = lottie.loadAnimation(animData);
}
$(document).on("click", "#btnUpdate", updateData);
$(document).on("click", "#btnStart", start);
$(document).on('click', '#btnDestroy', function () {
    anim.destroy();
});
function numHex(s) {
    var a = s.toString(16);
    if ((a.length % 2) > 0) { a = "0" + a; }
    return a;
}
function insertFields() {
    podaci.layers.forEach((layer, i) => {
        if (layer.t && layer.st >= 0) {
            innerHtml += "Layer: " + i + "<input type='text' class='inputsTextData' value='" + layer.t.d.k[0].s.t + "' size ='10'/>";
            if (layer.ef) {
                checkcolor(layer.ef, function (res) {
                    if (res) {
                        innerHtml += "if <input type='color' class='inputsColorText' value='" + getColor(res) + "'/><br/>";
                    }
                    else {
                        innerHtml += "else 1 <input type='color' class='inputsColorText' value='" + getColor(layer.t.d.k[0].s.fc) + "'/><br/>";
                    }
                });
            }
            else {
                innerHtml += "else 2<input type='color' class='inputsColorText' value='" + getColor(layer.t.d.k[0].s.fc) + "'/><br/>";
            }
        }

        //boje
        if (layer.shapes) {
            layer.shapes.forEach((shape, j) => {
                if (shape.it) {
                    shape.it.forEach((prop, k) => {
                        if (['fl', 'st'].includes(prop.ty)) {
                            innerHtml += prop.nm + " : <input type='color' class ='inputsColorShapes' value='" + getColor(prop.c.k) + "'/> &nbsp;&nbsp;";
                        }
                    });
                }
            });
        }
    });
    if (podaci.assets) {
        podaci.assets.forEach((asset, i) => {
            if (asset.layers) {
                asset.layers.forEach((layer, j) => {
                    if (layer.shapes) {
                        layer.shapes.forEach((shape, k) => {
                            if (shape.it) {
                                shape.it.forEach((prop, l) => {
                                    if (['fl', 'st'].includes(prop.ty)) {
                                        innerHtml += prop.nm + " <input type='color' class ='inputsColorShapesAsset' value='" + getColor(prop.c.k) + "'/> &nbsp;&nbsp;";
                                    }
                                });
                            }
                        });
                    }
                });
            }
            if (asset.w && asset.h && asset.p) {
                innerHtml += "Photo dimensions: Width(" + asset.w + ") | Height(" + asset.h + ")<input type='text' class='inputsAssetData' value='" + asset.p + "'/>";
            }

        });
    }
    if (innerHtml !== "") {
        $('#inputs').html(innerHtml + "<button type='button' id='btnUpdate'>Update data</button>");
    }
}
function getColor(boja) {
    let R = boja[0];
    let G = boja[1];
    let B = boja[2];
    R = Math.round(R * 255);
    G = Math.round(G * 255);
    B = Math.round(B * 255);
    let color = "#" + numHex(R) + numHex(G) + numHex(B);
    return color;
}
function checkcolor(obj, callback) {
    (function eachRecursive(obj) {
        for (var prop in obj) {
            if (typeof obj[prop] == "object")
                eachRecursive(obj[prop]);
            else {
                if (obj[prop] == 'Color') {
                    if (obj.v.k) {
                        return callback(obj.v.k);
                    } else {
                        return callback(false);
                    }
                }
            }
        }
    }(obj))
}

//function for updating data
function updateData() {
    var textColor = [];
    var text = [];
    var shapeColor = [];
    var shapeColorAsset = [];
    var assetText = [];
    var inputsText = $("#inputs .inputsTextData");
    if (inputsText.length) {
        inputsText.toArray().forEach(element => {
            text.push(element.value);
        });
    }
    var assetsText = $("#inputs .inputsAssetData");
    if (assetsText.length) {
        assetsText.toArray().forEach(element => {
            assetText.push(element.value);
        });
    }
    var inputsColorText = $("#inputs .inputsColorText");
    if (inputsColorText.length) {
        inputsColorText.toArray().forEach(element => {
            textColor.push(element.value);
        });
    }
    var inputsColorShapes = $("#inputs .inputsColorShapes");
    if (inputsColorShapes.length) {
        inputsColorShapes.toArray().forEach(element => {
            shapeColor.push(element.value);
        });
    }
    var inputsColorShapesAsset = $("#inputs .inputsColorShapesAsset");
    if (inputsColorShapesAsset.length) {
        inputsColorShapesAsset.toArray().forEach(element => {
            shapeColorAsset.push(element.value);
        });
    }

    var n = 0;
    var nn = 0;
    var nnn=0;
    podaci.layers.forEach((layer, i) => {
        // if (layer.t) {
        // var clrarray = [];
        // let R = parseInt(texts[brojac].substr(1, 2), 16);
        // let G = parseInt(texts[brojac].substr(3, 2), 16);
        // let B = parseInt(texts[brojac].substr(5, 2), 16);
        // R = R / 255;
        // G = G / 255;
        // B = B / 255;
        // clrarray.push(R, G, B, 1); 
        // }
        if (layer.shapes) {
            layer.shapes.forEach((shape, j) => {
                if (shape.it)
                    shape.it.forEach((prop, k) => {
                        if (['fl', 'st'].includes(prop.ty)) {
                            var clrarray = [];
                            let R = parseInt(shapeColor[n].substr(1, 2), 16);
                            let G = parseInt(shapeColor[n].substr(3, 2), 16);
                            let B = parseInt(shapeColor[n].substr(5, 2), 16);
                            R = R / 255;
                            G = G / 255;
                            B = B / 255;
                            clrarray.push(R, G, B, 1);
                            podaci.layers[i].shapes[j].it[k].c.k = clrarray;
                            n++;
                        }
                    });
            });
        }

    });
    if (podaci.assets) {
        podaci.assets.forEach((asset, i) => {
            if (asset.layers) {
                asset.layers.forEach((layer, j) => {
                    if (layer.shapes) {
                        layer.shapes.forEach((shape, k) => {
                            if (shape.it)
                                shape.it.forEach((prop, l) => {
                                    if (['fl', 'st'].includes(prop.ty)) {
                                        var clrarray = [];
                                        let R = parseInt(shapeColorAsset[nn].substr(1, 2), 16);
                                        let G = parseInt(shapeColorAsset[nn].substr(3, 2), 16);
                                        let B = parseInt(shapeColorAsset[nn].substr(5, 2), 16);
                                        R = R / 255;
                                        G = G / 255;
                                        B = B / 255;
                                        clrarray.push(R, G, B, 1);
                                        podaci.assets[i].layers[j].shapes[k].it[l].c.k = clrarray;
                                        nn++;
                                    }
                                });
                        });
                    }
                });
            }
            if (asset.w && asset.h && asset.p) {
                podaci.assets[i].u="";
                podaci.assets[i].p=assetText[nnn];
                podaci.assets[i].w=1920;
                podaci.assets[i].h=1080;
                nnn++;
            }
        });
    }
    anim.destroy();
    start2();
    text.forEach((element, i) => {
        var clrarray = [];
        let R = parseInt(textColor[i].substr(1, 2), 16);
        let G = parseInt(textColor[i].substr(3, 2), 16);
        let B = parseInt(textColor[i].substr(5, 2), 16);
        R = R / 255;
        G = G / 255;
        B = B / 255;
        clrarray.push(R, G, B, 1);
        anim.renderer.elements[i].updateDocumentData(
            { t: element, fc: clrarray },
            0
        );
    });
}


