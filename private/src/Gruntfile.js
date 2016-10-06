module.exports = function(grunt) {
    "use strict";

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        path: {
            src: 'js/',
            dist: '../js/'
        },
        babel: {
            dist: {
                files: [{
                    expand: true,
                    cwd: '<%= path.src %>',
                    src: ['**/*.js'],
                    dest: '<%= path.dist %>',
                    ext: '.js'
                }]
            }
        },
        replace: {
            dist: {
                options: {
                    patterns: [
                        {
                            match: /^define\('js\//g,
                            replacement: "define('"
                        }
                    ]
                },
                files: [
                    {
                        expand: true,
                        cwd: '<%= path.dist %>',
                        src: ['**/*.js'],
                        dest: '<%= path.dist %>',
                        ext: '.js'
                    }
                ]
            }
        },
        exec: {
            babelHelpers: './node_modules/.bin/babel-external-helpers > ../babel-helpers.js'
        },
        uglify: {
            babelHelpers: {
                files: {
                    '../babel-helpers.js': ['../babel-helpers.js']
                }
            }
        },
        watch: {
            dist: {
                files: ['<%= path.src %>**/*.js'],
                tasks: ['babel', 'replace'],
                options: {
                    spawn: false,
                    reload: true
                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-babel');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-replace');
    grunt.loadNpmTasks('grunt-exec');

    grunt.registerTask('default', [
        'babel:dist',
        'replace:dist',
        'exec:babelHelpers',
        'uglify:babelHelpers'
    ]);
};
