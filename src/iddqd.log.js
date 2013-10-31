/* global iddqd */
/**
 * @name log
 * @namespace iddqd.log
 * @version 1.1.0
 * @author Ron Valstar (http://www.iddqd.nl/)
 * @requires iddqd
 */
iddqd.ns('iddqd.log',(function(rv){
	'use strict';
	var bEnabled = false
		,bNoConsole = (function(){
			var bNo = !(window.console&&window.console.log&&window.console.log.apply); // because new ie thinks old ie has more capabilities than it actually has
			if (bNo) window.console = {log:function(){}};
			return bNo;
		})()
		,mLog = bNoConsole?(function(){
			var m = document.createElement('textarea')
				,oStyle = m.style
				,oRules = {
					position: 'absolute'
					,right: '0'
					,bottom: '0'
					,width: '600px'
					,height: '300px'
					,zIndex: '500'
					,fontSize: '9px'
				}
			;
			m.setAttribute('class','log');
			for (var s in oRules) {
				var oVal = oRules[s];
				if (oStyle[s]!=oVal) oStyle[s] = oVal;
			}
		})():null
		,fnLog = !bNoConsole?(console.log.bind?
			console.log.bind(console)
		:function(){ // has console but no bind
			var sLog = '';
			for (var i=0,l=arguments.length;i<l;i++) sLog += arguments[i]+' ';
			console.log.apply(console,[sLog]);
		}):function(){ // no console
			var aText = mLog.innerText.split("\n");
			aText.unshift(Array.prototype.join.apply(arguments,[' ']));
			mLog.innerText = aText.join("\r");
		}
		,fnNull = function(){}
		,oExtend = {
			enable: function(){
				rv.log = fnLog;
				if (bNoConsole) document.body.appendChild(mLog);
				bEnabled = true;
				return bEnabled;
			}
			,disable: function(){
				rv.log = fnNull;
				if (bNoConsole) document.body.removeChild(mLog);
				bEnabled = false;
				return bEnabled;
			}
			,isEnabled: function(){
				return bEnabled;
			}
		}
	;
	rv.extend(fnLog,oExtend);
	rv.extend(fnNull,oExtend);
	oExtend.disable();
})(iddqd));