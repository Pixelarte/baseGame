// para utilspixelartegame 1° concat luego grunt minificar
module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    
 
    concat: {
      dist: {
        src: ["src/js/libs/*.js"],
        dest: "src/js/utilsPixelarteGame.js"
      }
    },

    uglify: {
          options: {
            beautify: true/*,
            mangle: {
                toplevel: true
            }*/
          },
          my_target: {
            files: {
              'dist/assets/js/main.min.js': ['src/js/main.js'],
              'dist/assets/js/libs/utilsPixelarteGame.min.js': ['src/js/utilsPixelarteGame.js']
            
            }
          }
    },

    imagemin: {
      dynamic: {
        files: [{
            expand: true,
            cwd: 'src/images/',
            src: ['*.{png,jpg,gif}'],
            dest: 'dist/assets/images/'
        }]
      }
    },
    less: {
      dist: {
        options: {
            compress: false
        },
        files: {
            'dist/assets/css/style.min.css': 'src/less/style.less',
            'dist/assets/css/mobile.min.css': 'src/less/mobile.less'
        }
      } 
    },
    watch: {
      options: {
        livereload: true
      },
      scripts: {
        files: ['src/js/*.js','src/js/game/*.js'],
        tasks: ['newer:uglify'],
        options: {
            spawn: false
        }
      },
      css: {
        files: ['src/less/*.less'],
        tasks: ['newer:less'],
        options: {
          spawn: false
        }
      },
      imagemin: {
        files: ['src/images/*.*'],
        tasks: ['newer:imagemin'],
        options: {
          spawn: false
        }
      }
    },
  });

  grunt.loadNpmTasks("grunt-contrib-concat");
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-imagemin');
  /*grunt.loadNpmTasks('grunt-contrib-less');*/
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-newer');

  grunt.registerTask('default', ['newer:uglify','newer:imagemin','watch']);
  grunt.registerTask('backend',['newer:uglify','watch:scripts']);
  /*grunt.registerTask('frontend',['newer:less','newer:imagemin','watch:css','watch:imagemin']);*/
  grunt.registerTask('produccion',['concat','uglify','imagemin']);

};