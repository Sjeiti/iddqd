/**
 * A simple pseudo random number generator
 * @namespace iddqd.prng
 */
iddqd.ns('iddqd.prng',(function(){
	'use strict';
	var iMersenne = 2147483647
		,oReturn = {
			/**
			 * The random seed
			 * @name iddqd.prng.seed
			 * @type {number}
			 */
			seed: 123
			/**
			 * Generate random number between 0 and 2147483647
			 * @name iddqd.prng.rnd
			 * @method
			 * @return {number}
			 */
			,rnd: function(seed) {
				setSeed(seed);
				oReturn.seed = oReturn.seed*16807%iMersenne;
				return oReturn.seed;
			}
			/**
			 * Generate random number between 0 and 1
			 * @name iddqd.prng.random
			 * @method
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