/**
 * Signal implementation for various generic events.<br/>
 * Implements {@link http://millermedeiros.github.com/js-signals js-signals} by Miller Demeiros.<br/>
 * Signals can be created at their proper namespace or module by calling {@link iddqd.signals.create} (for instance see {@link iddqd.animate.js}).
 * @summary Signal implementation for various generic events.
 * @namespace iddqd.signals
 */
// * @requires signals.js http://millermedeiros.github.com/js-signals/
// * @requires iddqd.js
// * @requires iddqd.vector.js
// * @requires iddqd.capabilities.js

// todo: hammer.js

iddqd.ns('iddqd.signals',(function(iddqd,uses){
	'use strict';

	var signals = uses(window.signals,'signals.js is not included (http://millermedeiros.github.com/js-signals/)')
		,vector = uses(iddqd.math.vector)
		,oSignals = iddqd.signals = {}
		,fnEmpty = iddqd.fn
		,bTouch = iddqd.capabilities.touch
//		,requestAnimFrame = iddqd.requestAnimFrame
		,addEvent = iddqd.addEvent
		,loop = iddqd.loop
	;

	/**
	 * Creates a signal.<br/>
	 * The signals is dead (no events attached) until the first signal.add or signal.addOnce is called.<br/>
	 * @name iddqd.signals.create
	 * @method
	 * @param {String} name The name of the signal to add to the iddqd.signal namespace.
	 * @param {Function} init The initialisation method, called after the first signal.add or signal.addOnce.
	 * @returns {Signal} The signal
	 */
	iddqd.signals.create = createSignal;
	function createSignal(name,init){
		// todo: what if the signal already exists
		var oSignal = oSignals[name] = new signals.Signal()
			,fnTmpAdd = oSignal.add
			,fnTmpAddOnce = oSignal.addOnce
			,fnInited = function(){
				oSignal.add = fnTmpAdd;
				oSignal.addOnce = fnTmpAddOnce;
				init(oSignal);
			}
		;
		oSignal.add = function(){
			fnInited();
			return oSignal.add.apply(this,arguments);
		};
		oSignal.addOnce = function(){
			fnInited();
			return oSignal.addOnce.apply(this,arguments);
		};
		return oSignal;
	}

	// signals start here


	/**
	 * Dispatched when the DOM is ready.<br/>
	 * After dispatching any newly added functions will immediately be called.
	 * @name iddqd.signals.DOMReady
	 * @type Signal
	 */
	createSignal('DOMReady',function(signal){
		var fnDispatch = function(){
			// override 'add' and 'addOnce' before dispatch since DOMReady can only be fired once
			signal.add = signal.addOnce = function(fn){fn();};
			signal.dispatch();
		};
		if (document.addEventListener) {
			document.addEventListener('DOMContentLoaded',fnDispatch,false);
		} else document.onreadystatechange = function(){
			if (document.readyState=='interactive') fnDispatch();
		};
	});

	/**
	 * Dispatched when the readyState changes (mainly for finding state=='interactive', otherwise iddqd.signals.DOMReady suffices).<br/>
	 * The callback for this signal is Function(readyState)
	 * @name iddqd.signals.readyState
	 * @type Signal
	 */
	createSignal('readyState',function (signal) {
		document.onreadystatechange = function () {
			signal.dispatch(document.readyState);
		};
	});

		/**
		 * Dispatched when the viewport resizes.<br/>
		 * The callback for this signal is Function(oldWidth,oldHeight,newWidth,newHeight)
		 * @name iddqd.signals.resize
		 * @type Signal
		 */
		createSignal('resize',function(signal){
			var w = window,
				d = document,
				e = d.documentElement,
				g = d.getElementsByTagName('body')[0],
				iW = w.innerWidth || e.clientWidth || g.clientWidth,
				iH = w.innerHeight|| e.clientHeight|| g.clientHeight;
//			var iW = window.innerWidth
//				,iH = window.innerHeight;
			window.addEventListener('resize', function(e){
				var  iOldW = iW
					,iOldH = iH;
//				iW = window.innerWidth;
//				iH = window.innerHeight;
				iW = w.innerWidth || e.clientWidth || g.clientWidth;
				iH = w.innerHeight|| e.clientHeight|| g.clientHeight;
				signal.dispatch(iOldW,iOldH,iW,iH);
			},false);
		});

//	/**
//	 * Keyframe dispatcher using requestAnimFrame.<br/>
//	 * The callback for this signal is Function(deltaT)
//	 * @name iddqd.signals.animate
//	 * @type Signal
//	 */
//	createSignal('animate',function(signal){
//		var fDeltaT = 0
//			,iCurMillis
//			,iLastMillis = iddqd.millis()
//			,iMilliLen = 10
//			,aMillis = (function(a,n){
//				for (var i=0;i<iMilliLen;i++) a.push(n);
//				return a;
//			})([],iLastMillis);
//		function animate(){
//			iCurMillis = iddqd.millis();
//			aMillis.push(iCurMillis-iLastMillis);
//			aMillis.shift();
//			fDeltaT = 0;
//			for (var i=0;i<iMilliLen;i++) fDeltaT += aMillis[i];
//			iLastMillis = iCurMillis;
//			signal.dispatch(fDeltaT/iMilliLen,iCurMillis);
//			requestAnimFrame(animate);
//		}
//		animate();
//	});

	/**
	 * Wait a couple of frames before dispatching.
	 * @name iddqd.signals.frames
	 * @type Signal
	 */
	oSignals.frames = (function(){
		var fnAdd = function(fn,frames){
			var sgFrame = new signals.Signal()
				,fnCount = function(){
					frames--;
					if (frames<=0) {
						oSignals.animate.remove(fnCount);
						sgFrame.dispatch();
						sgFrame.dispose();
					}
				}
			;
			oSignals.animate.add(fnCount);
			return sgFrame.add(fn);
		};
		return {
			add: fnAdd
			,addOnce: fnAdd
		};
	})();
	/*createSignal('frames',function(signal){
		var fnOldAdd = signal.add
			,fnOldAddOnce = signal.addOnce
			,fnCount = function(){
				this.frames--;
				if (this.frames<=0) {
					oSignals.animate.remove(fnCount);
				}
			}
		;
		signal.add = signal.addOnce = function(fn,context){
			if (context===undefined) context = {frames:1}
		}
		oSignals.animate.add(fnCount);
//		signal.add = function(){};
//		var oSignal = oSignals[name] = new signals.Signal();
	});*/

	/**
	 * Dispatched when the device rotates.<br/>
	 * The callback for this signal is Function(oldOrientation,newOrientation)
	 * @name iddqd.signals.orientation
	 * @type Signal
	 */
	createSignal('orientation',function(signal){
		if(bTouch) {
			var iOrientation = window.orientation;
			addEvent(window,'orientationchange',function(){
				signal.dispatch(iOrientation,window.orientation);
				iOrientation = window.orientation;
			});
		}
	});

	/**
	 * Signal for mouseWheel.<br/>
	 * The callback for this signal is Function(wheelDelta)
	 * @name iddqd.signals.mousewheel
	 * @type Signal
	 */
	createSignal('mousewheel',function(signal){
		window.addEventListener('mousewheel',function(e){
			signal.dispatch(e.wheelDelta,e);
		},false);
	});

	/**
	 * Signal for scrolling.<br/>
	 * The callback for this signal is Function(document.body.scrollTop)
	 * @name iddqd.signals.scroll
	 * @type Signal
	 */
	createSignal('scroll',function(signal){
		window.addEventListener('scroll',function(e){
			signal.dispatch(e,document.body.scrollLeft,document.body.scrollTop);
		},false);
	});

	////////////////////////////////// keydown, keypress, keyup
	var aKeys = [];
	function keypress(){
		oSignals.keypress.dispatch(aKeys);
	}
	createSignal('keydown',function(signal){
		document.addEventListener('keydown',function(e){
			var iKeyCode = e.keyCode;
			aKeys[iKeyCode] = true;
			oSignals.animate.add(keypress);
			signal.dispatch(iKeyCode);
			//
			oSignals.keypress.add(fnEmpty).detach();
			oSignals.keyup.add(fnEmpty).detach();
		});
	});
	createSignal('keypress',function(){
		oSignals.keyup.add(fnEmpty).detach();
		oSignals.keydown.add(fnEmpty).detach();
	});
	createSignal('keyup',function(signal){
		document.addEventListener('keyup',function(e){
			var iKeyCode = e.keyCode;
			aKeys[iKeyCode] = false;
			oSignals.animate.remove(keypress);
			signal.dispatch(iKeyCode);
			//
			oSignals.keydown.add(fnEmpty).detach();
			oSignals.keypress.add(fnEmpty).detach();
		});
	});

//	////////////////////////////////// dragstart, dragmove, dragend
//	var iFakeId = 1
//		,touch = function(id,vpos) {
//			var oReturn = {
//					id: id
//					,pos: vpos.clone()
//					,start: vpos
//					,last: vpos.clone()
//					,update: update
//					,toString: function(){return '[object touch '+id+']'}
//				}
//			;
//			function update(x,y) {
//				oReturn.last.set(oReturn.pos.getX(),oReturn.pos.getY());
//				oReturn.pos.set(x,y);
//			}
//			return oReturn;
//		}
//	;
	//document.body
//	var oTouches = {}
//		,iDragTypeStart = 0
//		,iDragTypeDrag = 1
//		,iDragTypeEnd = 2
//	;
//	function hammerEventToTouches(e,type){
//		var aTouches = e.gesture.touches;
//		for (var i=0,l= aTouches.length;i<l;i++) {
//			var oTouch = aTouches[i]
//				,isMouse = Object.prototype.toString.call(oTouch)=='[object MouseEvent]'
//			;
//			if (!oTouch.hasOwnProperty('id')) {
//				oTouch.id = isMouse?1:iFakeId++;
//				oTouch.pos = vector(oTouch.x,oTouch.y);
//				oTouch.start = oTouch.pos.clone();
//				oTouch.last = oTouch.pos.clone();
//				oTouches[oTouch.id] = oTouch;
//			}
//			console.log('e',e); // log
//			if (type===iDragTypeStart) {
//			} else if (type===iDragTypeDrag) {
//			} else if (type===iDragTypeEnd) {
//			}
//		}
//		return oTouches;
//	}
//	createSignal('drag',function(signal){
//		Hammer(document).on('drag', function(e) {
//			signal.dispatch(hammerEventToTouches(e,iDragTypeDrag));
//		});
//	});
//	oSignals.drag.touch = touch;
//	createSignal('dragstart',function(signal){
//		Hammer(document).on('dragstart', function(e) {
//			signal.dispatch(hammerEventToTouches(e,iDragTypeStart));
//		});
//	});
//	createSignal('dragend',function(signal){
//		Hammer(document).on('dragend', function(e) {
//			signal.dispatch(hammerEventToTouches(e,iDragTypeEnd));
//		});
//	});
	/*createSignal('dragstart',function(signal){
		Hammer(document).on('dragstart', function(e) {
			var aTouches = e.gesture.touches
					,oTouches = {};
			for (var i=0,l= aTouches.length;i<l;i++) {
				var oTouch = aTouches[i];
				//console.log('oTouch',oTouch); // log
				//for (var s in oTouch) {
				//	console.log('s '+s); // log
				//}
				if (Object.prototype.toString.call(oTouch=='[object MouseEvent]')) {
					oTouch.id = 1;
					oTouch.pos = vector(oTouch.x,oTouch.y);
					oTouch.start = oTouch.pos.clone();
					oTouch.last = oTouch.pos.clone();
					oTouches[oTouch.id] = oTouch;
				}
			}
			signal.dispatch(oTouches);
		});
	});*/
	/*createSignal('dragend',function(signal){
		Hammer(document).on('dragend', function(e) {
			var aTouches = e.gesture.touches
					,oTouches = {};
			for (var i=0,l= aTouches.length;i<l;i++) {
				var oTouch = aTouches[i];
				if (Object.prototype.toString.call(oTouch=='[object MouseEvent]')) {
					oTouch.id = 1;
					oTouch.pos = vector(oTouch.x,oTouch.y);
					oTouches[oTouch.id] = oTouch;
				}
			}
			signal.dispatch(oTouches);
		});
	});*/
//	createSignal('drag',function(signal){
//		iddqd.onDOMReady(function(){
//			Hammer(document.body).on('drag', function(e) {
//				console.log('drag',e); // log
////				signal.dispatch(e.gesture.touches);
//			});
//		});
//	});
//	iddqd.onDOMReady(function(){
//		createSignal('drag',function(signal){
//			Hammer(document.body).on('drag', function(e) {
//				console.log('drag',e); // log
////				signal.dispatch(e.gesture.touches);
//			});
//		});
//	oSignals.drag.touch = touch;
//	});
////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////
	////////////////////////////////// dragstart, dragmove, dragend
	var touch = function(id,vpos) {
			var oReturn = {
				id: id
				,pos: vpos.clone()
				,start: vpos
				,last: vpos.clone()
				,update: update
				,toString: function(){return '[object touch '+id+']';}
			};
			function update(x,y) {
				oReturn.last.set(oReturn.pos.getX(),oReturn.pos.getY());
				oReturn.pos.set(x,y);
			}
			return oReturn;
		}
		,iFakeId = 0
		,bInited = false
		,fnInit = function(){
			if (!bInited) {
//					console.log('init',bTouch); // log
				document.addEventListener('mousemove',handleDrag,false);
				document.addEventListener('mousedown',handleDrag,false);
				document.addEventListener('mouseup',handleDrag,false);
				if (bTouch) {
//						alert('document.body'+(!!document.body)); // log
//						addEvent(document.body,'touchstart,touchmove,touchend',handleDrag);
					document.body.ontouchstart = document.body.ontouchmove = document.body.ontouchend = handleDrag;
					// disable scaling
					var oViewport = document.querySelectorAll('meta[name=viewport]')[0];
					document.body.ongesturestart = function(){ // todo: check if optional
						oViewport.content = 'width=device-width,minimum-scale=1.0,maximum-scale=1.0,user-scalable=no';
						return false;
					};
				}
				bInited = true;
				oSignals.dragstart.add(fnEmpty).detach();
				oSignals.drag.add(fnEmpty).detach();
				oSignals.dragend.add(fnEmpty).detach();
			}
		}
		,oTouches = {
			length: 0
			,add: function(touch){
				this[touch.id] = touch;
				this.length++;
				return touch;
			}
			,remove: function(id){
				var touch = this[id];
				delete this[id];
				this.length--;
				return touch;
			}
		}
	;
	/**
	 * Signal for start of drag.<br/>
	 * The callback for this signal is Function(oAdd,oTouches)
	 * @name iddqd.signals.dragstart
	 * @type Signal
	 */
	createSignal('dragstart',fnInit);
	/**
	 * Signal for dragging.<br/>
	 * The callback for this signal is Function(oTouches)
	 * @name iddqd.signals.drag
	 * @type Signal
	 */
	createSignal('drag',fnInit);
	/**
	 * Signal for end of drag.<br/>
	 * The callback for this signal is Function(oDelete,oTouches)
	 * @name iddqd.signals.drag
	 * @type Signal
	 */
	createSignal('dragend',fnInit);
	/**
	 * Stop page scrolling when dragging
	 * @name iddqd.signals.drag.stopPageScroll
	 * @type Boolean
	 */
	oSignals.drag.stopPageScroll = true;
	// todo: add doc comment
	oSignals.drag.touch = touch;
	function handleDrag(e){
		var bReturn = true
			,isMouse = Object.prototype.toString.call(e)=='[object MouseEvent]'
		;
		bTouch = !isMouse;
		console.log('bTouch',bTouch,isMouse); // log
		switch (e.type) {
			case 'mousedown': case 'touchstart':
				var oAdd = {};
				if (bTouch) {
					/*console.log(
						 ' oAdd:'+!!oAdd
						+' oTouches:'+!!oTouches
						+' touch:'+!!touch
						+' vector:'+!!vector
						+' loop:'+!!loop
						+' e:'+!!e
					);*/
					/*for (var s in e.changedTouches) {
						if (e.changedTouches.hasOwnProperty(s)) {
							console.log('__'+s+' '+e.changedTouches[s]); // log;
						}
					}*/
					loop(e.changedTouches,function(i,o){
						/*console.log(
							 ' i:'+i
							+' o:'+o
							+' o.pageX:'+!!o.pageX
							+' touch:'+!!touch
						);*/
						if (typeof o!='object') return;
						var id = o.identifier;
						oAdd[id] = oTouches.add(touch(id,vector(o.pageX,o.pageY)));
					});
				} else {
					iFakeId++;
					/*console.log(
						"\n\r",'oAdd',oAdd
						,"\n\r",'oTouches',oTouches
						,"\n\r",'touch',touch
						,"\n\r",'vector',vector
					); // log*/
					oAdd[iFakeId] = oTouches.add(touch(iFakeId,vector(e.pageX,e.pageY)));
				}
				oSignals.dragstart.dispatch(oAdd,oTouches);
			break;
			case 'mouseup': case 'touchend':
				var oDelete = {};
				if (bTouch) {
					loop(e.changedTouches,function(i,o){
						if (typeof o!='object') return;
						var id = o.identifier;
						oDelete[id] = oTouches.remove(id);
					});
				} else {
					oDelete[iFakeId] = oTouches.remove(iFakeId);
				}
				/*if (!bTouch&&oTouches.length) {
					loop(e.oTouches,function(i,o){
						if (typeof o!='object') return;
						var id = o.identifier;
						oDelete[id] = oTouches.remove(id);
					});
				}*/
				oSignals.dragend.dispatch(oDelete,oTouches);
			break;
			case 'mousemove': case 'touchmove':
				if (bTouch) {
					loop(e.touches,function(i,o){
						if (typeof o!='object') return;
						var oTouch = oTouches[o.identifier];
						oTouch.update(o.pageX,o.pageY);
					});
				} else {
					var oTouch = oTouches[iFakeId];
					if (oTouch!==undefined) oTouch.update(e.pageX,e.pageY);
				}
				if (oTouches.length>0) oSignals.drag.dispatch(oTouches);
				bReturn = false;
			break;
			default: console.log(e.type,e);
		}
		if (bTouch&&e.touches&&e.touches.length!==oTouches.length) checkForOrphans(e.touches);
		return !oSignals.drag.stopPageScroll||bReturn;
	}
	function checkForOrphans(touches){
		var aIds = [];
		loop(touches,function(i,o){
			aIds.push(o.identifier);
		});
		var oDead = {};
		loop(oTouches,function(id,o){
			if (aIds.indexOf(parseInt(id,10))===-1) {
				oDead[id] = o;
				oTouches.remove(id);
//					delete oTouches[id];
//					iTouchNum--;
			}
		});
		oSignals.dragend.dispatch(oDead,touches);
	}

//		/**
//		 * Signal for simple swipe gesture.<br/>
//		 * The callback for this signal is Function(direction,length)
//		 * @name iddqd.signals.swipe
//		 * @type Signal
//		 */
//	createSignal('swipe',function(signal){
//			oSignals.dragstart.add(function(added,touches){
//				console.log('dragend',added,touches); // log
//			});
//			oSignals.dragend.add(function(deleted,touches){
//				console.log('dragend',deleted,touches); // log
//			});
//	});

	/**
	 * Signal for hash change.<br/>
	 * The callback for this signal is Function(oldHash,newHash)
	 * @name iddqd.signals.hash
	 * @type Signal
	 */
	createSignal('hash',function(signal){
		var oLoc = window.location
			,sHash = oLoc.hash.substr(1);
		window.addEventListener('hashchange',function(){
			var sOldHash = sHash;
			sHash = oLoc.hash.substr(1);
			signal.dispatch(sOldHash,sHash);
		},false);
	});
})(iddqd,iddqd.uses));
