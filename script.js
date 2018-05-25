var anim;
var JSONdata;
var innerHtml = "";
$.getJSON("animations/share.json", function (data) {
    console.log('json loaded');
    JSONdata = data;
    insertFields();
    start2();    
});
function start() {//this is svg renderer
    var elem = document.getElementById("lottie");
    var animData = {
        container: elem,
        renderer: "svg",
        loop: true,
        autoplay: true,
        rendererSettings: {
            progressiveLoad: false,
            preserveAsceptRatio: 'xMidYMid meet'
        },
        animationData: JSONdata
    };
    anim = lottie.loadAnimation(animData);
    console.log(anim);
}

function start2() { //this is canvas renderer
    var elem = document.getElementById("lottie");
    var kanvas = document.getElementById("cnvs");
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
            preserveAsceptRatio: 'xMidYMid meet',
            clearCanvas: true,
            hideOnTransparent: true,
            className: "classForCanvas"
        },
        animationData: JSONdata
    };
    anim = lottie.loadAnimation(animData);
}
$(document).on("click", "#btnUpdate", updateData);
$(document).on("click", "#btnStart", start);
$(document).on('click', '#btnDestroy', function () {
    anim.destroy();
});
function numHex(s) {
    let a = s.toString(16);
    if ((a.length % 2) > 0) { a = "0" + a; }
    return a;
}
function insertFields() {
    if (JSONdata.layers) {
        for (let i = 0; i < JSONdata.layers.length; i++) {
            let layer = JSONdata.layers[i];
            if (layer.t && layer.st >= 0) {
                innerHtml += "Text: " + i + "<input type='text' class='inputsTextData' value='" + layer.t.d.k[0].s.t + "' size ='10'/>";
                // if (layer.ef) {
                //     checkcolor(layer.ef, function (res) {
                //         if (res) {
                //             innerHtml += "1<input type='color' class='inputsColorText' value='" + getColor(res) + "'/><br/>";
                //         }
                //         else {
                //             innerHtml += "2<input type='color' class='inputsColorText' value='" + getColor(layer.t.d.k[0].s.fc) + "'/><br/>";
                //         }
                //     });
                // }
                // else {
                        innerHtml += "<input type='color' class='inputsColorText' value='" + getColor(layer.t.d.k[0].s.fc) + "'/><br/>";                    
                // }
            }
            if (layer.shapes) {
                for (let j = 0; j < layer.shapes.length; j++) {
                    let shape = layer.shapes[j];
                    if (shape.it) {
                        for (let k = 0; k < shape.it.length; k++) {
                            let prop = shape.it[k];
                            if (['fl', 'st'].includes(prop.ty)) {
                                if (typeof prop.c.k[0] == 'number') {
                                    innerHtml += prop.nm + " : <input type='color' class ='inputsColorShapes' value='" + getColor(prop.c.k) + "'/> &nbsp;&nbsp;";
                                }
                            }
                        }
                    }
                }
            }
        }
    }
    if (JSONdata.assets) {
        for (let i = 0; i < JSONdata.assets.length; i++) {
            let asset = JSONdata.assets[i];
            if (asset.layers) {
                for (let j = 0; j < asset.layers.length; j++) {
                    let layer = asset.layers[j];
                    if (layer.shapes) {
                        for (let k = 0; k < layer.shapes.length; k++) {
                            let shape = layer.shapes[k];
                            if (shape.it) {
                                for (let l = 0; l < shape.it.length; l++) {
                                    let prop = shape.it[l];
                                    if (['fl', 'st'].includes(prop.ty)) {
                                        if (typeof prop.c.k[0] == 'number') {
                                            innerHtml += prop.nm + " <input type='color' class ='inputsColorShapesAsset' value='" + getColor(prop.c.k) + "'/> &nbsp;&nbsp;";
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
            //check for photos

            // if (asset.w && asset.h && asset.p) {
            //     innerHtml += "Photo dimensions: Width(" + asset.w + ") | Height(" + asset.h + ")<input type='text' class='inputsAssetData' value='" + asset.p + "'/>";
            // }

        }
    }
    if (innerHtml !== "") {
        $('#inputs').html(innerHtml + "<button type='button' id='btnUpdate'>Update data</button>");
    }
}
function getColor(color) {
    let R = color[0];
    let G = color[1];
    let B = color[2];
    R = Math.round(R * 255);
    G = Math.round(G * 255);
    B = Math.round(B * 255);
    let colorHex = "#" + numHex(R) + numHex(G) + numHex(B);
    return colorHex;
}
function checkcolor(obj, callback) {
    (function eachRecursive(obj) {
        for (let prop in obj) {
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
        inputsText.toArray();
        for (let i = 0; i < inputsText.length; i++) {
            text.push(inputsText[i].value);
        }
    }
    var assetsText = $("#inputs .inputsAssetData");
    if (assetsText.length) {
        assetsText.toArray();
        for (let i = 0; i < assetsText.length; i++) {
            assetText.push(assetsText[i].value);
        }
    }
    var inputsColorText = $("#inputs .inputsColorText");
    if (inputsColorText.length) {
        inputsColorText.toArray();
        for (let i = 0; i < inputsColorText.length; i++) {
            textColor.push(inputsColorText[i].value);
        }
    }
    var inputsColorShapes = $("#inputs .inputsColorShapes");
    if (inputsColorShapes.length) {
        inputsColorShapes.toArray();
        for (let i = 0; i < inputsColorShapes.length; i++) {
            shapeColor.push(inputsColorShapes[i].value);
        }
    }
    var inputsColorShapesAsset = $("#inputs .inputsColorShapesAsset");
    if (inputsColorShapesAsset.length) {
        inputsColorShapesAsset.toArray();
        for (let i = 0; i < inputsColorShapesAsset.length; i++) {
            shapeColorAsset.push(inputsColorShapesAsset[i].value)
        }
    }
    for (let i = 0,cnt=0; i < JSONdata.layers.length; i++) {
        let layer = JSONdata.layers[i];
        if (layer.shapes) {
            for (let j = 0; j < layer.shapes.length; j++) {
                let shape = layer.shapes[j];
                if (shape.it) {
                    for (let k = 0; k < shape.it.length; k++) {
                        let prop = shape.it[k];
                        if (['fl', 'st'].includes(prop.ty)) {
                            if (typeof prop.c.k[0] == 'number') {
                                let clrarray = [];
                                let R = parseInt(shapeColor[cnt].substr(1, 2), 16);
                                let G = parseInt(shapeColor[cnt].substr(3, 2), 16);
                                let B = parseInt(shapeColor[cnt].substr(5, 2), 16);
                                R = R / 255;
                                G = G / 255;
                                B = B / 255;
                                clrarray.push(R, G, B, 1);
                                JSONdata.layers[i].shapes[j].it[k].c.k = clrarray;
                                cnt++;
                            }

                        }
                    }
                }
            }
        }
    }

    if (JSONdata.assets) {
        for (let i = 0,cnt=0,cnt2=0; i < JSONdata.assets.length; i++) {
            let asset = JSONdata.assets[i];
            if (asset.layers) {
                for (let j = 0; j < asset.layers.length; j++) {
                    let layer = asset.layers[j];
                    if (layer.shapes) {
                        for (let k = 0; k < layer.shapes.length; k++) {
                            let shape = layer.shapes[k];
                            if (shape.it) {
                                for (let l = 0; l < shape.it.length; l++) {
                                    let prop = shape.it[l];
                                    if (['fl', 'st'].includes(prop.ty)) {
                                        if (typeof prop.c.k[0] == 'number') {
                                            let clrarray = [];
                                            let R = parseInt(shapeColorAsset[cnt].substr(1, 2), 16);
                                            let G = parseInt(shapeColorAsset[cnt].substr(3, 2), 16);
                                            let B = parseInt(shapeColorAsset[cnt].substr(5, 2), 16);
                                            R = R / 255;
                                            G = G / 255;
                                            B = B / 255;
                                            clrarray.push(R, G, B, 1);
                                            JSONdata.assets[i].layers[j].shapes[k].it[l].c.k = clrarray;
                                            cnt++;
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
            //update photo

            // if (asset.w && asset.h && asset.p) {
            //     JSONdata.assets[i].u = "";
            //     JSONdata.assets[i].p = assetText[cnt2];
            //     JSONdata.assets[i].w = 1920;
            //     JSONdata.assets[i].h = 1080;
            //     cnt2++;
            // }

        }
    }
    anim.destroy();
    start2();
    anim.addEventListener('DOMLoaded', function () {
        for (let i = 0,cnt=0; i < JSONdata.layers.length; i++) {
            let layer = JSONdata.layers[i];
            if (layer.t && layer.st >= 0) {
                let clrarray = [];
                let R = parseInt(textColor[cnt].substr(1, 2), 16);
                let G = parseInt(textColor[cnt].substr(3, 2), 16);
                let B = parseInt(textColor[cnt].substr(5, 2), 16);
                R = R / 255;
                G = G / 255;
                B = B / 255;
                clrarray.push(R, G, B, 1);
                anim.renderer.elements[i].updateDocumentData(
                    { t: text[cnt], fc: clrarray },
                    0
                );
                cnt++;
            }
        }
    });
}