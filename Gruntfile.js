module.exports = function(grunt) {
  require('load-grunt-tasks')(grunt);
  grunt.loadNpmTasks('grunt-simple-mocha');
  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    jshint: {
        options: {
          curly: true,
          eqeqeq: true,
          eqnull: true,
          browser: true,
          globals: {
            jQuery: true
          },
        },
        files: {
          src: ['Gruntfile.js', 'index.js' ]
        }
    },
    clean: {
      build: {
        src: [ 'dist' ]
      },
      all: {
        src: ['node_modules']
      }
    },
    copy: {
        build: {
          expand: true,
          cwd: 'static/',
          src: '**',
          dest: 'dist/',
        }
    },
    simplemocha: {
        options: {
            globals: ['should'],
            timeout: 3000,
            ignoreLeaks: false,
            ui: 'bdd'
        },

        all: {
            src: ['*.test.js']
        }
    }
  });
  grunt.registerTask('build', ['jshint' ]);
  grunt.registerTask('default', ['jshint','simplemocha' ]);
  grunt.registerTask('test', ['jshint','simplemocha' ]);

};
