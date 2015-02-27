/**
 * @summary Cookie methods
 * @namespace iddqd.storage.cookie
 */
iddqd.ns('iddqd.storage.cookie',(function(){
	'use strict';
	/**
	 * Retreives a cookie.
	 * If the cookie doesn't exist it creates one with the default value.
	 * @method iddqd.storage.cookie.get
	 * @param {String} name Cookie name
	 * @param {String} defaultValue The default value of the cookie
	 * @returns {String}
	 */
	function get(name,defaultValue) {
		//if (defaultValue===undefined) defaultValue = null;
		var nameEQ = name+'=';
		var ca = document.cookie.split(';');
		for(var i=0;i<ca.length;i++) {
			var c = ca[i];
			while (c.charAt(0)==' ') c = c.substring(1,c.length);
			if (c.indexOf(nameEQ)===0) return c.substring(nameEQ.length,c.length);
		}
		return defaultValue;
	}

	/**
	 * Stores a cookie.
	 * @method iddqd.storage.cookie.set
	 * @param {String} name The cookie name
	 * @param {String} value The cookie value
	 * @param {Number} [days] Number of days to store a cookie, session if left empty.
	 */
	function set(name,value,days) {
		var expires = '';
		if (days) {
			var date = new Date();
			date.setTime(date.getTime()+(days*24*60*60*1000));
			expires = ';expires='+date.toGMTString();
		}
		document.cookie = name+'='+value+expires+';path=/';
		return value;
	}

	/**
	 * Removes a cookie
	 * @method iddqd.storage.cookie.clear
	 * @param {String} name The cookie name
	 */
	function clear(name) {
		set(name,'',-1);
	}
	/**
	 * Retreives a cookie.
	 * Similar to {@link iddqd.storage.cookie.get get} but returns an object
	 * @method iddqd.storage.cookie.getO
	 * @param {String} name Cookie name
	 * @param {Object} defaultValue The default value of the cookie
	 * @returns {Object}
	 */
	function getO(name,defaultValue) { // todo: rem and add to get by default
		return JSON.parse(get(name,JSON.stringify(defaultValue)));
	}

	/**
	 * Stores a cookie.
	 * Similar to {@link iddqd.storage.cookie.set set} but stores an object
	 * @method iddqd.storage.cookie.setO
	 * @param {String} name The cookie name
	 * @param {Object} value The cookie value
	 * @param {Number} [days] Number of days to store a cookie, session if left empty.
	 */
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
