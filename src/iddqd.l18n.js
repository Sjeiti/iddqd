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
	 * @memberof iddqd.l18n
	 * @method
	 * @public
	 */
	function init(iso,dictionaries){
		set(iso);
		for (var dicIso in dictionaries) {
			addISO(dicIso,dictionaries[dicIso]);
		}
	}

	/**
	 * Set current locale
	 * @param {string} iso
	 * @returns {string}
	 * @memberof iddqd.l18n
	 * @method
	 * @public
	 */
	function set(iso){
		sLang = iso;
		return sLang;
	}

	/**
	 * Adds a translation to the lang namespace.
	 * @param {string} iso The language ISO code (ie 'en', not 'en_US')
	 * @param {string} key The l18n key
	 * @param {string} text The translation
	 * @memberof iddqd.l18n
	 * @method
	 * @public
	 */
	function add(iso,key,text){
		if (!oLang.hasOwnProperty(iso)) oLang[iso] = {};
		oLang[iso][key] = text;
	}

	/**
	 * Set translations for a specific iso code.
	 * Existing translations will be overwritten if the iso already exists.
	 * @param iso
	 * @param translations
	 * @memberof iddqd.l18n
	 * @method
	 * @public
	 */
	function addISO(iso,translations){
		if (oLang[iso]===undefined) {
			oLang[iso] = translations;
		} else {
			extend(oLang[iso],translations,true);
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
		,add:add
		,addISO:addISO
	};
})());