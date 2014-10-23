/**
 * Convert jsdoc comments to object
 * @param source source file
 * @returns {{title: *}} jsdoc as object
 */
module.exports = function() {
	'use strict';
	return 	function readBanner(source){
		var fs = require('fs')
			,sBanner = source.match(/\/\*\*([\s\S]*?)\*\//g)[0]
			,aLines = sBanner.split(/[\n\r]/g)
			,aMatchName = sBanner.match(/(\s?\*\s?([^@]+))/g)
			,sName = aMatchName.shift().replace(/[\/\*\s\r\n]+/g,' ').trim()
			,oBanner = {title:sName};
		for (var i = 0, l = aLines.length; i<l; i++) {
			var sLine = aLines[i]
				,aMatchKey = sLine.match(/(\s?\*\s?@([^\s]*))/);
			if (aMatchKey) {
				var sKey = aMatchKey[2];
				oBanner[sKey] = sLine.split(sKey).pop().trim();
			}
		}
		return oBanner;
	};
};