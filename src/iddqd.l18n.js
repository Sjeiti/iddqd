/**
 * Locale functions
 * @namespace iddqd.l18n
 * @summary Locale functions
 */
iddqd.ns('iddqd.l18n',(function(undefined){
	'use strict';

	var extend = iddqd.extend
		,sLang = 'en'
		,oLang = {}
	;

	/**
	 * Initialise locale
	 * @param iso
	 * @param dictionaries
	 */
	function init(iso,dictionaries){
		set(iso);
		for (var dicIso in dictionaries) {
			dictionary(dicIso,dictionaries[dicIso]);
		}
	}

	/**
	 * Set current localse
	 * @param {string} iso
	 * @returns {string}
	 */
	function set(iso){
		sLang = iso;
		return sLang;
	}

	/**
	 * Set translations for a specific iso code
	 * @param iso
	 * @param translations
	 */
	function dictionary(iso,translations){
		if (oLang[iso]===undefined) {
			oLang[iso] = translations;
		} else {
			extend(oLang[iso],translations);
		}
	}

	/**
	 * Yes, it's l18n
	 * @param {string} s
	 * @returns {string}
	 * @memberof iddqd.l18n
	 * @method
	 * @public
	 */
	function __(s){
		return oLang.hasOwnProperty(sLang)&&oLang[sLang].hasOwnProperty(s)?oLang[sLang][s]:s;
	}

	return {
		__:__
		,init:init
		,set:set
		,dictionary:dictionary
	};
})());