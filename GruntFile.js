module.exports = function (grunt) {

    // Pull defaults (including username and password) from .screeps.json
    var config = require('./.screeps.json')
    if(!config.branch) {
        config.branch = 'default'
    }

    if(!config.ptr) {
        config.ptr = false
    }

    // Allow grunt options to override default configuration
    var branch = grunt.option('branch') || config.branch;
    var email = grunt.option('email') || config.email;
    var password = grunt.option('password') || config.password;
    var ptr = grunt.option('ptr') ? true : config.ptr

    // Load needed tasks
    grunt.loadNpmTasks('grunt-screeps')
    grunt.loadNpmTasks('grunt-contrib-clean')
    grunt.loadNpmTasks('grunt-contrib-concat')
    grunt.loadNpmTasks('grunt-contrib-copy')
    grunt.loadNpmTasks('grunt-file-append')
    grunt.loadNpmTasks("grunt-jsbeautifier")


    grunt.initConfig({
        // Push all files in the dist folder to screeps
        screeps: {
            options: {
                email: email,
                password: password,
                branch: branch,
                ptr: ptr
            },
            dist: {
                src: ['build/*.js']
            }
        },


        // Combine groups of files to reduce the calls to 'require'
        concat: {
            // Merge together additions to the default game objects into one file
            jobs: {
                src: ['build/job/*.js'],
                dest: 'dist/jobs.js',
            },
            pretick: {
                src: ['build/pretick/*.js'],
                dest: 'dist/pretick.js',
            }
        },

        // Add variable to mark this as packaged.
        file_append: {
            default_options: {
                files: [
                    {
                        prepend: "'use strict';\nglobal.GRUNT_PACKAGE=true\n",
                        input: 'dist/main.js',
                    }
                ]
            }
        },

        // Clean the dist folder.
        clean: {
            'dist': ['dist']
        },
    })

    // Combine the above into a default task
    grunt.registerTask('default', ['clean', 'copy', 'concat', 'file_append', 'screeps']);
    grunt.registerTask('raw', ['clean', 'copy', 'screeps']);
    grunt.registerTask('package', ['clean', 'copy', 'concat', 'file_append']);
    grunt.registerTask('test', ['jsbeautifier:verify']);
    grunt.registerTask('pretty', ['jsbeautifier:modify']);
}