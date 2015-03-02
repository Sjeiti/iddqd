/**
 * Wrapper namespace for keyboard signals.<br/>
 * Is really an Array containing pressed keycodes.
 * @namespace iddqd.signal.key
 * @summary Wrapper namespace for keyboard signals.
 */
iddqd.ns('iddqd.signal.key',(function(){
	'use strict';

	var fn = iddqd.fn
		,signal = iddqd.signal
		,animate = signal.animate
		,eLastKeyDown
		,bInit = false
		/**
		 * Signal for keyPress.<br/>
		 * The callback for this signal is Function(keys,event)
		 * @name iddqd.signal.keypress
		 * @type Signal
		 */
		,press = signal(init)
		/**
		 * Signal for keyDown.<br/>
		 * The callback for this signal is Function(keyCode,keys,event)
		 * @name iddqd.signal.keydown
		 * @type Signal
		 */
		,down = signal(initDown)
		/**
		 * Signal for keyUp.<br/>
		 * The callback for this signal is Function(keyCode,keys,event)
		 * @name iddqd.signal.keyup
		 * @type Signal
		 */
		,up = signal(initUp)
		//
		,key = iddqd.extend([],{
			press: press
			,down: down
			,up: up
		})
	;
	function init(){
		if (!bInit) {
			bInit = true;
			up.add(fn).detach();
			press.add(fn).detach();
			down.add(fn).detach();
		}
	}
	function initDown(signal){
		init();
		document.addEventListener('keydown',function(e){
			var iKeyCode = e.keyCode;
			key[iKeyCode] = true;
			eLastKeyDown = e;
			signal.dispatch(iKeyCode,key,e);
			animate.add(keypress);
		});
	}
	function initUp(signal){
		init();
		document.addEventListener('keyup',function(e){
			var iKeyCode = e.keyCode;
			key[iKeyCode] = false;
			animate.remove(keypress);
			signal.dispatch(iKeyCode,key,e);
		});
	}
	function keypress(){
		press.dispatch(key,eLastKeyDown);
	}
	return key;
})());