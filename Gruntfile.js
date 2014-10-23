/* global module */
/* global require */
module.exports = function (grunt) {
	/* jshint strict: false */

    // Load grunt tasks automatically
    require('load-grunt-tasks')(grunt);
	grunt.loadTasks('gruntTasks');

	var aFiles = [
			// todo: cryptography

			'src/iddqd.js'

			,'src/iddqd.pattern.js'
			,'src/iddqd.signals.js'

			,'src/iddqd.type.js'

			,'src/iddqd.animate.js'

			,'src/iddqd.internal.js'
			,'src/iddqd.internal.host.canvasrenderingcontext2d.js'
			,'src/iddqd.internal.host.htmlelement.js'
			,'src/iddqd.internal.host.node.js'
			,'src/iddqd.internal.native.array.js'
			,'src/iddqd.internal.native.number.js'
			,'src/iddqd.internal.native.object.js'
			,'src/iddqd.internal.native.string.js'

			,'src/iddqd.math.prng.js'
			,'src/iddqd.math.vector.js'
			,'src/iddqd.math.color.js'

			,'src/iddqd.network.jsonp.js'
			,'src/iddqd.network.xhttp.js'

			,'src/iddqd.storage.js'
			,'src/iddqd.storage.cookie.js'

			,'src/iddqd.ui.scroll.js' // todo: not scroll

			// data
			,'src/iddqd.json.js'

			// types

			,'src/iddqd.capabilities.js' // todo: merge these two?
			,'src/iddqd.environment.js'

			// custom
			,'src/iddqd.panorama.js'

			,'src/iddqd.style.js'
			,'src/iddqd.image.js'
			//,'src/iddqd.sizeImage.js' // todo: put loadimage and sizeimage under image ns

			//,'src/iddqd.log.js'
		]
	;


	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),

		watch: {
			/*js: {
				files: ['src/js*//*.js'],
				tasks: ['js'],
				options: { spawn: false }
			},*/
			revision: {
				files: ['.git/COMMIT_EDITMSG']
				,tasks: ['version_git']
				,options: { spawn: false }
			}
		},

		jshint: {
			options: { jshintrc: '.jshintrc' },
			files: aFiles
		},

		qunit: {
			//options: { jshintrc: '.jshintrc' },
			//files: aFiles
			//,tests: 'test/unit/test.js'
			all: {
				options: {
					urls: [
						'http://localhost/libs/js/iddqd/test/unit/index.html'
					]
				}
			}
		},

		uglify: {
			iddqd: {
				src: aFiles,
				dest: 'dist/iddqd.min.js'
			}
		},

		jsdoc_json: {
			package: {
				src: 'src/iddqd.js'
				,dest: 'package.json'
				,map: {namespace:'name',name:'title',title:'description'}
			}
			,jsdoc : {
				src: 'src/iddqd.js'
				,dest: 'jsdoc_template/jsdoc.conf.json'
				,map: {name:'templates.systemName',copyright:'templates.copyright',author:'foo'}
				// ok: Flatly Spacelab Cerulean United
				// not ok: Amelia Cosmo Cyborg Journal Readable Simplex Slate Superhero Spruce
			}
		},

		jsdoc : {
			dist : {
				src: aFiles.concat(['README.md']),
				options: {
					destination: 'doc'
					,template: 'jsdoc_template'
					,configure: 'jsdoc_template/jsdoc.conf.json'
					//,mainpagetitle: 'harhar' // todo find out why this has no effect
				}
			}
		}

		,version_git: {
			main: {
				files: {src:['src/iddqd.js']}
			}
		}
	});

//	grunt.loadNpmTasks('grunt-jsdoc');

	grunt.registerTask('default',['jshint','qunit','jsdoc']);
	grunt.registerTask('test',['qunit']);
	grunt.registerTask('doc',['jsdoc']);

};
