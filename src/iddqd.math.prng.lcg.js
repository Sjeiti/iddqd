/**
 * Implementation of a linear congruential generator.
 * Multiplier, increment and modulus can be set seperately or via one of the presets.
 * By default the Lehmer prng is used
 * @namespace iddqd.math.prng
 * @summary A simple seeded pseudo random number generator
 */
iddqd.ns('iddqd.math.prng.lcg',(function(){
	'use strict';
	// linear congruential generator
	//x=(a*x+c)%n
	var a = 48271 // multiplier
		,c = 0 // increment
		,m = 2147483647 // modulus
		,iSeed = 123
		,oReturn = {
			rnd: rnd
			,random: random
			//
			,setMultiplier: setMultiplier
			,setIncrement: setIncrement
			,setModulus: setModulus
			//
			,getMultiplier: getMultiplier
			,getIncrement: getIncrement
			,getModulus: getModulus
			//
			,setSeed: setSeed
			//
			,presetLehmer: presetLehmer
			,presetJava: presetJava
			,presetNumeralRecipes: presetNumeralRecipes
		};
	function rnd(seed,iterate) {
		if (seed!==undefined) iSeed = seed;
		if (iterate===undefined) iterate = 1;
		while (iterate--) iSeed = (a*iSeed+c)%m;
		return iSeed;
	}
	function random(seed,iterate) {
		return rnd(seed,iterate)/m;
	}
	function setMultiplier(i){	a = i; }
	function setIncrement(i){	c = i; }
	function setModulus(i){		m = i; }
	function getMultiplier(){	return a; }
	function getIncrement(){	return c; }
	function getModulus(){		return m; }
	function setSeed(seed) {	iSeed = seed; }
	function presetLehmer(minstd) {
		a = minstd?16807:48271;
		c = 0;
		m = 2147483647; // 2E31-1 mersenne prime
		return oReturn;
	}
	function presetJava() {
		a = 25214903917;
		c = 11;
		m = 2E48;
		return oReturn;
	}
	function presetNumeralRecipes() {
		a = 1664525;
		c = 1013904223;
		m = 2E32;
		return oReturn;
	}
	return oReturn;
})());