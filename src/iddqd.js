/**
 * @name iddqd
 * @namespace iddqd
 * @version 1.0.0
 * @author Ron Valstar (http://www.sjeiti.com/)
 * @copyright Ron Valstar <ron@ronvalstar.nl>
 */
if (window.iddqd===undefined) window.iddqd = (function() {
	'use strict';
	/**
	 * Function that executes the callback asap.
	 * @name iddqd.requestAnimFrame
	 * @method
	 */
	var requestAnimFrame = (function(){
			return window.requestAnimationFrame||
				window.webkitRequestAnimationFrame||
				window.mozRequestAnimationFrame||
				window.oRequestAnimationFrame||
				window.msRequestAnimationFrame||
				function(callback){
					window.setTimeout(callback, 1000/60);
				};
		})()
		,oReturn = {
			toString: function(){return '[Object iddqd]';}
			/**
			 * Environment is standalone.
			 * @name iddqd.standalone
			 * */
			,logEnabled: false
			/**
			 * Empty function.
			 * @name iddqd.fn
			 * @method
			 * */
			,fn: function(){}
			,extend:extend
			,DOMReady:false
			,onDOMReady:onDOMReady
			// todo: remove event
			,fireEvent:fireEvent
			,millis: millis
			,loop:loop
			,requestAnimFrame:requestAnimFrame
			,animate:animate
			,getGet:getGet
			,getLessVars:getLessVars
			,loadScript: loadScript
			,ns:ns
			//,namespace:namespace
			,require:require
		}
		,sJSRoot = './'
	;
	// set location origin
	if (location.origin===undefined) {
		var aLocHref = location.href.split('/');
		aLocHref.length = 3;
		location.origin = aLocHref.join('/');
	}
	// find js root
	loop(document.getElementsByTagName('script'),function(i,el){
		var sSrc = el.attributes&&el.attributes.src&&el.attributes.src.value.split('?').shift()
			,aMatch = sSrc&&sSrc.match(/^(.*)(iddqd\.js|iddqd\.min\.js)$/);
		if (aMatch) sJSRoot = aMatch[1]; // log
	});
	// console.log override for IE
	if (!window.console) {
		window.console = {};
		if (!window.console.log) {
			window.console.log = function(){};
		}
	}
	/**
	 * Extend an object
	 * @name iddqd.extend
	 * @method
	 * @param obj {Object} Subject.
	 * @param fns {Object} Property object.
	 * @returns {Object} Subject.
	 */
	function extend(obj,fns){
		for (var s in fns) if (obj[s]===undefined) obj[s] = fns[s];
		//for (var s in fns) if (!obj[s]) obj[s] = fns[s];
		return obj;
	}
	/**
	 * Traverse an object or array
	 * @name iddqd.loop
	 * @method
	 * @param {Object} o The object or array
	 * @param {Function} fn Callback function with the parameters key and value.
	 */
	function loop(o,fn){
		if (o&&fn) {
			var bArray = Array.isArray?Array.isArray(o):Object.prototype.toString.call(o)=='[object Array]';
			if (bArray) {
				var l = o.length
					,i = l
					,j;
				while (i--) {
					j = l-i-1;
					fn(j,o[j]);
				}
			} else {
				//for (var s in o) if (o.hasOwnProperty(s)) fn(s,o[s]);
				for (var s in o) if (fn.call(o[s],s,o[s])===false) break; // ie8 fix
			}
		}
	}
	// todo: namespace
	/*function namespace(namespace,includes,fn){

	}*/
	/**
	 * Create namespaces. If only the first 'namespace' parameter is set it will return the namespace if it exists or null if it doesn't.
	 * @name iddqd.ns
	 * @param {String} namespace The namespace we're creating or expanding
	 * @param {Object} object The object with which to extend the namespace
	 * @param {Array} [dependencies=null] An array of dependencies
	 */
	function ns(namespace,object,dependencies){
		var oBase = window
			,aNS = namespace.split('.')
			,s
//				,bProceed = true
		;
		if (dependencies&&dependencies.length) {
//				bProceed = false;
//				console.log('dependencies',dependencies.length); // log
			var aApply = new Array(dependencies.length)
				,iApply = dependencies.length
//					,fnCallback = function(i,s){
//						aApply
//						console.log('script loaded',i,ns(s).toString())
//					}
			;
			loop(dependencies,function(i,s){
				//
				var bIsString = typeof(s)=='string'
					,sObject = bIsString?s:s[0]
					,sFileName = bIsString?s+'.js':s[1]
				;
				//
				require(sFileName,sObject,(function(i,s){return function(){
					iApply--;
					aApply[i] = ns(s);
					if (iApply===0) {
						ns(namespace,object.apply(object,aApply));
					}//console.log('all loaded',aApply); // log
//						console.log('script loaded',i,ns(s).toString())
				};})(i,sObject));
			});
//				if ()
//				while(s=dependencies.shift()){
//					require(s,(function(s){return function(){console.log('script loaded',ns(s).toString())}})(s));
//				}
		} else {
			while(s=aNS.shift()){
				if (object) {
					if (aNS.length===0) {
						var oExists = oBase.hasOwnProperty(s)?oBase[s]:null;
						oBase[s] = object;
						if (!object.hasOwnProperty('toString')) object.toString = (function(s){return function(){return '[object '+s+']';};})(s);
						if (oExists) {
							console.warn('Overwriting '+s+' in '+namespace);
							extend(oBase[s],oExists);
						}
					} else if (!oBase.hasOwnProperty(s)) {
					//} else if (!Object.prototype.hasOwnProperty.call(oBase,s)) { // ie8 fix
						oBase[s] = {};
					}
					oBase = oBase[s];
				} else if (oBase.hasOwnProperty(s)) {
				//} else if (!Object.prototype.hasOwnProperty.call(oBase,s)) { // ie8 fix
					oBase = oBase[s];
				} else {
					return;
				}
			}
			return oBase;
		}
	}
	/**
	 * Inject javascript
	 * @name iddqd.require
	 * @param {String} file The source location of the file.
	 * @param {String} namespace The namespace we're creating or expanding
	 * @param {Function} [loadCallback=null] A callback function for when the file is loaded.
	 */
	function require(file,namespace,loadCallback){
		// todo: check this in conjunction with ns
		if (ns(namespace)) {
			loadCallback();
		} else {
			loadScript(file,loadCallback);
		}
	}
	/**
	 * Load javascript file
	 * @name iddqd.loadScript
	 * @param {String} src The source location of the file.
	 * @param {Function} [loadCallback=null] A callback function for when the file is loaded.
	 */
	function loadScript(src,loadCallback) {
		var mScript = document.createElement('script');
		mScript.src = src;
		if (loadCallback) mScript.addEventListener('load',loadCallback);
		(document.head||document.getElementsByTagName('head')[0]).appendChild(mScript);
	}
	/**
	 * @name iddqd.millis
	 * @method
	 * @returns Returns the number of milliseconds elapsed since unix epoch.
	 */
	function millis(){
		return Date.now();
	}
	/**
	 * Animates something
	 * @name iddqd.animate
	 * @method
	 * @param {Integer} duration Length of animation in milliseconds.
	 * @param {Function} step Function called each step with a progress parameter (a 0-1 float).
	 * @param {Function} complete Callback function when animation finishes.
	 * @return {Object} An animation object with a cancel function.
	 */
	function animate(duration,step,complete,laststep){
		var t = millis()
			,fnAnim = oReturn.requestAnimFrame
			,bRunning = true
			,fnRun = function(){
				if (bRunning) {
					var iTCurrent = millis()-t;
					if (iTCurrent<duration) {
						step(iTCurrent/duration);

						fnAnim(fnRun);
					} else {
						if (laststep===undefined||laststep) step(1);
						complete&&complete();
					}
				}
			};
		function cancel(){
			bRunning = false;
		}
		fnRun();
		return {
			cancel: cancel
		};
	}
	/**
	 * Returns get vars object
	 * @name iddqd.getGet
	 * @method
	 * @param {Boolean} [typecast=true] Tries to guess the type.
	 * @return {Object} A key/value object.
	 */
	var getGet = (function(){
		// todo: implement typecast
		var oGetget = {}
			,bGetget = false;
		return function(){//typecast
			if (!bGetget) {
				var aPairs = location.search.substr(1).split('&');
				for (var i=0,l=aPairs.length;i<l;i++) {
					var aKeyValue = aPairs[i].split('=');
					oGetget[aKeyValue.shift()] = aKeyValue.join('=');
				}
				bGetget = true;
			}
			return oGetget;
		};
	})();
	/**
	 * Tries to pull your LESS/SASS/etc variables from CSS and parse them to Javascript
	 * @name iddqd.getLessVars
	 * @method
	 * @param {String} id The css-id your variables are listed under.
	 * @param {Boolean} [parseNumbers=true] Try to parse units as numbers.
	 * @return {Object} A value object containing your LESS variables.
	 * @example
	 * less:
	 * &nbsp;&#64;foo: 123px;
	 * &nbsp;#less { .myFoo {width: @foo; } }
	 * javascript:
	 * &nbsp;getLessVars('less');
	 * returns:
	 * &nbsp;{myFoo:123}
	 */
	function getLessVars(id,parseNumbers) {
		/*
		 * http://www.w3.org/TR/css3-values/
		 * even though rule.style(CSSStyleDeclaration) should contain custom properties it doesn't
		 */
		// todo: memoisation
		var bNumbers = parseNumbers===undefined?true:parseNumbers
			,oLess = {}
			,rgId = /\#\w+/
			,rgNum = /^[0-9]+$/
			,rgUnit = /[a-z]+$/
			,aUnits = 'em,ex,ch,rem,vw,vh,vmin,cm,mm,in,pt,pc,px,deg,grad,rad,turn,s,ms,Hz,kHz,dpi,dpcm,dppx'.split(',')
			,rgKey = /\.(\w+)/
			,rgValue = /:\s?(.*)\s?;\s?\}/
			,sId = '#'+id
			,oStyles = document.styleSheets;
		for (var i=0,l=oStyles.length;i<l;i++) {
			var oSheet = oStyles[i]
				,sStyleHref = oSheet.href;
			if (sStyleHref&&sStyleHref.indexOf(location.origin)===0) {
				var oRules = oSheet.cssRules;// todo: IE8 err
				if (oRules) { // if ! callback
					for (var j=0,k=oRules.length;j<k;j++) {
						var sRule = oRules[j].cssText
							,aMatchId = sRule.match(rgId);
						if (aMatchId&&aMatchId[0]==sId) {
							var aKey = sRule.match(rgKey)
								,aVal = sRule.match(rgValue);
							if (aKey&&aVal) {
								var sKey = aKey[1]
									,oVal = aVal[1]
									,aUnit = oVal.match(rgUnit);
								if (bNumbers&&((aUnit&&aUnits.indexOf(aUnit[0])!==-1)||oVal.match(rgNum))) {
									oVal = parseFloat(oVal);
								}
								oLess[sKey] = oVal;
							}
						}
					}
				}
			}
		}
		return oLess;
	}

	/**
	 * Method with callback function to be executed when DOM has finished loading.
	 * @name iddqd.onDOMReady
	 * @method
	 * @param fn Callback function.
	 */
	function onDOMReady(fn,state) { // todo: add to signals
		function checkReadyState(fn) {
			if (document.readyState==state||'interactive') fn();
		}
		if (document.addEventListener&&!state) document.addEventListener('DOMContentLoaded',fn,false);
		else document.onreadystatechange = function(){ checkReadyState(fn); };
	}
	onDOMReady(function(){
		oReturn.DOMReady = true;
	});
	// todo: remove... keep regular addEventListener and only shim attachEvent
	/**
	 * Attach an event
	 * @name iddqd.addEvent
	 * @method
	 * @param {Object} target The target
	 * @param {String} evt The event. Multiple events can be attached by parsing a comma separated string.
	 * @param {Function} fn The function handling the event
	 */
	var addEvent = (function(){
		return window.addEventListener?function(target,evt,fn,useCapture){
			if (useCapture===undefined) useCapture = false;
			var aEvt = evt.split(',')
				,iEvt = aEvt.length;
			if (iEvt>1) while (iEvt--) target.addEventListener(aEvt[iEvt],fn,useCapture);
			else target.addEventListener(evt,fn,useCapture);
		}:function(target,evt,fn){
			var aEvt = evt.split(',')
				,iEvt = aEvt.length;
			if (iEvt>1) while (iEvt--) target.addEventListener(aEvt[iEvt],fn);//,f
			else target.attachEvent('on'+evt,fn);
		};
	})();
	oReturn.addEvent = addEvent;
	/**
	 * Fires an event
	 * @name iddqd.fireEvent
	 * @method
	 * @param {Object} target The target
	 * @param {String} evt The event
	 */
	function fireEvent(target,evt){
		if (document.createEventObject){ // dispatch for IE
			return target.fireEvent('on'+evt,document.createEventObject());
		} else{ // dispatch for firefox + others
			var oEvt = document.createEvent('HTMLEvents');
			oEvt.initEvent(evt,true,true); // event type,bubbling,cancelable
			return !target.dispatchEvent(oEvt);
		}
	}
//	var fnLog = window.console.log||function(){};
//	window.console.log = function() {
//		if (iddqd.logEnabled) {
//			try { fnLog.apply(console,arguments); } catch (err) {}
//		}
//	};
	//
	return oReturn;
})();
// todo: make unit tests