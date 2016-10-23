module.exports = function (grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON("package.json"),
        path: {
            web: 'web/',
            private: 'private/',
            modules: 'node_modules/',
            bowerComponents: 'bower_components/',
            jsFolder: 'js/'
        },
        exec: {
            js: 'cd <%= path.private %>src && npm install && grunt'
        },
        clean: {
            js: ['<%= path.web %><%= path.jsFolder %>']
        },
        uglify: {
            js: {
                expand: true,
                cwd: '<%= path.private %><%= path.jsFolder %>',
                src: ['**/*.js', '!**/*.min.js'],
                dest: '<%= path.web %><%= path.jsFolder %>',
                ext: '.js'
            }
        },
        symlink: {
            js: {
                src: '<%= path.private %><%= path.jsFolder %>',
                dest: '<%= path.web %><%= path.jsFolder %>'
            }
        },
        copy: {
            panelTheme: {
                files: [
                    {
                        expand: true,
                        cwd: '<%= path.bowerComponents %>vsymfo-panel-theme/',
                        src: ['**', '!public/**'],
                        dest: '<%= path.private %>theme/backend_panel/'
                    },
                    {
                        expand: true,
                        cwd: '<%= path.bowerComponents %>vsymfo-panel-theme/public/',
                        src: ['**'],
                        dest: '<%= path.web %>theme/backend_panel/'
                    }
                ]
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-symlink');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-exec');

    grunt.registerTask('js-prod', [
        'exec:js',
        'clean:js',
        'uglify:js'
    ]);

    grunt.registerTask('js-dev', [
        'clean:js',
        'symlink:js'
    ]);

    grunt.registerTask('copy-panel-theme', [
        'copy:panelTheme'
    ]);
};
