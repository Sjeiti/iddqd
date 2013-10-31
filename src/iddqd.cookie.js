/* global iddqd */
iddqd.ns('iddqd.cookie',(function(){
	'use strict';
	function get(name,dfault) {
		if (dfault===undefined) dfault = null;
		var nameEQ = name+'=';
		var ca = document.cookie.split(';');
		for(var i=0;i<ca.length;i++) {
			var c = ca[i];
			while (c.charAt(0)==' ') c = c.substring(1,c.length);
			if (c.indexOf(nameEQ)===0) return c.substring(nameEQ.length,c.length);
		}
		return dfault;
	}
	function set(name,value,days) {
		var expires = '';
		if (days) {
			var date = new Date();
			date.setTime(date.getTime()+(days*24*60*60*1000));
			expires = ';expires='+date.toGMTString();
		}
		document.cookie = name+'='+value+expires+';path=/';
	}
	function clear(name) {
		set(name,'',-1);
	}
	function getO(name,dfault) {
		return JSON.parse(get(name,JSON.stringify(dfault)));
	}
	function setO(name,value,days) {
		set(name,JSON.stringify(value),days);
	}
	return {
		get: get
		,set: set
		,getO: getO
		,setO: setO
		,clear: clear
	};
})());
