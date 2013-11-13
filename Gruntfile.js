/* global module */
/* global require */
module.exports = function (grunt) {
	/* jshint strict: false */

	var fs = require('fs')

		,sPackage = 'package.json'
		,oPackage = grunt.file.readJSON(sPackage)
		,sJsDoc = 'jsdoc_template/jsdoc.conf.json'
		,oJsDoc = grunt.file.readJSON(sJsDoc)
		,aFiles = [
			'src/iddqd.js'
			,'src/iddqd.type.js'
			,'src/iddqd.json.js'
			,'src/iddqd.native.string.js'
			,'src/iddqd.host.node.js'
			,'src/iddqd.signals.js'
			,'src/iddqd.prng.js'
		]
		,sMain = fs.readFileSync(aFiles[0]).toString()
		,oBanner = readBanner(sMain)
	;

	// update package.json with jsdoc data
	var oMap = {namespace:'name',name:'title',title:'description'};
	for (var bannerKey in oBanner) {
		var sPackageKey = oMap[bannerKey]||bannerKey
			,oValP = oPackage[sPackageKey]
			,oValB = oBanner[bannerKey];
		if (oValP!==undefined&&oValP!==oValB) {
			grunt.log.writeln('Updated package '+sPackageKey+' from',oValP,'to',oValB,' (',sPackage,')');
			oPackage[sPackageKey] = oValB;
		}
		fs.writeFileSync(sPackage,JSON.stringify(oPackage,null,'\t'));
	}

	// update jsdoc.conf.json with jsdoc data
	oJsDoc.templates.systemName = oBanner.name;
	oJsDoc.templates.copyright = oBanner.copyright;
	oJsDoc.templates.theme = 'sjeiti';
	// ok: Flatly Spacelab Cerulean United
	// not ok: Amelia Cosmo Cyborg Journal Readable Simplex Slate Superhero Spruce
	fs.writeFileSync(sJsDoc,JSON.stringify(oJsDoc,null,'\t'));


	/**
	 * Convert initial jsdoc comments to object
	 * @param source source file
	 * @returns {{title: *}} jsdoc as object
	 */
	function readBanner(source){
		var sBanner = source.match(/\/\*\*([\s\S]*?)\*\//g)[0]
			,aLines = sBanner.split(/[\n\r]/g)
			,aMatchName = sBanner.match(/(\s?\*\s?([^@]+))/g)
			,sName = aMatchName.shift().replace(/[\/\*\s\r\n]+/g,' ').trim()
			,oBanner = {title:sName};
		for (var i = 0, l = aLines.length; i<l; i++) {
			var sLine = aLines[i]
				,aMatchKey = sLine.match(/(\s?\*\s?@([^\s]*))/);
			if (aMatchKey) {
				var sKey = aMatchKey[2];
				oBanner[sKey] = sLine.split(sKey).pop().trim();
			}
		}
		return oBanner;
	}


	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),

		jshint: {
			options: { jshintrc: '.jshintrc' },
			files: aFiles
		},

		jsdoc : {
			dist : {
				src: aFiles,
				options: {
					destination: 'doc'
					,template: 'jsdoc_template'
					,configure: sJsDoc
					,mainpagetitle: 'harhar' // todo find out why this has no effect
					,readme: 'README.md'
				}
			}
		}
	});

	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-jsdoc');

	grunt.registerTask('default',['jshint','jsdoc']);

};
