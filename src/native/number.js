/**
 * Number methods
 * @module native/number
 */

/**
 * Formats a number to the appropriate filesize notation
 * @param {number} number The number to format
 * @param {number} round The number of decimals to round by
 * @returns {string} Filesize string result
 */
export function formatSize(number,round) {
	var i, size = number;
	if (round===undefined) round = 0;
	var aSizes = ['B','kB','MB','GB','TB','PB','EB','ZB','YB'];
	for (i = 0; size>1024 && (aSizes.length>=(i + 2)); i++) size /= 1024;
	var iMult = Math.pow(10,round);
	return (Math.round(size * iMult) / iMult) + aSizes[i];
}