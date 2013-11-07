/* global iddqd */
/* global signals */
/* global createPanoViewer */
/**
 * Iwan Baan :: panorama
 * @namespace iddqd.panorama
 * @version 0.2.0
 * @author Ron Valstar <ron@ronvalstar.nl>
 * @licence MIT: http://www.opensource.org/licenses/mit-license.php
 * @requires createPanoViewer Krpano function (currently using Krpano 1.16.7 (build 2013-09-11))
 * @copyright Ron Valstar <ron@ronvalstar.nl>
 */
iddqd.ns('iddqd.panorama',(function(rv){
	'use strict';
	//
	rv.htmlelement.init();
	//
	var iTimeInit = rv.millis()
		,oDomParser = new DOMParser()
		,oReturn = {
			create:create
		}
		// link signals to functions
		// krpano js interface // http://krpano.com/docu/js/#top
		// krpano callbacks // http://krpano.com/docu/xml/#events.onenterfullscreen
		//		start
		//
		//		onenterfullscreen
		//		onexitfullscreen
		//		onxmlcomplete
		//		onpreviewcomplete
		//		onloadcomplete
		//		onnewpano
		//		onremovepano
		//		onloaderror
		//		onkeydown
		//		onkeyup
		//		onclick
		//		onmousedown
		//		onmouseup
		//		onmousewheel
		//		onidle
		//		onviewchange
		//		onviewchanged
		//		onresize
		,aKrpanoEvents = [
			'start'
			,'over'
			,'out'
			,'xmlComplete'
			,'previewComplete'
			,'loadComplete'
			,'viewChange'
			,'viewChanged'
			,'enterFullscreen'
			,'exitFullscreen'
			// custom events callbacks
			,'xmlLoaded' // custom event for whole xml
			,'transitionStart'
			,'transitionLoaded'
			,'transitionBlended'
			,'hotspotLoad' // todo: doesn't fire?
		]
	;
	aKrpanoEvents.forEach(function(functionName){
		var oSignal = new signals.Signal()
			,oFunction = function (){oSignal.dispatch.apply(oSignal,arguments);}
		;
		oReturn[functionName] = oFunction;
		for (var signalFunction in oSignal) {
			if (signalFunction.substr(0,1)!=='_') {
				oFunction[signalFunction] = (function(name){
					return function(){
						oSignal[name].apply(oSignal,arguments);
					};
				})(signalFunction);
			}
		}
	});
	//
	document.addEventListener('deviceready',handleDeviceReady,false);
	//
	// createPanorama
	function create(id,xml,callback){
		logTime('create');
		var mPanoDiv = document.body.addChild("div",{
				 id: id
				,'class': 'pano'
			}).css({
				position: 'absolute'
				,left: '0'
				,top: '0'
				,width: '100%'
				,height: '100%'
			})
			,oViewer = createPanoViewer({
				id:			'_'+id
				,target:	id
				,xml:		xml
				,onready:	function(instance){
					instance.addClass('panorama');
					if (callback) callback(instance);
				}
				,onerror:	rv.fn
				,html5:		'prefer'
				,consolelog:true
				,passQueryParameters:false
				,vars:		{id:id}
				,width:		'100%'
				,height:	'100%'
				,bgcolor:	'#000000'
				,swf:		'scripts/krpano.swf'
				,wmode:		'opaque'
				//,basepath:	''
				//,license:	'krpano.license'
			})
		;
		document.body.addEventListener('contextmenu',function(e) {
			var aDiv = document.getElementsByTagName('div');
			for (var i=0,l=aDiv.length;i<l;i++) {
				var mObj = aDiv[i];
				var sText = '';
				if (mObj) {
					for (var j = 0; j<mObj.childNodes.length; j++) {
						var curNode = mObj.childNodes[j];
						if (curNode.nodeName==="#text") {
							sText = curNode.nodeValue;
							break;
						}
					}
					if (sText=='About the krpano Panorama Viewer...'){
						//mObj.parentNode.parentNode.parentNode.remove();
						mObj.parentNode.parentNode.parentNode.style.display = 'none';
					}
				}
			}
			e.preventDefault();
			return false;
		},false);
		//
		parseSingalsToViewer(oViewer);
		//
		if (oViewer.isHTML5possible()) {
			oViewer.embed();
			rv.xhttp(xml,function(o) {
				oReturn.xmlLoaded.dispatch(oViewer.vars.id,oDomParser.parseFromString(o.response,"text/xml"));
			});
		} else {
			mPanoDiv.innerHTML = 'A Webkit based browser with support for CSS 3D tranforms is necessary to view this page!<br/>At the moment this are only the latest Safari or Chrome browsers or the browsers on iOS devices (iPhone,iPad,iPod Touch).<br/><br/><a href="http://www.apple.com/safari/download/" target="_blank"><img src="http://www.browserchoice.eu/Resources/Images/Safari_logo.jpg" style="border:0;" alt="Get Safari" /></a>&nbsp;<a href="http://www.google.com/chrome/" target="_blank"><img src="http://www.browserchoice.eu/Resources/Images/Chrome_logo.png" style="border:0;" alt="Get Chrome" /></a>';
		}
		//
		return oViewer;
	}
	function parseSingalsToViewer(viewer){
		aKrpanoEvents.forEach(function(functionName){
			var oSignal = new signals.Signal()
				,oFunction = function (id){
					if (id==viewer.vars.id) {
						Array.prototype.shift.apply(arguments);
						oSignal.dispatch.apply(oSignal,arguments);
					}
				}
			;
			oReturn[functionName].add(oFunction);
			viewer[functionName] = oSignal;
		});
	}
	function handleDeviceReady(){
		logTime('deviceready');
	}

	function logTime(s,args){
		console.log('',s,rv.millis()-iTimeInit,args); // log
	}

	return oReturn;
})(iddqd));