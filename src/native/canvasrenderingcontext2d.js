// todo: document
/**
 * CanvasRenderingContext2D methods
 * @module native/canvasrenderingcontext2d
 */

var aStyle = ['strokeStyle','fillStyle','font','lineWidth']
	,oStoredStyle = {}
;

export function createGradient(context,isLinear,ysize,pos,color) {
	var oGradient = isLinear?context.createLinearGradient(0,0,0,ysize):context.createRadialGradient(0,0,0,0,0,ysize)
		,i = arguments.length-2
		,j = i/2
		,f,c;
	if (i<=0||i%2===1) {
		throw {message:'please provide position and color'+pos+color};// todo: pos and color?
	}
	while (j--) {
		f = arguments[2*j+2];
		c = arguments[2*j+3];
		oGradient.addColorStop(f,c);
	}
	return oGradient;
}
export function storeStyle(context){
	var oStore = {};
	iddqd.loop(aStyle,function(prop){
		if (context.hasOwnProperty(prop)) oStore[prop] = context[prop];
	});
	return oStore;
}
export function restoreStyle(context,o){
	iddqd.loop(o||oStoredStyle,function(value,prop){
		if (context.hasOwnProperty(prop)) context[prop] = value;
	});
}
export function drawLine(context,ax,ay,bx,by,lineColor){
	context.storeStyle();
	context.beginPath();
	if (lineColor) context.strokeStyle = lineColor;
	context.moveTo(ax,ay);
	context.lineTo(bx,by);
	context.stroke();
	context.closePath();
	context.restoreStyle();
}
export function drawCircle(context,x,y,radius,lineColor,fillColor){
//				context.storeStyle();
	context.beginPath();
	if (lineColor) context.strokeStyle = lineColor;
	if (fillColor) context.fillStyle = fillColor;
	context.arc(x,y,radius,0,2*Math.PI);
	lineColor&&context.stroke();
	fillColor&&context.fill();
	context.closePath();
//				context.restoreStyle();
}
export function drawText(context,text,x,y,lineColor,fillColor){
	context.storeStyle();
	context.beginPath();
	if (lineColor) context.strokeStyle = lineColor;
	if (fillColor) context.fillStyle = fillColor;
	if (lineColor) {
		context.strokeText(text,x,y);
		context.stroke();
	}
	if (fillColor||lineColor===undefined) {
		context.fillText(text,x,y);
		context.fill();
	}
	context.closePath();
	context.restoreStyle();
}
export function drawRect(context,x,y,w,h,lineColor,fillColor){
	context.storeStyle();
	context.beginPath();
	if (lineColor) context.strokeStyle = lineColor;
	if (fillColor) context.fillStyle = fillColor;
	context.rect(x,y,w,h);
	lineColor&&context.stroke();
	fillColor&&context.fill();
	context.closePath();
	context.restoreStyle();
}
export function clear(context){
	context.canvas.width = context.canvas.width;
}
/*export function drawCircle(context,x,y,radius,fill,stroke) {
	if (fill===undefined) fill = true;
	if (stroke===undefined) stroke = false;
	context.translate(x,y);
	context.beginPath();
	context.arc(0,0,radius,0,2*Math.PI);
	fill&&context.fill();
	stroke&&context.stroke();
	context.closePath();
	context.translate(-x,-y);
	return context;
}*/
export function drawPolygon(context,x,y,radius,sides,fill,stroke) {
	if (fill===undefined) fill = true;
	else context.fillStyle = fill;
	if (stroke===undefined) stroke = false;

	context.translate(x,y);
	for (var i=0
			,l=sides
			,a=2*Math.PI/l
			,s = Math.cos(a/2); i<l; i++) {
		context.beginPath();
		context.moveTo(0,-1);
		context.rotate(-a/2);
		context.lineTo(0,radius);
		context.rotate(a);
		context.lineTo(0,radius);
		context.rotate(-a/2);
		if (fill) {
			context.scale(s,s);
			context.fill();
			context.scale(1/s,1/s);
			//console.log('fill',fill); // log
		}

	/*if (fill) {
		context.fill();
	}*/
		context.rotate(a);
		stroke&&context.stroke(); // todo: fix strokes to boundary
		context.closePath();
	}
	context.translate(-x,-y);
	return context;
}
export function drawPolygram(context,x,y,radius,inset,sides,fill=true,stroke=false) {
	context.translate(x,y);
	for (var i = 0
			,TWOPI = 2*Math.PI
			,iNumRot = 2*sides
			,fAngle = TWOPI/iNumRot
			,fAngleH = 0.5*fAngle
			,fInset = inset
			//
			,BB = fInset*Math.sin(fAngle)
			,b = Math.atan(BB/(1-Math.sqrt(fInset*fInset-BB*BB)))
			//
			,fGradientScale = Math.tan(b)
			,fGradientAngle = -fAngle/2+Math.PI/2-b
			,bSide; i<iNumRot; i++) {
		bSide = i%2;
		context.beginPath();
		context.moveTo(0,-1);
		context.rotate(-fAngleH);
		context.lineTo(0,bSide?radius:fInset*radius);
		context.rotate(fAngle);
		context.lineTo(0,bSide?fInset*radius:radius);
		context.rotate(-fAngleH);
		if (fill) {
			context.rotate(bSide?fGradientAngle:-fGradientAngle);
			context.scale(fGradientScale,fGradientScale);
			context.fill();
			context.scale(1/fGradientScale,1/fGradientScale);
			context.rotate(bSide?-fGradientAngle:fGradientAngle);
		}
		context.rotate(fAngle);
		stroke&&context.stroke(); // todo: fix strokes to boundary
		context.closePath();
	}
	context.translate(-x,-y);
	return context;
}
