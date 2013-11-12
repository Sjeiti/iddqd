/**
 * A simple pseudo random number generator
 * @name prng
 * @namespace iddqd.prng
 */
iddqd.ns('iddqd.prng',(function(){
	'use strict';
	var iMersenne = 2147483647
		,oReturn = {
			/**
			 * The random seed
			 * @property
			 */
			seed: 123
			/**
			 * Generate random number between 0 and 2147483647
			 * @return {number}
			 */
			,rnd: function(seed) {
				setSeed(seed);
				oReturn.seed = oReturn.seed*16807%iMersenne;
				return oReturn.seed;
			}
			/**
			 * Generate random number between 0 and 1
			 * @return {number}
			 */
			,random: function(seed) {
				setSeed(seed);
				return oReturn.rnd()/iMersenne;
			}
		}
		,setSeed = function(seed){
			if (seed!==undefined) oReturn.seed = seed;
		}
	;
	return oReturn;
})());