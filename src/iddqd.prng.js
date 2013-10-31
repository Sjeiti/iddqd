
// todo: document
iddqd.ns('iddqd.prng',(function(){
	var iMersenne = 2147483647
		,oReturn = {
			seed: 123
			,rnd: function(seed) {
				setSeed(seed);
				oReturn.seed = oReturn.seed*16807%iMersenne;
				return oReturn.seed;
			}
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