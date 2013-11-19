/**
 * A simple seeded pseudo random number generator
 * @namespace iddqd.math.prng
 * @summary A simple seeded pseudo random number generator
 */
iddqd.ns('iddqd.math.prng',(function(){
	'use strict';
	var iMersenne = 2147483647
		,oReturn = {
			/**
			 * The random seed
			 * @memberof iddqd.math.prng
			 * @type {number}
			 */
			seed: 123
			/**
			 * Generate random number between 0 and 2147483647
			 * @name iddqd.math.prng.rnd
			 * @method
			 * @return {number} An integer between 0 and 2147483647
			 */
			,rnd: function(seed) {
				setSeed(seed);
				oReturn.seed = oReturn.seed*16807%iMersenne;
				return oReturn.seed;
			}
			/**
			 * Generate random number between 0 and 1
			 * @name iddqd.math.prng.random
			 * @method
			 * @return {number} A floating point between 0 and 1
			 */
			,random: function(seed) {
				setSeed(seed);
				return oReturn.rnd()/iMersenne;
			}
		}
	;
	function setSeed(seed){
		if (seed!==undefined) oReturn.seed = seed;
	}
	return oReturn;
})());