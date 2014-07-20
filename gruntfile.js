module.exports = function(grunt) {

	grunt.initConfig({

		pkg: grunt.file.readJSON("package.json"),

		jshint: {
			options: {
				curly: true,
				eqnull: true,
				browser: true,
				asi: true,
				smarttabs: true,
				expr: true
			},
			before: ["src/js/*.js"],
			after: ["www/build.js"]
		},

		concat: {
			dist: {
				src: [
					"src/js/demo.utils.js",
					"src/js/demo.shader.js",
					"src/js/demo.dsp.js",
					"src/js/demo.js"
				],
				dest: "www/build.js",
			},
		},

		uglify: {
			build: {
				files: {
					"www/build.js": "www/build.js"
				}
			}
		},

		sass: {
			dist: {
				options: { outputStyle: "compressed" },
				files: { "www/build.css": ["src/css/main.scss"] }
			}
		},
	});

	Object.keys(grunt.config.data.pkg.devDependencies).forEach(function(v) {
		if (v == "grunt") { return true; }
		grunt.loadNpmTasks(v);
	});

	grunt.registerTask("default", [
		"jshint:before",
		"concat",
		"uglify",
		"sass"
	]);

};
