module.exports = function(grunt){

	require("matchdep").filterDev("grunt-*").forEach(grunt.loadNpmTasks);

	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
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
    },
    exec: {
      minsass: {
        cmd: './node_modules/clean-css/bin/cleancss -o dist/sass/helpers.min.css dist/sass/helpers.css'
      },
      minless: {
        cmd: './node_modules/clean-css/bin/cleancss -o dist/less/helpers.min.css dist/less/helpers.css'
      }
    },
    watch: {
      sass: {
        files: [
          'src/sass/*.scss',
          'src/sass/**/*.scss'
        ],
        tasks: ['build-sass']
      },
      less: {
        files: [
          'src/less/*.less',
          'src/less/**/*.less'
        ],
        tasks: ['build-less']
      }
    },
	});

	grunt.registerTask('default', ['build-sass','build-less','watch']);
	grunt.registerTask('build-sass',  ['sass','exec:minsass']);
  grunt.registerTask('build-less',  ['less','exec:minless']);

};
