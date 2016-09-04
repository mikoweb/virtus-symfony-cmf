module.exports = function (grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON("package.json"),
        path: {
            web: 'web/',
            'private': 'private/',
            modules: 'node_modules/',
            jsFolder: 'js/'
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
        }
    });

    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-symlink');

    grunt.registerTask('js-prod', [
        'clean:js',
        'uglify:js'
    ]);

    grunt.registerTask('js-dev', [
        'clean:js',
        'symlink:js'
    ]);
};
