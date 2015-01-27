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
			gruntfile: {
				files: ['Gruntfile.js', '.jshintrc'],
				options: { spawn: false, reload: true }
			}
			,default: {
				files: ['src/iddqd*.js'],
				tasks: ['test'],
				options: { spawn: false }
			},
			revision: {
				files: ['.git/COMMIT_EDITMSG']
				,tasks: ['version']
				,options: { spawn: false }
			},
			test: {
				files: ['test/unit/**']
				,tasks: ['qunit']
				,options: { spawn: false }
			},
			jsdoc: {
				files: [
					'jsdoc/template/static/styles/*.less'
					,'jsdoc/template/static/scripts/*.js'
					,'jsdoc/template/tmpl/*.tmpl'
					,'jsdoc/tutorials/**'
				]
				,tasks: ['doc']
				,options: { spawn: false }
			}
			,bower: {
				files: ['.bowerrc','bower.json','src/vendor/**/*'],
				tasks: ['bower'],
				options: { spawn: false }
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
						'http://localhost/iddqd/test/unit/index.html'
					]
				}
			}
		},

		clean: {
			jsdoc: {
				src: ['doc/**']
			}
		},

		less: {
			options: {
				compress: true
			}
			/*,src: {
				src: ['src/style/main.less'],
				dest: 'src/style/main.css'
			}*/
			,jsdoc: {
				src: ['jsdoc/template/static/styles/site.sjeiti.less'],
				dest: 'jsdoc/template/static/styles/site.sjeiti.css'
			}
		},

		uglify: {
			iddqd: {
				src: ['src/iddqd*.js'],
				dest: 'dist/iddqd.min.js'
			}
		},

		version_git: {
			main: {
				files: {src:['src/iddqd.js']}
			}
		},

		// set variables
		map_json: {
			package: {
				src: 'src/iddqd.js'
				,dest: 'package.json'
				,map: {namespace:'name',name:'title',title:'description'}
			}
			,bower : {
				src: 'src/iddqd.js'
				,dest: 'bower.json'
				,map: {}
			}
			,jsdoc : {
				src: 'src/iddqd.js'
				,dest: 'jsdoc.json'
				,map: {name:'templates.systemName',copyright:'templates.copyright',author:'foo'}
			}
		}

        // inject Bower components into HTML
		,bower: {
			main: {
				json: 'bower.json'
				,bowerrc: '.bowerrc'
				,prefix: '../../'
				,dest: ['test/unit/index.html']
			}
		}

		,'6to5': {
//			options: {
//				sourceMap: true
//			}
//			,dist: {
//				files: {
//					'./test/appsrc.js': './test/app.js'
//				}
//			}
			options: {
				sourceMap: true
			},
			dist: {
				files: {
					'test/app.js': 'test/appsrc.js'
				}
			}
		}
	});

	grunt.registerTask('default',['test','watch']);
	grunt.registerTask('test',['jshint','qunit','cli:jsdoc']);
	grunt.registerTask('version',['version_git','map_json']);

	grunt.registerTask('doc',[
		'less:jsdoc'
		,'clean:jsdoc'
		,'cli:jsdoc'
	]);

};
