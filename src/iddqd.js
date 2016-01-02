/**
 * A collection
 * @namespace iddqd
 * @name iddqd
 * @summary A collection
 * @version 2.5.9
 * @license MIT
 * @author Ron Valstar (http://www.sjeiti.com/)
 * @copyright Ron Valstar <ron@ronvalstar.nl>
 */
if (window.iddqd===undefined) window.iddqd = (function() {
	'use strict';
	var oGetget = {}
		,bGetget = false
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
			,createElement: createElement
			,fireEvent:fireEvent
			,millis: millis
			,getGet:getGet
			,loadScript: loadScript
			,uses: uses
			,factory:factory
			/**
			 * Empty function.
			 * @name iddqd.fn
			 * @method
			 * */
			,fn: function(){}
		}
		,sJSRoot = './'
	;

	(function init(){
		fixLocationOrigin();
		fixConsoleLog();
		fixAddEventListener();
		fixStackTrace();
		findJavascriptRoot(); // todo: remove?
		fixClassList();
		overloadClassListContains();
	})();


	/**
	 * Add location.origin when missing
	 * @name iddqd.fixLocationOrigin
	 * @method
	 * @private
	 */
	function fixLocationOrigin(){
		if (location.origin===undefined) {
			var aLocHref = location.href.split('/');
			aLocHref.length = 3;
			location.origin = aLocHref.join('/');
		}
	}

	/**
	 * Create empty method when console.log and console.warn are missing
	 * @name iddqd.fixConsoleLog
	 * @method
	 * @private
	 */
	function fixConsoleLog(){
		if (!window.console) {
			window.console = {};
			if (!window.console.log) window.console.log = oReturn.fn;
			if (!window.console.warn) window.console.warn = oReturn.fn;
		}
	}

	/**
	 * AddEventListener polyfill 1.0 / Eirik Backer / MIT Licence
	 * @name iddqd.fixAddEventListener
	 * @method
	 * @private
	 */
	function fixAddEventListener(){
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
	}

	/**
	 * Evil hack to enforce stacktrace http://stackoverflow.com/a/12348004/695734
	 * @name iddqd.fixStackTrace
	 * @method
	 * @private
	 */
	function fixStackTrace(){
		/*jshint unused: false */
		/*jshint -W021 */
		function x(a,b,c) {
			function d(e,f) {
				d = f;
			}
			c = (b = Error)[a = 'prepareStackTrace'];
			b.captureStackTrace(b[a] = d,x);
			d.stack;
			b[a] = c;
			return d;
		}
		/*jshint unused: true */
		/*jshint +W021 */
	}

	function findJavascriptRoot(){
		loop(document.getElementsByTagName('script'),function(el){
			var sSrc = el.attributes&&el.attributes.src&&el.attributes.src.value.split('?').shift()
				,aMatch = sSrc&&sSrc.match(/^(.*)(iddqd\.js|iddqd\.min\.js)$/);
			if (aMatch) sJSRoot = aMatch[1];
		});
	}

	/**
	 * Fixes the overload for DOMTokenList.prototype.add in IE9 (and possible others)
	 */
	function fixClassList(){
		(function(m){
			if (m.classList&&window.DOMTokenList) {
				m.classList.add('a','b');
				if (!m.classList.contains('b')) {
					var tokenProto = DOMTokenList.prototype
						,fnAdd = tokenProto.add
						,fnRem = tokenProto.remove;
					tokenProto.add =	function(){ for (var i=0,l=arguments.length;i<l;i++) fnAdd.call(this,arguments[i]); };
					tokenProto.remove =	function(){ for (var i=0,l=arguments.length;i<l;i++) fnRem.call(this,arguments[i]); };
				}
			}
		})(document.createElement('div'));
	}

	/**
	 * Overloads DOMTokenList.prototype.contains
	 */
	function overloadClassListContains(){
		function contains(){
			var bContains = true;
			for (var i=0,l=arguments.length;i<l&&bContains;i++) {
				/*jshint validthis:true */
				if (!fnContains.call(this,arguments[i])) bContains = false;
				/*jshint validthis:false */
			}
			return bContains;
		}
		if (window.DOMTokenList) {
			var oDOMTokenListPrototype = DOMTokenList.prototype
				,fnContains = oDOMTokenListPrototype.contains;
			oDOMTokenListPrototype.contains = contains;
		}
	}

	////////////////////////////////////////////////////////////////////////////////////////////////////////////
	////////////////////////////////////////////////////////////////////////////////////////////////////////////
	////////////////////////////////////////////////////////////////////////////////////////////////////////////

	/**
	 * Method with callback function to be executed when DOM has finished loading. If DOM has already finished callback is executed immediately.
	 * @name iddqd.onDOMReady
	 * @method
	 * @param {Function} callback Callback function.
	 * @param {string} state Listen to particular state
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
	 * @param {Function} fn Callback function with the parameters value and key.
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
					fn(o[j],j);
				}
			} else {
				//for (var s in o) if (o.hasOwnProperty(s)) fn(s,o[s]);
				for (var s in o) if (fn.call(o[s],o[s],s)===false) break; // ie8 fix
			}
		}
	}

	/**
	 * Extend an object
	 * @name iddqd.extend
	 * @method
	 * @param {Object} obj Subject.
	 * @param {Object} fns Property object.
	 * @param {boolean} [overwrite=false]  Overwrite properties.
	 * @returns {Object} Subject.
	 */
	function extend(obj,fns,overwrite){
		for (var s in fns) {
			if (overwrite||obj[s]===undefined) {
				obj[s] = fns[s];
			}
		}
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
					//var oExists = oBase.hasOwnProperty(s)?oBase[s]:null;
					var oExists = Object.prototype.hasOwnProperty.call(oBase,s)?oBase[s]:null; // ie8 fix
					oBase[s] = object;
					if (!object.hasOwnProperty('toString')) object.toString = (function(s){return function(){return '[object '+s+']';};})(s);
					if (oExists) {
						console.warn('Overwriting '+s+' in '+namespace);
						extend(oBase[s],oExists);
					}
				//} else if (!oBase.hasOwnProperty(s)) {
				} else if (!Object.prototype.hasOwnProperty.call(oBase,s)) { // ie8 fix
					oBase[s] = {};
				}
				oBase = oBase[s];
			//} else if (oBase.hasOwnProperty(s)) {
			} else if (!Object.prototype.hasOwnProperty.call(oBase,s)) { // ie8 fix
				oBase = oBase[s];
			} else {
				return;
			}
		}
		return oBase;
	}

	/**
	 * Small utility method for quickly creating elements.
	 * @name iddqd.createElement
	 * @method
	 * @param {String} [type='div'] The element type
	 * @param {String|Array} classes An optional string or list of classes to be added
	 * @param {HTMLElement} parent An optional parent to add the element to
	 * @param {Function} click An optional click event handler
	 * @returns {HTMLElement} Returns the newly created element
	 */
	function createElement(type,classes,parent,attributes,text,click){
		var mElement = document.createElement(type||'div');
		if (attributes) for (var attr in attributes) mElement.setAttribute(attr,attributes[attr]);
		if (classes) {
			var oClassList = mElement.classList
				,aArguments = typeof(classes)==='string'?classes.split(' '):classes;
			oClassList.add.apply(oClassList,aArguments);
		}
		if (text) mElement.textContent = text;
		click&&mElement.addEventListener('click',click);
		parent&&parent.appendChild(mElement);
		return mElement;
	}

	/**
	 * Load javascript file
	 * @name iddqd.loadScript
	 * @method
	 * @param {String} src The source location of the file.
	 * @param {Function} [loadCallback=null] A callback function for when the file is loaded.
	 */
	function loadScript(src,loadCallback,errorCallback) {
		var mScript = document.createElement('script');
		mScript.src = src;
		if (loadCallback) mScript.addEventListener('load',loadCallback);
		if (errorCallback) mScript.addEventListener('error',errorCallback);
		(document.head||document.getElementsByTagName('head')[0]).appendChild(mScript);
	}

	/**
	 * Returns the number of milliseconds elapsed since unix epoch.
	 * @name iddqd.millis
	 * @method
	 * @returns {Number} Returns an integer or float depending on window.performance.now().
	 */
	function millis(){
		return window.performance&&window.performance.now?window.performance.now():Date.now();
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

	/**
	 * Throw an error if an object doesn't exist.
	 * @name iddqd.uses
	 * @method
	 * @param {Object} o The object to check.
	 * @param {string} [customError] The error message to throw.
	 */
	function uses(o,customError){
		if (o===undefined) throw new Error(customError||'\'o\' is undefined.');
		return o;
	}

	/**
	 * A helper method for factory return objects so one can determine what factory an object was created with.
	 * @param {Function} factoryMethod
	 * @param {object} [init]
	 * @returns {Object}
	 */
	function factory(factoryMethod,init){
		return extend(init||{},{factory:factory});
	}

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