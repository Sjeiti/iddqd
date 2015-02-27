/**
 * Number methods
 * @namespace iddqd.internal.native.number
 */
iddqd.ns('iddqd.internal.native.number',(function (internal) {
	'use strict';
	return internal(Number,{
		/**
		 * Formats a number to the appropriate filesize notation
		 * @name iddqd.internal.native.number.formatSize
		 * @method
		 * @param {number} round The number of decimals to round by
		 * @returns {string} Filesize string result
		 */
		formatSize: function (round) {
			var i, size = this;
			if (round===undefined) round = 0;
			var aSizes = ['B','kB','MB','GB','TB','PB','EB','ZB','YB'];
			for (i = 0; size>1024 && (aSizes.length>=(i + 2)); i++) size /= 1024;
			var iMult = Math.pow(10,round);
			return (Math.round(size * iMult) / iMult) + aSizes[i];
		}
	});
})(iddqd.internal));