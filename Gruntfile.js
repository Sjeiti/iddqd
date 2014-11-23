/* global module */
/* global require */
module.exports = function (grunt) {
	/* jshint strict: false */

    // Load grunt tasks automatically
    require('load-grunt-tasks')(grunt);
	grunt.loadTasks('gruntTasks');



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
			},
			jsdoc: {
				files: [
					'jsdoc/template/static/styles/*.less'
					,'jsdoc/template/static/scripts/*.js'
					,'jsdoc/template/tmpl/*.tmpl'
					,'jsdoc/tutorials/**'
				]
				,tasks: ['jsdoc']
				,options: { spawn: false }
			}
		},

		cli: {
			jsdoc: { cwd: './', command: 'jsdoc -c jsdoc.json', output: true }
		},

		jshint: {
			options: { jshintrc: '.jshintrc' },
			files: ['src/iddqd*.js']
		},

		qunit: {
			//options: { jshintrc: '.jshintrc' },
			//files: ['src/iddqd*.js']
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
				src: ['src/iddqd*.js'],
				dest: 'dist/iddqd.min.js'
			}
		},

		map_json: {
			package: {
				src: 'src/iddqd.js'
				,dest: 'package.json'
				,map: {namespace:'name',name:'title',title:'description'}
			}
			,jsdoc : {
				src: 'src/iddqd.js'
				,dest: 'jsdoc_template/jsdoc.conf.json'
				,map: {name:'templates.systemName',copyright:'templates.copyright',author:'foo'}
			}
		},

		version_git: {
			main: {
				files: {src:['src/iddqd.js']}
			}
		}
	});

	grunt.registerTask('default',['jshint','qunit','cli:jsdoc']);
	grunt.registerTask('test',['qunit']);
	grunt.registerTask('doc',['cli:jsdoc']);

};
