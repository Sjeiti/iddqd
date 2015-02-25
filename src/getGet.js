/**
 * Returns get vars as a cached object literal
 * @name getGet
 * @method
 * @return {Object} A key/value object.
 */
module.exports = (function(){
	var bGetget = false, oGetget = {};
	return function(){ // todo typecast * @param {Boolean} [typecast=true] Tries to guess the type.
		if (!bGetget) {
			var aPairs = location.search.substr(1).split('&');
			for (var i=0,l=aPairs.length;i<l;i++) {
				var aKeyValue = aPairs[i].split('=');
				oGetget[aKeyValue.shift()] = aKeyValue.join('=');
			}
			bGetget = true;
		}
		return oGetget;
	};
})();