/* global iddqd */
/**
 * @name number
 * @namespace iddqd.number
 * @version 1.0.0
 * @author Ron Valstar (http://www.sjeiti.com/)
 * @copyright Ron Valstar <ron@ronvalstar.nl>
 */
iddqd.ns('iddqd.number',(function(iddqd){
	'use strict';
	return {
		init: function(){
			delete iddqd.number.init;
			iddqd.extend(Number.prototype,iddqd.number);
		}
		/**
		 * Formats a number to the appropriate filesize notation
		 * @param {number} round The number of decimals to round by
		 * @returns {string} Filesize string result
		 */
		,formatSize: function(round) {
			var i, size = this;
			if (round===undefined) round = 0;
			var aSizes = ['B','kB','MB','GB','TB','PB','EB','ZB','YB'];
			for (i=0; size>1024&&(aSizes.length>=(i+2));i++) size /= 1024;
			var iMult = Math.pow(10,round);
			return (Math.round(size*iMult)/iMult)+aSizes[i];
		}
	};
})(iddqd));