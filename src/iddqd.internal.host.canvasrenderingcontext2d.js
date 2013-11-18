/* global CanvasRenderingContext2D */
// todo: document
/**
 * CanvasRenderingContext2D methods
 * @namespace iddqd.internal.host.canvasrenderingcontext2d
 */
iddqd.ns('iddqd.internal.host.canvasrenderingcontext2d',
	(function(internal){
		'use strict';
		var aStyle = ['strokeStyle','fillStyle','font','lineWidth']
			,oStoredStyle = {}
		;
		return internal(CanvasRenderingContext2D,{
			createGradient: function(isLinear,ysize,pos,color) {
				var oGradient = isLinear?this.createLinearGradient(0,0,0,ysize):this.createRadialGradient(0,0,0,0,0,ysize)
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
			,storeStyle: function(){
				var oStore = {};
				iddqd.loop(aStyle,function(i,prop){
					if (this.hasOwnProperty(prop)) oStore[prop] = this[prop];
				});
				return oStore;
			}
			,restoreStyle: function(o){
				iddqd.loop(o||oStoredStyle,function(prop,value){
					if (this.hasOwnProperty(prop)) this[prop] = value;
				});
			}
			,drawLine: function(ax,ay,bx,by,lineColor){
				this.storeStyle();
				this.beginPath();
				if (lineColor) this.strokeStyle = lineColor;
				this.moveTo(ax,ay);
				this.lineTo(bx,by);
				this.stroke();
				this.closePath();
				this.restoreStyle();
			}
			,drawCircle: function(x,y,radius,lineColor,fillColor){
//				this.storeStyle();
				this.beginPath();
				if (lineColor) this.strokeStyle = lineColor;
				if (fillColor) this.fillStyle = fillColor;
				this.arc(x,y,radius,0,2*Math.PI);
				lineColor&&this.stroke();
				fillColor&&this.fill();
				this.closePath();
//				this.restoreStyle();
			}
			,drawText: function(text,x,y,lineColor,fillColor){
				this.storeStyle();
				this.beginPath();
				if (lineColor) this.strokeStyle = lineColor;
				if (fillColor) this.fillStyle = fillColor;
				if (lineColor) {
					this.strokeText(text,x,y);
					this.stroke();
				}
				if (fillColor||lineColor===undefined) {
					this.fillText(text,x,y);
					this.fill();
				}
				this.closePath();
				this.restoreStyle();
			}
			,drawRect: function(x,y,w,h,lineColor,fillColor){
				this.storeStyle();
				this.beginPath();
				if (lineColor) this.strokeStyle = lineColor;
				if (fillColor) this.fillStyle = fillColor;
				this.rect(x,y,w,h);
				lineColor&&this.stroke();
				fillColor&&this.fill();
				this.closePath();
				this.restoreStyle();
			}
			,clear: function(){
				this.canvas.width = this.canvas.width;
			}
			/*,drawCircle: function(x,y,radius,fill,stroke) {
				if (fill===undefined) fill = true;
				if (stroke===undefined) stroke = false;
				this.translate(x,y);
				this.beginPath();
				this.arc(0,0,radius,0,2*Math.PI);
				fill&&this.fill();
				stroke&&this.stroke();
				this.closePath();
				this.translate(-x,-y);
				return this;
			}*/
			,drawPolygon: function(x,y,radius,sides,fill,stroke) {
				if (fill===undefined) fill = true;
				else this.fillStyle = fill;
				if (stroke===undefined) stroke = false;

				this.translate(x,y);
				for (var i=0
						,l=sides
						,a=2*Math.PI/l
						,s = Math.cos(a/2); i<l; i++) {
					this.beginPath();
					this.moveTo(0,-1);
					this.rotate(-a/2);
					this.lineTo(0,radius);
					this.rotate(a);
					this.lineTo(0,radius);
					this.rotate(-a/2);
					if (fill) {
						this.scale(s,s);
						this.fill();
						this.scale(1/s,1/s);
						//console.log('fill',fill); // log
					}

				/*if (fill) {
					this.fill();
				}*/
					this.rotate(a);
					stroke&&this.stroke(); // todo: fix strokes to boundary
					this.closePath();
				}
				this.translate(-x,-y);
				return this;
			}
			,drawPolygram: function(x,y,radius,inset,sides,fill,stroke) {
				if (fill===undefined) fill = true;
				if (stroke===undefined) stroke = false;
				this.translate(x,y);
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
					this.beginPath();
					this.moveTo(0,-1);
					this.rotate(-fAngleH);
					this.lineTo(0,bSide?radius:fInset*radius);
					this.rotate(fAngle);
					this.lineTo(0,bSide?fInset*radius:radius);
					this.rotate(-fAngleH);
					if (fill) {
						this.rotate(bSide?fGradientAngle:-fGradientAngle);
						this.scale(fGradientScale,fGradientScale);
						this.fill();
						this.scale(1/fGradientScale,1/fGradientScale);
						this.rotate(bSide?-fGradientAngle:fGradientAngle);
					}
					this.rotate(fAngle);
					stroke&&this.stroke(); // todo: fix strokes to boundary
					this.closePath();
				}
				this.translate(-x,-y);
				return this;
			}
		});
	})(iddqd.internal)
);