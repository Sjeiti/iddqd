module.exports = function (grunt) {
	'use strict';
	// Project configuration.
	var sTempFile = 'temp/temp.js';
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		uglify: {
			options: {
				//banner: '/*! <%= pkg.name %> v<%= pkg.version %> :: <%= grunt.template.today("yyyy-mm-dd") %> */\n'
			},
			temp: {
				src: 'src/<%= pkg.name %>.js',
				dest: sTempFile
			}
		},

		jshint: {
			options: { jshintrc: '.jshintrc' },
			files: ['src/*.js']
		},

		jsdoc: {
			files: ['src/*.js']
		}

		// Move other files to production folder
		/*copy: {
		  target: {
			files: {
			  'build/': ['src*//*.html']
			}
		  }
		}*/
	});

	// Load the plugin that provides the "uglify" task.
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('jsdoc');

	// grunt.loadNpmTasks('grunt-contrib-copy');

	// addTemplateToJs
//	grunt.registerMultiTask('addTemplateToJs', 'Build the index.html', function() {
//		var srctpl = grunt.file.read('src/inspectColor.html')
//				.replace(/[\r\n\t]/g,'')
//				.replace(/'/g,'\\\'')
////				.replace(/"/g,'\\\"')
//			,
//			srcjs = grunt.file.read('src/inspectColor.js').replace(/\/\*template\*\//,srctpl)
//		;
//		grunt.file.write('build/inspectColor.js',srcjs);
//		grunt.log.writeln('File "inspectColor.js" created.');
//	});


	// Default task(s).
	grunt.registerTask('default',['jshint','uglify']);

	grunt.registerTask('jsdoc',['jsdoc']);




    /*// Development setup
    grunt.registerTask('dev', 'Development build', function() {
        // set some global flags that all tasks can access
        grunt.config('isDebug', true);
        grunt.config('isConcat', false);
        grunt.config('isMin', false);

        // run tasks
        grunt.task.run('lint index');
    });

    // Production setup
    grunt.registerTask('prod', 'Production build', function() {
        // set some global flags that all tasks can access
        grunt.config('isDebug', false);
        grunt.config('isConcat', true);
        grunt.config('isMin', true);

        // run tasks
        grunt.task.run('lint concat min index');
    });

    // Default task
    grunt.registerTask('default', 'dev');*/



};

///*global module:false*/
//module.exports = function(grunt) {
//
//  grunt.loadNpmTasks('grunt-contrib-requirejs');
//  grunt.loadNpmTasks('grunt-contrib-copy');
//  grunt.loadNpmTasks('grunt-contrib-clean');
//  grunt.loadNpmTasks('grunt-contrib-compress');
//  grunt.loadNpmTasks('grunt-text-replace');
//
//  // Project configuration.
//  grunt.initConfig({
//    buildinfo: {
//        deploy: 'deplopy',
//        dist: 'dist',
//        temp: 'temp',
//        env: (grunt.option('target') || 'local'),
//        version: (grunt.option('version-info') || "local"),
//        CDN: (grunt.option('cdn') || "CDN_PATH")
//    },
//    meta: {
//      version: '0.1.0',
//      project_name: 'inspectColor'
//    },
//    lint: {
//      files: [
//          '<%= buildinfo.temp %>/src/inspectColor.js'
//      ]
//    },
//    compress: {
//        zip: {
//            files: {
//                "<%= meta.project_name %>_<%= buildinfo.env %>_<%= grunt.template.today('yyyymmddss') %>.zip": ["<%= buildinfo.dist %>/**/*"]
//            }
//        }
//    },
//    clean: {
//        temp: "<%= buildinfo.temp %>"
//    },
//    copy: {
//        temp: {
//            files: {
//              '<%= buildinfo.temp %>/': 'deploy/**/*'
//            }
//        }
//    },
//    replace: {
//        /**
//         * Set the environment variable in JS
//         */
//        setenv: {
//            src: ["<%= buildinfo.temp %>/CDN_PATH/js/config.js"],
//            overwrite: true,
//            replacements: [{
//                from: /ENV:\s*"local"/,
//                to: 'ENV:"<%= buildinfo.env %>"'
//            }]
//        },
//        /**
//         * Insert version information into page
//         */
//        insertversion: {
//            src: ["<%= buildinfo.temp %>/index.php"],
//            overwrite: true,
//            replacements: [{
//                from: new RegExp("(<!-- version: [^-]+? -->\n)??</body>","i"),
//                to: "<!-- version: <%= buildinfo.version %> -->\n</body>"
//            }]
//        },
//        /**
//         * Replace CDN_PATH with cdn deploy location
//         */
//        cdn_path: {
//            src: ["<%= buildinfo.temp %>/**/*.html","<%= buildinfo.temp %>/**/*.css","<%= buildinfo.temp %>/CDN_PATH/js/**/*.js"],
//            overwrite: true,
//            replacements: [{
//                from: 'CDN_PATH',
//                to: '<%= buildinfo.CDN %>'
//            }]
//        }
//    },
//    requirejs: {
//      compile: {
//          options: {
//              appDir: "<%= buildinfo.temp %>",
//              dir: "<%= buildinfo.dist %>",
//              modules: [
//                  {
//                      name: "loader"
//                  },
//                  {
//                      name: "main",
//                      excludes: "loader"
//                  }
//              ],
//              baseUrl: "CDN_PATH/js",
//              mainConfigFile: "<%= buildinfo.temp %>/CDN_PATH/js/loader.js",
//              closure: {
//                  CompilerOptions: {},
//                  CompilationLevel: 'SIMPLE_OPTIMIZATIONS',
//                  loggingLevel: 'WARNING'
//              },
//              pragmas: {
//                  optimize: true
//              },
//              optimizeCss: "standard",
//              fileExclusionRegExp: /^\./
//          }
//      }
//    },
//    jshint: {
//      options: {
//        curly: true,
//        eqeqeq: true,
//        immed: true,
//        latedef: true,
//        newcap: true,
//        noarg: true,
//        sub: true,
//        undef: true,
//        boss: true,
//        eqnull: true,
//        white: false,
//        smarttabs: true,
//        browser: true
//      },
//      globals: {
//        jQuery: true,
//
//        /* RequireJS globals */
//        require: true,
//        requirejs: true,
//        define: true,
//
//         /* Jasmine globals */
//         describe:true,
//         it:true,
//         waitsFor:true
//      }
//    },
//    uglify: {}
//  });
//
//    //# Default task.
//    grunt.registerTask('default','clean:temp copy:temp replace lint requirejs clean:temp');
//
//    //# Production deploy
//    grunt.registerTask('build', 'Build the project', function( environment ) {
//
//        if( arguments.length >= 1 ) {
//            if( ['live','staging','local'].indexOf( environment ) < 0 ) {
//                grunt.fail.warn("environment must be 'live', 'staging' or 'local'");
//                return false;
//            }
//            grunt.config('buildinfo.env',environment);
//        }
//
//        grunt.task.run('default compress');
//    });
//
//
//};
