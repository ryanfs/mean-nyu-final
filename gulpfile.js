var gulp = require("gulp");
var concat = require("gulp-concat");
var nodemon = require("gulp-nodemon");
var uglify = require("gulp-uglify");
var annotate = require("gulp-ng-annotate");
var templateCache = require("gulp-angular-templatecache");
var rimraf = require("rimraf");

gulp.task("task1", function(done){
    setTimeout(function(){
       console.log("I am task 1 and I am really done"); 
       done();
    }, 2000);
    console.log("task 1");
});

gulp.task("task2", function(done){
    setTimeout(function(){
       console.log("I am task 2 and I am really done"); 
       done();
    }, 3000);
    console.log("task 2");
});

gulp.task("default", ["task1", "task2"], function(){
    console.log("Hello from gulp");
});

gulp.task("html", function(done){
    var stream = gulp.src("client/templates/**/*.html")
        .pipe(templateCache({module: "myWorld", root: "/templates"}))
            .pipe(gulp.dest("temp"));
            
    stream.on("end", function(){
        done();
    });
});

gulp.task("js", ["html"], function(done){
    var stream = gulp.src(["client/app/the_app.js", "client/app/**/*.js", "temp/templates.js"])
        .pipe(concat("all.js"))        
            .pipe(annotate())
                .pipe(uglify())
                    .pipe(gulp.dest("prod"));
    stream.on("end", function(){
        done();
    });
});

gulp.task("build:assets", ["js"], function(done){
    rimraf("temp", done);
});

gulp.task("watch:js", ["js"], function(){
    gulp.watch("client/app/**/*.js", ["js"]);
});

gulp.task("dev:server", function(){
    nodemon({
        script: "server.js",
        ext: "js",
        env: {
            ENV: "development",
            CONN: "mongodb://localhost/my_world",
            JWT_SECRET: "bar"
        }
    });
});

gulp.task("prod:server", ["watch:js"], function(){
    nodemon({
        script: "server.js",
        ext: "js",
        env: {
            ENV: "production",
            CONN: "mongodb://localhost/my_world",
            JWT_SECRET: "bar"
        }
    });
});

