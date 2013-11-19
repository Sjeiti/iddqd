// todo: document
/**
 * A color object to do color calculations
 * @name iddqd.math.color
 * @method
 * @param {Number} x
 * @returns {colorInstance}
 */
iddqd.ns('iddqd.math.color',function(undefined){
	'use strict';
	var oReturn = {
			 integer: undefined
			,r: undefined
			,g: undefined
			,b: undefined
			,hex: undefined
			,get: getColor
			,set: setColor
			,randomize: randomize
			,clone: clone
			,rgba: rgba
			,add: addColor
			,subtract: subtract
			,average: average
			,multiply: multiply
			,divide: divide
			,brightness: brightness
			,huey: huey
			,saturation: saturation
			,lightness: lightness
			,toString: function(){return iA===1?oReturn.hex:oReturn.rgba;}
		}
		//
		,fBr = 0.241
		,fBg = 0.691
		,fBb = 0.068
		//
		,iClr = 0
		,iLen = 6
		,FF = Math.pow(2,8)-1
		//,FFFFFF = Math.pow(2,24)-1
		//
		,iR = arguments[0]||0
		,iG = arguments[1]||0
		,iB = arguments[2]||0
		,iA = arguments[3]|1
		//
		,fR = iR/255
		,fG = iG/255
		,fB = iB/255
		//,fA = iA/255
		//
		,bHSL = false
		,fH,fS,fL
	;
	switch (arguments.length) {
		case 0: randomize(); break;
		case 1:
			if (typeof(iR)=='string') {
				if (iR.match(/rgb/gi)) {
					var aRGB = iR.match(/\d+/g);
					iR = parseInt(aRGB[0],10);
					iG = parseInt(aRGB[1],10);
					iB = parseInt(aRGB[2],10);
					iClr = iR<<16|iG<<8|iB;
				} else {
					var s = iR.replace('#','');
					if (s.length===3) s = s.substr(0,1)+s.substr(0,1)+s.substr(1,1)+s.substr(1,1)+s.substr(2,1)+s.substr(2,1);
					oReturn.integer = iClr = parseInt(s,16);
				}
			} else oReturn.integer = iClr = iR<255?iR<<16|iR<<8|iR:iR;
		break;
		case 2: oReturn.integer = iClr = iR; break;
		case 3: oReturn.integer = iClr = iR<<16|iG<<8|iB; break;
	}

	/**
	 * A color instance as generated by {@link iddqd.math.color}
	 * @namespace colorInstance
	 * @see iddqd.math.color
	 */

	function setR(i){ oReturn.r = iR = i<0?0:i>255?255:i+0.5<<0; fR = iR/255; }
	function setG(i){ oReturn.g = iG = i<0?0:i>255?255:i+0.5<<0; fG = iG/255; }
	function setB(i){ oReturn.b = iB = i<0?0:i>255?255:i+0.5<<0; fB = iB/255; }
	//function setA(i){ /* todo: implement? */ }


	function makeRGB2Int(){ oReturn.integer = iClr = iR<<16|iG<<8|iB; }

	function makeInt2RGB() {
		setR((iClr>>16)&FF);
		setG((iClr>>8)&FF);
		setB(iClr&FF);
	}

	function makeInt2Hex() {
		oReturn.hex = '#'+iClr.toString(16).pad(iLen,'0',true);
	}

	/**
	 * Returns the color integer value
	 * @memberof colorInstance
	 * @returns {number}
	 */
	function getColor(){
		return iClr;
	}

	/**
	 * Set the color
	 * @memberof colorInstance
	 * @param {Number} i A hexadecimal integer ie 0xFF0000
	 * @returns {colorInstance}
	 */
	function setColor(i) {
		oReturn.integer = iClr = i;
		makeInt2RGB();
		makeInt2Hex();
		return oReturn;
	}

	/**
	 * Randomizes the color
	 * @memberof colorInstance
	 * @returns {colorInstance}
	 */
	function randomize() {
		oReturn.integer = iClr = 0xFFFFFF*Math.random()<<0;
		makeInt2RGB();
		makeInt2Hex();
		return oReturn;
	}

	/**
	 * Clones the color
	 * @memberof colorInstance
	 * @returns {colorInstance}
	 */
	function clone(){
		return iddqd.math.color(iClr);
	}

	/**
	 * Sets the color alpha value
	 * @memberof colorInstance
	 * @param {Number} alpha The alpha value
	 * @returns {String}
	 */
	function rgba(alpha) {
		if (alpha!==undefined) iA = alpha;
		oReturn.rgba = 'rgba('+iR+','+iG+','+iB+','+iA+')';
		return oReturn.rgba;
	}

	function addColor(c) {
		if (!isColor(c)) c = iddqd.color(c);
		setR(iR+c.r,FF);
		setG(iG+c.g,FF);
		setB(iB+c.b,FF);
		makeRGB2Int();
		makeInt2Hex();
		return oReturn;
	}

	function subtract(c) {
		if (!isColor(c)) c = iddqd.color(c);
		setR(iR-c.r,0);
		setG(iG-c.g,0);
		setB(iB-c.b,0);
		makeRGB2Int();
		makeInt2Hex();
		return oReturn;
	}

	function multiply(f) {
		setR(f*iR);
		setG(f*iG);
		setB(f*iB);
		makeRGB2Int();
		makeInt2Hex();
		return oReturn;
	}

	function divide(f) {
		setR(iR/f);
		setG(iG/f);
		setB(iB/f);
		makeRGB2Int();
		makeInt2Hex();
		return oReturn;
	}

	function average(clr,part) {
		if (!isColor(clr)) clr = iddqd.color(clr);
		if (part===undefined) part = 0.5;
		var h = 1-part;
		setR(h*iR+part*clr.r);
		setG(h*iG+part*clr.g);
		setB(h*iB+part*clr.b);
		makeRGB2Int();
		makeInt2Hex();
		return oReturn;
	}

	function brightness() { // todo: add calc bool
		return  fR*fR*fBr + fG*fG*fBg + fB*fB*fBb;
	}
//////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////


	function huey(f) {
		if (!bHSL) makeRGB2HSL();
		if (f===undefined) {
			return fH;
		} else {
			fH = f;
			makeHSL2RGB();
			return oReturn;
		}
	}

	function saturation(f) {
		if (!bHSL) makeRGB2HSL();
		if (f===undefined) {
			return fS;
		} else {
			fS = f;
			makeHSL2RGB();
			return oReturn;
		}
	}

	function lightness(f) {
		if (!bHSL) makeRGB2HSL();
		if (f===undefined) {
			return fL;
		} else {
			fL = f;
			makeHSL2RGB();
			return oReturn;
		}
	}

	function makeRGB2HSL(){
		var  fMax = Math.max(fR,fG,fB)
			,fMin = Math.min(fR,fG,fB);
		fL = (fMax+fMin)/2;
		if (fMax===fMin) {
			fH = fS = 0; // achromatic
		} else {
			var d = fMax-fMin;
			fS = fL>0.5?d/(2-fMax-fMin):d/(fMax+fMin);
			switch(fMax){
				case fR: fH = (fG-fB)/d+(fG<fB?6:0); break;
				case fG: fH = (fB-fR)/d+2; break;
				case fB: fH = (fR-fG)/d+4; break;
			}
			fH /= 6;
		}
		bHSL = true;
	}
	function hue2rgb(p,q,t) {
		if (t<0) t += 1;
		if (t>1) t -= 1;
		if (t<1/6) return p + (q-p)*6*t;
		if (t<1/2) return q;
		if (t<2/3) return p + (q-p)*(2/3-t)*6;
		return p;
	}
	function makeHSL2RGB(){
		if (fS===0) {
			fR = fG = fB = fL; // achromatic
		} else {
			var q = fL<0.5 ? fL*(1+fS) : fL+fS-fL*fS
				,p = 2*fL-q;
			fR = hue2rgb(p, q, fH + 1/3);
			fG = hue2rgb(p, q, fH);
			fB = hue2rgb(p, q, fH - 1/3);
		}
		setR(fR*255);
		setG(fG*255);
		setB(fB*255);
		makeRGB2Int();
		makeInt2Hex();
	}
/*function rgbToHsl(r, g, b){
    r /= 255, g /= 255, b /= 255;
    var max = Math.max(r, g, b), min = Math.min(r, g, b);
    var h, s, l = (max + min) / 2;

    if(max == min){
        h = s = 0; // achromatic
    }else{
        var d = max - min;
        s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
        switch(max){
            case r: h = (g - b) / d + (g < b ? 6 : 0); break;
            case g: h = (b - r) / d + 2; break;
            case b: h = (r - g) / d + 4; break;
        }
        h /= 6;
    }

    return [h, s, l];
}
function hslToRgb(h, s, l){
    var r, g, b;

    if(s == 0){
        r = g = b = l; // achromatic
    }else{
        function hue2rgb(p, q, t){
            if(t < 0) t += 1;
            if(t > 1) t -= 1;
            if(t < 1/6) return p + (q - p) * 6 * t;
            if(t < 1/2) return q;
            if(t < 2/3) return p + (q - p) * (2/3 - t) * 6;
            return p;
        }

        var q = l < 0.5 ? l * (1 + s) : l + s - l * s;
        var p = 2 * l - q;
        r = hue2rgb(p, q, h + 1/3);
        g = hue2rgb(p, q, h);
        b = hue2rgb(p, q, h - 1/3);
    }

    return [r * 255, g * 255, b * 255];
}*/
//////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////

	function isColor(c) {
		if (!c) return false;
		for (var s in oReturn) if (c.hasOwnProperty(s)!==oReturn.hasOwnProperty(s)) return false;
		return true;
	}

	makeInt2RGB();
	makeInt2Hex();
	return oReturn;
});