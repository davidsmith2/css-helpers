module.exports = function(grunt){

	require("matchdep").filterDev("grunt-*").forEach(grunt.loadNpmTasks);

	var lang = grunt.option('lang') || 'sass';
	var watchFiles = (lang === 'sass') ? ['src/sass/*.scss', 'src/sass/**/*.scss'] : ['src/less/*.less', 'src/less/**/*.less'];

	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),

		watch: {
			css: {
				files: watchFiles,
				tasks: ['build']
			}
		},
		cssmin: {
			build: {
				src: 'dist/' + lang + '/helpers.css',
				dest: 'dist/' + lang + '/helpers.min.css'
			}
		},
		sass: {
			build: {
				files: {
					'dist/sass/helpers.css': 'src/sass/helpers.scss'
				}
			}
		},
		less: {
			development: {
				options: {
					paths: ['src/less']
				},
				files: {
					'dist/less/helpers.css': 'src/less/helpers.less'
				}
			}
		}
	});

	grunt.registerTask('default', ['build','watch']);
	grunt.registerTask('build',  [lang,'cssmin']);

};
