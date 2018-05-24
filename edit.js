function updateData() {
    var textColor = [];
    var text = [];
    var shapeColor = [];
    var shapeColorAsset = [];
    var assetText = [];
    var inputsText = $("#inputs .inputsTextData");
    if (inputsText.length) {
        inputsText.toArray();
        for(let i = 0;i<inputsText.length;i++)
        {
            text.push(inputsText[i].value);
        }
    }
    var assetsText = $("#inputs .inputsAssetData");
    if (assetsText.length) {
        assetsText.toArray();
        for(let i=0;i<assetsText.length;i++){
            assetText.push(assetsText[i].value);
        }
    }
    var inputsColorText = $("#inputs .inputsColorText");
    if (inputsColorText.length) {
        inputsColorText.toArray();
        for(let i =0;i<inputsColorText.length;i++){
            textColor.push(inputsColorText[i].value);
        }
    }
    var inputsColorShapes = $("#inputs .inputsColorShapes");
    if (inputsColorShapes.length) {
        inputsColorShapes.toArray();
        for(let i =0;i<inputsColorShapes.length;i++){
            shapeColor.push(inputsColorShapes[i].value);
        }
    }
    var inputsColorShapesAsset = $("#inputs .inputsColorShapesAsset");
    if (inputsColorShapesAsset.length) {
        inputsColorShapesAsset.toArray();
        for(let i=0;i<inputsColorShapesAsset.length;i++){
            shapeColorAsset.push(inputsColorShapesAsset[i].value)
        }
    }
    var n = 0;
    var nn = 0;
    var nnn=0;
    for(let i=0;i<podaci.layers.length;i++){
        let layer=podaci.layers[i];
        if (layer.shapes) {
            for(let j=0;j<layer.shapes.length;j++){
                let shape=layer.shapes[j];
                if(shape.it){
                    for(let k=0;k<shape.it.length;k++){
                        let prop=shape.it[k];
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
                    }
                }
            }
        }
    }
    if (podaci.assets) {
        for(let i=0;i<podaci.assets.length;i++){
            let asset=podaci.assets[i];
            if(asset.layers){
                for(let j=0;j<asset.layers.length;j++){
                    let layer=asset.layers[j];
                    if(layer.shapes){
                        for(let k=0;k<layer.shapes.length;k++){
                            let shape=layer.shapes[k];
                            if(shape.it){
                                for(let l=o;l<shape.it.length;l++){
                                    let prop = shape.it[l];
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
                                }
                            }
                        }
                    }
                }
            }
                  if (asset.w && asset.h && asset.p) {
                podaci.assets[i].u="";
                podaci.assets[i].p=assetText[nnn];
                podaci.assets[i].w=1920;
                podaci.assets[i].h=1080;
                nnn++;
            }
        }            
    }
    anim.destroy();
    start2();
    for(let i =0;i<text.length;i++){
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
    }
}