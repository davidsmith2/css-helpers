module.exports = function(grunt){
  require("matchdep").filterDev("grunt-*").forEach(grunt.loadNpmTasks);
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    sass: {
      dist: {
        options: {
          style: 'expanded'
        },
        files: {
          'dist/sass/helpers.css': 'src/sass/helpers.scss'
        }
      }
    },
    less: {
      dist: {
        options: {
          paths: ['src/less'],
          sourceMap: true,
          sourceMapFilename: 'dist/less/helpers.css.map',
          sourceMapURL: 'helpers.css.map'
        },
        files: {
          'dist/less/helpers.css': 'src/less/helpers.less'
        }
      }
    },
    replace: {
      sass: {
        src: ['dist/sass/helpers.css'],
        overwrite: true,
        replacements: [
          {
            from: /^\n/gm,
            to: function () {
              return;
            }
          },
          {
            from: /(,)\s/gm,
            to: '$1\n'
          }
        ]
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
    }
  });
  grunt.registerTask('default', ['build-sass','build-less','watch']);
  grunt.registerTask('build-sass',  ['sass','replace:sass','exec:minsass']);
  grunt.registerTask('build-less',  ['less','exec:minless']);
};
