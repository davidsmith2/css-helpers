module.exports = function(grunt){

	require("matchdep").filterDev("grunt-*").forEach(grunt.loadNpmTasks);

	var lang = grunt.option('lang') || 'sass';

	var watchFiles = (lang === 'sass') ? ['*.scss', 'helpers/*.scss'] : ['*.less', 'helpers/*.less'];

	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),

		watch: {
			css: {
				files: [watchFiles],
				tasks: ['build']
			}
		},
		cssmin: {
			build: {
				src: './helpers.css',
				dest: './helpers.min.css'
			}
		},
		sass: {
			build: {
				files: {
					'helpers.css': 'helpers.scss'
				}
			}
		},
		less: {
			development: {
				options: {
					paths: ['./', './helpers']
				},
				files: {
					'helpers.css': 'helpers.less'
				}
			}
		}
	});

	grunt.registerTask('default', ['build','watch']);
	grunt.registerTask('build',  [lang, 'cssmin']);

};
