/**
 * Signal for start of drag.<br/>
 * The callback for this signal is Function(oAdd,oTouches)
 * @name iddqd.signal.dragstart
 * @type Signal
 */
/**
 * Signal for dragging.<br/>
 * The callback for this signal is Function(oTouches)
 * @name iddqd.signal.drag
 * @type Signal
 */
/**
 * Signal for end of drag.<br/>
 * The callback for this signal is Function(oDelete,oTouches)
 * @name iddqd.signal.dragend
 * @type Signal
 */
/**
 * Stop page scrolling when dragging
 * @name iddqd.signal.drag.stopPageScroll
 * @type Boolean
 */
/**
 * todo: ?
 * @name iddqd.signal.drag.touch
 * @type Function
 */
iddqd.ns('iddqd.signal.drag',(function(){
	'use strict';

	var uses = iddqd.uses
		,signal = uses(iddqd.signal)
		,vector = uses(iddqd.math.vector)
		,bTouch = uses(iddqd.capabilities.touch)
		,fn = iddqd.fn
		,loop = iddqd.loop
		,extend = iddqd.extend
		,iFakeId = 0
		,bInited = false
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
				//this.length--;
				this.length = Math.max(this.length-1,0);
				return touch;
			}
		}
	;
	extend(signal,{
		dragstart: signal(init)
		,drag: extend(signal(init),{
			stopPageScroll: false
			,touch: touch
		})
		,dragend: signal(init)
	});

	/**
	 * Initialise event listeners
	 */
	function init(){
		if (!bInited) {
			var mBody = document.body;
			document.addEventListener('mousemove',handleDrag,false);
			document.addEventListener('mousedown',handleDrag,false);
			document.addEventListener('mouseup',handleDrag,false);
			if (bTouch) {
				mBody.ontouchstart = mBody.ontouchmove = mBody.ontouchend = handleDrag;
				// disable scaling // todo: check if optional
				/*var oViewport = document.querySelectorAll('meta[name=viewport]')[0];
				mBody.ongesturestart = function(){
					oViewport.content = 'width=device-width,minimum-scale=1.0,maximum-scale=1.0,user-scalable=no';
					return false;
				};*/
			}
			bInited = true;
			signal.dragstart.add(fn).detach();
			signal.drag.add(fn).detach();
			signal.dragend.add(fn).detach();
		}
	}

	/**
	 * Handles event for both touch and
	 * @param e
	 * @returns {boolean}
	 */
	function handleDrag(e){
		//e.preventDefault();
		var bReturn = true
			,isMouse = Object.prototype.toString.call(e)=='[object MouseEvent]'// is ['touchstart'...].indexOf(e.type) faster?
		;
		bTouch = !isMouse;
		//console.log('handleDrag: bTouch',bTouch,'isMouse',isMouse,'type',e.type); // log
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
					loop(e.changedTouches,function(o){
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
				signal.dragstart.dispatch(oAdd,oTouches,e);
			break;
			case 'mouseup': case 'touchend':
				var oDelete = {};
				if (bTouch) {
					loop(e.changedTouches,function(o){
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
				signal.dragend.dispatch(oDelete,oTouches,e);
			break;
			case 'mousemove': case 'touchmove':
				if (bTouch) {
					loop(e.touches,function(o){
						if (typeof o!='object') return;
						var oTouch = oTouches[o.identifier];
						oTouch.update(o.pageX,o.pageY);
					});
				} else {
					var oTouch = oTouches[iFakeId];
					if (oTouch!==undefined) oTouch.update(e.pageX,e.pageY);
				}
				if (oTouches.length>0) signal.drag.dispatch(oTouches,e);
				bReturn = false;
			break;
			default: console.log(e.type,e);
		}
		if (bTouch&&e.touches&&e.touches.length!==oTouches.length) checkForOrphans(e.touches);
		return !signal.drag.stopPageScroll||bReturn;
	}

	/**
	 *
	 * @param id
	 * @param vpos
	 * @returns {{id: *, pos: (*|Object|Mixed), start: *, last: (*|Object|Mixed), update: update, toString: toString}}
	 */
	function touch(id,vpos) {
		var oReturn = {
			id: id,pos: vpos.clone(),start: vpos,last: vpos.clone(),update: update,toString: function () {
				return '[object touch ' + id + ']';
			}
		};

		function update(x,y) {
			oReturn.last.set(oReturn.pos.getX(),oReturn.pos.getY());
			oReturn.pos.set(x,y);
		}

		return oReturn;
	}

	/**
	 *
	 * @param touches
	 */
	function checkForOrphans(touches){
		var aIds = [];
		loop(touches,function(o){
			aIds.push(o.identifier);
		});
		var oDead = {};
		loop(oTouches,function(o,id){
			if (aIds.indexOf(parseInt(id,10))===-1) {
				oDead[id] = o;
				oTouches.remove&&oTouches.remove(id); // todo: check
					//delete oTouches[id];
					//iTouchNum--;
			}
		});
		signal.dragend.dispatch(oDead,touches);
	}

})());