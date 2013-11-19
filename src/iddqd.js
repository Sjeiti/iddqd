/**
 * A collection
 * @namespace iddqd
 * @summary A collection
 * @version 2.0.21
 * @author Ron Valstar (http://www.sjeiti.com/)
 * @copyright Ron Valstar <ron@ronvalstar.nl>
 */
if (window.iddqd===undefined) window.iddqd = (function() {
	'use strict';
	var oGetget = {}
		,bGetget = false
		,oTmplCache = {}
		// return object including exposed private methods
		,oReturn = {
			toString: function(){return '[object iddqd]';}
			/**
			 * Boolean to check if the DOMReady event has passed.
			 * @name iddqd.DOMReady
			 * @type {boolean}
			 */
			,DOMReady: false
			,onDOMReady:onDOMReady
			,loop:loop
			,extend:extend
			,ns:ns
			,fireEvent:fireEvent
			,millis: millis
			,getGet:getGet
			,getLessVars:getLessVars
			,loadScript: loadScript
			/**
			 * Empty function.
			 * @name iddqd.fn
			 * @method
			 * */
			,fn: function(){}
			,tmpl:tmpl
			,es5:es5
		}
		,sJSRoot = './'
	;

	////////////////////////////////////////////////////////////////////////////////////////////////////////////
	////////////////////////////////////////////////////////////////////////////////////////////////////////////
	////////////////////////////////////////////////////////////////////////////////////////////////////////////

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

	// addEventListener polyfill 1.0 / Eirik Backer / MIT Licence
	(function(win, doc){
		/* jshint validthis: true */
		if(win.addEventListener) return; // No need to polyfill
		function docHijack(p){var old = doc[p];doc[p] = function(v){return addListen(old(v));};}
		function addEvent(on, fn, self){
			return (self = this).attachEvent('on' + on, function(ee){
				var e = ee || win.event;
				e.preventDefault  = e.preventDefault  || function(){e.returnValue = false;};
				e.stopPropagation = e.stopPropagation || function(){e.cancelBubble = true;};
				fn.call(self, e);
			});
		}
		function addListen(obj, i){
			if(i = obj.length)while(i--)obj[i].addEventListener = addEvent;
			else obj.addEventListener = addEvent;
			return obj;
		}
		addListen([doc, win]);
		if('Element' in win) { // IE8
			win.Element.prototype.addEventListener = addEvent;
		}else { //IE < 8
			doc.attachEvent('onreadystatechange', function(){addListen(doc.all);}); // Make sure we also init at domReady
			docHijack('getElementsByTagName');
			docHijack('getElementById');
			docHijack('createElement');
			addListen(doc.all);
		}
	})(window, document);

	////////////////////////////////////////////////////////////////////////////////////////////////////////////
	////////////////////////////////////////////////////////////////////////////////////////////////////////////
	////////////////////////////////////////////////////////////////////////////////////////////////////////////

	/**
	 * Method with callback function to be executed when DOM has finished loading. If DOM has already finished callback is executed immediately.
	 * @name iddqd.onDOMReady
	 * @method
	 * @param callback Callback function.
	 * @param state Listen to particular state
	 */
	function onDOMReady(callback,state) { // todo: add to signals
		function doCallback(){
			oReturn.DOMReady = true;
			callback();
		}
		function checkReadyState(fn) {
			if (document.readyState==state||'interactive') {
				fn();
			}
		}
		if (oReturn.DOMReady===true) {
			doCallback();
		} else {
			if (document.addEventListener&&!state) document.addEventListener('DOMContentLoaded',doCallback,false);
			else document.onreadystatechange = function(){ checkReadyState(doCallback); };
		}
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
	 * Create namespaces. If only the first 'namespace' parameter is set it will return the namespace if it exists or null if it doesn't.
	 * @name iddqd.ns
	 * @method
	 * @param {String} namespace The namespace we're creating or expanding
	 * @param {Object} object The object with which to extend the namespace
	 */
	function ns(namespace,object){
		var oBase = window
			,aNS = namespace.split('.')
			,s
		;
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
	/**
	 * Load javascript file
	 * @name iddqd.loadScript
	 * @method
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
	 * Simple JavaScript Templating
	 * John Resig - http://ejohn.org/ - MIT Licensed
	 * @name iddqd.tmpl
	 * @method
	 * @param {String} str ID of the template script element
	 * @param {Object} [data] A callback function for when the file is loaded.
	 * @example
	 *<script type="text/html" id="user_tmpl">
	 *	<% for ( var i = 0; i < users.length; i++ ) { %>
	 *		<li><a href="<%=users[i].url%>"><%=users[i].name%></a></li>
	 *	<% } %>
	 *</script>
	 */
	function tmpl(str, data){
		/* jshint -W054 */
		// Figure out if we're getting a template, or if we need to
		// load the template - and be sure to cache the result.
		var fn = !/\W/.test(str) ?
			oTmplCache[str] = oTmplCache[str] ||
			tmpl(document.getElementById(str).innerHTML) :
			// Generate a reusable function that will serve as a template
			// generator (and which will be cached).
			new Function("obj",
			"var p=[],print=function(){p.push.apply(p,arguments);};" +
			// Introduce the data as local variables using with(){}
			"with(obj){p.push('" +
			// Convert the template into pure JavaScript
			str
				.replace(/[\r\t\n]/g, " ")
				.split("<%").join("\t")
				.replace(/((^|%>)[^\t]*)'/g, "$1\r")
				.replace(/\t=(.*?)%>/g, "',$1,'")
				.split("\t").join("');")
				.split("%>").join("p.push('")
				.split("\r").join("\\'")
			+ "');}return p.join('');");
		// Provide some basic currying to the user
		return data ? fn( data ) : fn;
	}

	function es5(shimonly){
		if (!!shimonly) {

		}
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
	 * Returns get vars object
	 * @name iddqd.getGet
	 * @method
	 * @return {Object} A key/value object.
	 */
	function getGet(){ // todo typecast * @param {Boolean} [typecast=true] Tries to guess the type.
		if (!bGetget) {
			var aPairs = location.search.substr(1).split('&');
			for (var i=0,l=aPairs.length;i<l;i++) {
				var aKeyValue = aPairs[i].split('=');
				oGetget[aKeyValue.shift()] = aKeyValue.join('=');
			}
			bGetget = true;
		}
		return oGetget;
	}
	/**
	 * Tries to pull your LESS/SASS/etc variables from CSS and parse them to Javascript
	 * @name iddqd.getLessVars
	 * @method
	 * @param {String} id The css-id your variables are listed under.
	 * @param {Boolean} [parseNumbers=true] Try to parse units as numbers.
	 * @return {Object} A value object containing your LESS variables.
	 * @example
	 * less:
	 *	&#64;foo: 123px;
	 *	#less { .myFoo {width: @foo; } }
	 *
	 * javascript:
	 *	getLessVars('less');
	 *
	 * returns:
	 *	{myFoo:123}
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
	 * Fires an event
	 * @name iddqd.fireEvent
	 * @method
	 * @param {Object} target The target
	 * @param {String} evt The event
	 */
	function fireEvent(target,evt){
		if (document.createEventObject){ // dispatch for IE
			return target.fireEvent('on'+evt,document.createEventObject());
		} else { // dispatch for firefox + others
			var oEvt = document.createEvent('HTMLEvents');
			oEvt.initEvent(evt,true,true); // event type,bubbling,cancelable
			return !target.dispatchEvent(oEvt);
		}
	}
	//
	return oReturn;
})();

// orphan namespaces below
/**
 * Networking methods
 * @namespace iddqd.network
 * @summary Networking methods
 */
/**
 * Mathematical methods
 * @namespace iddqd.math
 * @summary Mathematical methods
 */