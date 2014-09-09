/*
f	move forward
-	turn left
+	turn right
[	push current state
]	pop last saved state
a..z	variable
*/

/*
 * @param {String} axiom
 * @returns {Object} l-system
 */
iddqd.ns('iddqd.utils.lsystem',function(axiom) {
	'use strict';

	var random = Math.random
		,sAxiom = axiom
		,aAxiom = [axiom]
		,oRules = {}
		,iGeneration = 0
		//
		,oReturn = {
			addRule: addRule
			,step: step
			,reset: reset
			,setPrng: setPrng
			,toString: function(){return '[object lsystem '+axiom+']';}
		}
	;

	/*
	 * @param {String} id
	 * @param {Object} rule
	 * @returns {Object} l-system
	 */
	function addRule(id, rule) {
		oRules[id] = rule;
		return oReturn;
	}

	/*
	 * @param {Number} step
	 * @returns {String} axiom
	 */
	function step(numstep) {
		if (numstep===undefined) numstep = 1;
		for (var i=0;i<numstep;i++) generate();
		return sAxiom;
	}

	/*
	 * @returns {Object} l-system
	 */
	function reset() {
		sAxiom = aAxiom[0];
		aAxiom = [sAxiom];
		iGeneration = 0;
		return oReturn;
	}

	/*
	 * @param {Function} rand
	 * @returns {Object} l-system
	 */
	function setPrng(rand) {
		random = rand;
		return oReturn;
	}

	/*
	 */
	function generate() {
		var aAxiomSplit = sAxiom.split('')
			,sAxiomNew = '';
		for (var i=0,l=aAxiomSplit.length;i<l;i++) {
			var sChar = aAxiomSplit[i];
			if (oRules.hasOwnProperty(sChar)) {
				var oRule = oRules[sChar] // "A":{"AB":0.75, "A":0.25}
					,fRand = random()
					,iCnt = 0;
				if (typeof(oRule)==='string') {
					sChar = oRule;
				} else {
					for (var sReplace in oRule) { // todo: better rand
						iCnt += oRule[sReplace];
						if (fRand<iCnt) {
							sChar = sReplace;
							break;
						}
					}
				}
			}
			sAxiomNew += sChar;
		}
		iGeneration++;
		sAxiom = sAxiomNew;
		aAxiom.push(sAxiom);
		//trace("sAxiomNew: "+iGeneration+" "+sAxiom);
	}
	
	return oReturn;
});