/* global iddqd */
/**
 * scroll
 * @author Ron Valstar (http://www.sjeiti.com/)
 * @namespace iddqd.scroll
 * @requires iddqd.js
 */
iddqd.ns('iddqd.scroll',function addScroll(elm,baseSize){
	'use strict';
	//
	var	mParent = elm.parentNode
		,mWrapper = addChild(mParent,'div',{class:'scrollwrap'});
	mParent.removeChild(elm);
	mWrapper.appendChild(elm);
	elm = mWrapper;
	//
	var oAbs = {position:'absolute'}
		,oWdt = extend({width:'100%'},oAbs)
//		,mWrapper = addChild(elm.parentNode,'div',{class:'scrollwrap'})
		,mGutter =	css(addChild(mWrapper,'div',{class:'gutter'}),extend({
			right:'0px'
			,top: '0px'
			,height:'100%'},oAbs))
		,mUp =		css(addChild(mGutter,'div',{class:'button up'}),oWdt)
		,mDn =		css(addChild(mGutter,'div',{class:'button down'}),extend({bottom:'0px'},oWdt))
		,mDr =		css(addChild(mGutter,'div',{class:'drag'}),oWdt)
		//
		,sBaseSize = (baseSize||20)+'px'
		//
		,aEvents = ['mousedown','mouseup','touchstart','touchend']
		,aDragEvents = ['mousemove','touchmove']
		,aButtons = [mUp,mDn]
		,iButUpDown = 0
		//
		,iSTop = 0
		,iStep = 10
		,iNullY
		,iHeight
		,iTotalH
		,iUpH
		,iDnH
		,iDrHMx
		,iDrMnH
		,iDrH
		,iDragMx
		,iScrollMx
		//
		,requestAnimFrame = (function(){
			return window.requestAnimationFrame||
				window.webkitRequestAnimationFrame||
				window.mozRequestAnimationFrame||
				window.oRequestAnimationFrame||
				window.msRequestAnimationFrame||
				function(callback){
					window.setTimeout(callback, 1000 / 60);
				};
		})()
	;
	function addChild(to,elementName,attributes,append) {
		if (append===undefined) append = true;
		var m = document.createElement(elementName);
		if (attributes!==undefined) setAttributes(m,attributes);
		if (append===true) to.appendChild(m);
		else to.insertBefore(m, to.firstChild);
		return m;
	}
	function setAttributes(elm,attrs) {
		for (var s in attrs) elm.setAttribute(s,attrs[s]);
		return elm;
	}
	function css(elm,rules){
		var oStyle = elm.style;
		for (var s in rules) {
			var oVal = rules[s];
			if (oStyle[s]!=oVal) oStyle[s] = oVal;
		}
		return elm;
	}
	function loop(a,fn) {
		for (var i=0,l=a.length;i<l;i++) fn(i,a[i]);
	}
	function extend(obj,fns){
		for (var s in fns) if (!obj[s]) obj[s] = fns[s];
		return obj;
	}
	function getStyle(el,styleProp) {
		var value, defaultView = (el.ownerDocument || document).defaultView;
		// W3C standard way:
		if (defaultView && defaultView.getComputedStyle) {
			// sanitize property name to css notation
			// (hypen separated words eg. font-Size)
			styleProp = styleProp.replace(/([A-Z])/g,"-$1").toLowerCase();
			return defaultView.getComputedStyle(el,null).getPropertyValue(styleProp);
		} else if (el.currentStyle) { // IE
			// sanitize property name to camelCase
			styleProp = styleProp.replace(/\-(\w)/g,function (str,letter) {
				return letter.toUpperCase();
			});
			value = el.currentStyle[styleProp];
			// convert other units to pixels on IE
			if (/^\d+(em|pt|%|ex)?$/i.test(value)) {
				return (function (value) {
					var oldLeft = el.style.left, oldRsLeft = el.runtimeStyle.left;
					el.runtimeStyle.left = el.currentStyle.left;
					el.style.left = value || 0;
					value = el.style.pixelLeft + "px";
					el.style.left = oldLeft;
					el.runtimeStyle.left = oldRsLeft;
					return value;
				})(value);
			}
			return value;
		}
	}
	//////////////////////////
	function defaultStyle(elm,prop,dflt){
		if (!(elm.style[prop]!==''||getStyle(elm,prop)!=='0px')) elm.style[prop] = dflt;
	}
	function resetMeasurements(){
		iNullY = elm.offsetTop;
		iHeight = elm.offsetHeight;
		iTotalH = elm.scrollHeight;

		console.log('iTotalH',iTotalH); // log

		iUpH = mUp.offsetHeight;
		iDnH = mDn.offsetHeight;
		iDrHMx = iHeight-iUpH-iDnH;
		iDrMnH = parseInt(getStyle(mDr,'min-height'),10);

		console.log('iDrHMx',iDrHMx); // log
		console.log('iDrMnH',iDrMnH); // log

		iDrH = (iHeight/iTotalH)*iDrHMx<<0;

		console.log('iDrH',iDrH); // log
		
		if (iDrMnH!==0&&iDrH<iDrMnH) iDrH = iDrMnH;
		iDragMx = iDrHMx-iDrH;
		iScrollMx = iTotalH-iHeight;
		//
		setPos(elm.scrollTop);
		viewScroll();
		viewDragBar();
	}
	function handleButtonEvent(e){
		var bDown = aEvents.indexOf(e.type)%2===0;
		iButUpDown = bDown?(e.currentTarget===mUp?-1:1):0;
		if (bDown) runButton();
	}
	function handleDragEvent(e){
		var bDown = aEvents.indexOf(e.type)%2===0;
		loop(aDragEvents,function(i,evt){
			if (bDown) mGutter.addEventListener(evt, handleDraggingEvent, false);
			else mGutter.removeEventListener(evt, handleDraggingEvent, false);
		});
	}
	function handleDraggingEvent(e){
		if (e.touches) {
			loop(e.touches,function(i,touch){
				if (touch.target===mDr){
					dragPageY(touch.pageY);
					e.preventDefault();
				}
			});
		} else {
			dragPageY(e.pageY);
		}
	}
	function handleGutterEvent(e){
		if (e.currentTarget!==e.target) return;
		var iClickPos = e.clientY-iNullY
			,bUp = iClickPos<(parseInt(mDr.style.top,10)+iDrH/2);
		setPos(iSTop+(bUp?-1:1)*iDrH*(iScrollMx/iDragMx));
		viewScroll();
		viewDragBar();
	}
	function dragPageY(pageY){
		var iRelY = Math.min(Math.max(pageY-iNullY-iUpH-iDrH/2,0),iDragMx)
			,fPart = iRelY/iDragMx;
		mDr.style.top = iRelY+iUpH+'px';
		setPos(fPart*iScrollMx);
		viewScroll();
	}
	function runButton(){
		setPos(iSTop + iStep*iButUpDown);
		viewScroll();
		viewDragBar();
		if (iButUpDown!==0) requestAnimFrame(runButton);
	}
	function setPos(pos){
		iSTop = Math.min(Math.max(pos<<0,0),iScrollMx);
	}
	function viewScroll(){
		elm.scrollTop = iSTop;
		mGutter.style.top = iSTop+'px';
	}
	function viewDragBar(){
		mDr.style.top = iUpH+iDragMx*(iSTop/iScrollMx)+'px';
	}
	//////////////////////////
	//
	// test current state
	if (['static','inherit',''].indexOf(elm.style.position)!==-1) css(elm,{position:'relative'});
	if (elm.style.overflow!=='hidden') elm.style.overflow = 'hidden';
	defaultStyle(mGutter,'width',sBaseSize);
	defaultStyle(mUp,'height',sBaseSize);
	defaultStyle(mDn,'height',sBaseSize);
	defaultStyle(mDr,'min-height',2*parseInt(sBaseSize,10)+'px');
	//
	resetMeasurements();
	//
	mDr.style.height = iDrH+'px';
	//
	// add events
	loop(aEvents,function(i,evt){
		var bUp = i===1;
		loop(aButtons,function(j,but){
			(bUp?document.body:but).addEventListener(evt, handleButtonEvent, false);
		});
		(bUp?document.body:mDr).addEventListener(evt, handleDragEvent, false);
	});
	mGutter.addEventListener('click', handleGutterEvent, false);
	return {
		toString: function(){return '[object scroll]';}
		,update: resetMeasurements
	};
});