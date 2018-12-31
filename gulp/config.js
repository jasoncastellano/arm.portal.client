var args = require("./helpers/args");

// ------------------------------------------ Export Configs
module.exports = {

// -------------------------------------------- arg-based config settings
    dist: args.dist,
    useIisExpress: args.iis === 'express',
    destRoot: args.dist ? "./dist/" : "./",
    root: "./",
    optimized: args.optimized,

// -------------------------------------------- app-js
    appjs: {
        src: ["./src/app/**/*.module.js",
              "./src/app/**/*.js",
              "!./src/app/**/*.spec.js"],
        dest: "./src/assets/js/",
        optimized: "app.js"
    },

// -------------------------------------------- autoprefixer
    autoprefixer: {
        opts: {
            browsers: ['last 3 versions']
        }
    },
// -------------------------------------------- bower
    bower: {
        json: require("../bower.json"),
        directory: "./bower_components/",
        ignorePath: "../.."
    },
// --------------------------------------------- browsersync
    browsersync: {
        instance: require('browser-sync').create(),
        opts: {
            proxy: "https://localhost/arm",
            injectChanges: true,
            browserReloadDelay: 1000,
            files: ["./src/assets/styles/css/app.css", "/.src/assets/js/app.js", "./src/app/**/*.html"],
            https: {
                key: 'localhost.key',
                cert: 'localhost.cer'
            }
        },
        watch: [
            './src/assets/js/app.js',
            './src/assets/js/templates.js',
            './src/index.html'
        ]
    },
// --------------------------------------------------- clean
    clean: {
        folders: [
            './dist/'
        ]  
    },
    html: {
        src: ['./src/**/*.html'],
        htmlmin: { // In case more html file operations are needed.
            opts: {
                // https://github.com/kangax/html-minifier
                collapseWhitespace: true,
                removeComments: true
            }
        },
        dest: './dist/'
    },
    images: {
        src: "./src/assets/images/**/*",
        dest: './dist/assets/images',
        relativePath: args.dist ? "../images/" : "../../images/",
        absolutePath: args.dist ? "assets/images" : "src/assets/images"
    },
    index: "./index.html",

// ------------------------------------------------ deploy
    deploy: {
        dev: {
            path: '\\\\va10twviss380\\arm',
            clean: true,
            cleanRoot: '//va10twviss380/arm'
        },
        qa: {
            path: 'E:\\Deployments\\ARM\\QA',
            cleanRoot: 'E:\\Deployments\\ARM\\QA',
            clean: true
        },
        prod: {
            path: 'E:\\Deployments\\ARM\\PROD',
            cleanRoot: 'E:\\Deployments\\ARM\\PROD',
            clean: true
        }
    },
// ------------------------------------------------ new-task
    newtask: {
        src: [
            "./gulp/helpers/newTaskTemplate.js"
        ],
        outputName: "TASK-TEMPLATE.js",
        dest: "./gulp/tasks/"
    },
// -------------------------------------------------- rename
    rename: {
        min: { suffix: '.min' }
    },
// ---------------------------------------------------- sass
    sass: {
        src: {
            wiredep: ["./src/assets/styles/sass/app.scss", "./src/assets/styles/sass/vars/_variables.scss"],
            all: [
                "./src/assets/styles/sass/**/*.scss",
                "./src/app/**/*.scss",
                "!./src/assets/styles/sass/**/app.scss"]
        } ,
        
        opts: { }, // add sass options here
        outputName: 'app.css',
        dest: './src/assets/styles/css/'
    },
// ------------------------------------------------- scripts
    scripts: {
        src: [
            './src/assets/js/**/*.js',
            '!./src/assets/js/**/templates.js'
    ],
        dest: './dist/assets/js'
    },
// -------------------------------------------------- styles
    styles: {
        src: [
            './src/assets/styles/css/**/*.css',
        ],
        dest: './dist/assets/css'
    },
// ------------------------------------------------- templatecache
    templatecache: {
        src: "./src/app/**/*.html",
        dest: "./src/assets/js",
        file: "templates.js",
        options: {
            module: "app.core",
            root: "src/app/",
            standalone: false
        }
    },
// ------------------------------------------------- vendors
    vendors: {
        js: {
            dest: './dist/assets/js/',
            optimized: 'lib.js'
        },
        css: {
            dest: './dist/assets/css/',
            optimized: 'lib.css'
        },
        sass: {
            // NOTE: This is to perform operations on the sass files
            src: [
                './bower_components/font-awesome/scss/**/*.scss', // ex
                './src/assets/bin/bootstrap-4.0.0-alpha/scss/**/*.scss' // ex
            ],
            opts: { },
            dest: './dist/assets/css/vendors'
        },
        fonts: {
            src: [
             './bower_components/bootstrap/fonts/**/*.*',
             './bower_components/font-awesome/fonts/**/*.*'
            ],
            dest: './dist/assets/fonts',
            devDest: "./src/assets/fonts",
            relativePath: args.dist ? "../fonts" : "../../fonts"
        }
    },
// ------------------------------------------------- wiredep
    wiredep: function() {
        var dest = "./",
            js = "",
            css = "";
        
        if(args.dist) {
            dest = "./dist/";
            js = "assets/js/vendors";
            css = "assets/css/vendors";
        }
        
        return {
            dest: dest,
            js: js,
            css: css,
            filepathRegex: /^.*[\\/]/
        };
    }
}