/* jshint node:true */
module.exports = function(grunt) {
    'use strict';
    var banner = '/*! <%= pkg.name %> - v<%= pkg.version %> - <%= grunt.template.today("yyyy-mm-dd hh:MM:ss TT Z") %> */\n';

    grunt.initConfig({

        pkg: grunt.file.readJSON('package.json'),

        sass: {
            styles: {
                files: {
                    'src/styles.css': 'src/styles.scss'
                }
            }
        },

        autoprefixer: {
            options: {
                browsers: ['last 2 version', 'ie 8', 'ie 9'],
                diff: false
            },

            styles: {
                src: 'src/styles.css',
                dest: 'src/styles.prefixed.css'
            }
        },

        watch: {
            styles: {
                files: ['src/**/*.scss', 'src/*.scss'],
                tasks: ['styles']
            }
        },

        cssmin: {
            production: {
                files: {
                    'src/styles.min.css': 'src/styles.prefixed.css'
                },
                options: {
                    banner: banner
                }
            }
        },

        clean: {
            styles: {
                src: ['src/styles.css', 'src/styles.prefixed.css']
            }
        }
    });


    grunt.loadNpmTasks('grunt-sass');
    grunt.loadNpmTasks('grunt-autoprefixer');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-clean');

    grunt.registerTask('default', ['watch']);
    grunt.registerTask('styles', [
        'sass',
        'autoprefixer',
        'cssmin'//,
        //'clean'
    ]);
};