module.exports = function(grunt){
  require("matchdep").filterDev("grunt-*").forEach(grunt.loadNpmTasks);
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    less: {
      dist: {
        options: {
          paths: ['src'],
          sourceMap: true,
          sourceMapFilename: 'dist/helpers.css.map',
          sourceMapURL: 'helpers.css.map'
        },
        files: {
          'dist/helpers.css': 'src/helpers.less'
        }
      }
    },
    exec: {
      less: {
        cmd: 'cleancss -o dist/helpers.min.css dist/helpers.css'
      }
    },
    watch: {
      less: {
        files: [
          'src/*.less',
          'src/**/*.less'
        ],
        tasks: ['build']
      }
    }
  });
  grunt.registerTask('default', ['build','watch']);
  grunt.registerTask('build',  ['less','exec:less']);
};
