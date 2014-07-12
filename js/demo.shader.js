;(function(Demo, window, undefined) {

	function $(str) { return document.querySelector(str); }

	var gl  = $(".shader canvas").getContext("webgl");
	var vsc = "attribute vec2 aPos;void main(){gl_Position=vec4(aPos.x,aPos.y,0.0,1.0);}";
	var fss = "precision mediump float;uniform vec2 iResolution;uniform float iGlobalTime;uniform float iSample;uniform float iSync;\n"
	var fsc = "/**\n * Fragment-Shader (OpenGL ES 2.0)\n *  \n * vec2  iResolution // canvas resolution in pixels\n * float iGlobalTime // playback time in seconds\n * float iSample     // Current sample value from synthesizer from -1.0 to 1.0 \n * float iSync       // Current synthesizer playback time in seconds\n */\n\nvoid main()\n{\n	vec2 uv = gl_FragCoord.xy/iResolution.xy;\n	gl_FragColor = vec4(uv,(sin(iGlobalTime)+1.0)/2.0,1.0);\n}";

	// HTML-Elements
	var $view     = $(".shader td");
	var $codeView = $(".shader .code-view");
	var $code     = $("#shader-editor");
	var $play     = $(".shader .play-pause");
	var $reset    = $(".shader .reset");
	var $run      = $(".shader .run");
	var $time     = $(".shader .time");
	var $fps      = $(".shader .fps");

	var Shader = Demo.Shader = {

		time: 0,
		pause: false,
		frameNumber: 0,
		playTime: 0,
		pauseTime: 0,
		fpsStartTime: 0,

		init: function() {

			// Setup Ace-Editor
			Shader.setupEditor();

			// Reference gl context
			Shader.gl = gl;

			// Setup view, compile and run
			Shader.canvasSetup();
			Shader.compile();
			Shader.togglePlayback(true);

			// Register event-listeners
			$run.addEventListener("click", Shader.compile, false);
			$play.addEventListener("click", Shader.togglePlayback, false);
			$reset.addEventListener("click", Shader.reset, false);
			window.addEventListener("resize", Shader.canvasSetup, false);
		},

		compile: function(e) {

			// Remove error class
			$codeView.className = $codeView.className.replace("error", "");

			var playStatus = Shader.pause;
			var codeValue = Shader.Editor.getValue();
			Shader.pause = true;

			// Stop rendering while compiling
			window.cancelAnimationFrame(Shader.animationRequest);

			var vs = gl.createShader(gl.VERTEX_SHADER);
			var fs = gl.createShader(gl.FRAGMENT_SHADER);
			var program = gl.createProgram();

			gl.shaderSource(vs, vsc);
			gl.shaderSource(fs, fss + codeValue);

			gl.compileShader(vs);
			gl.compileShader(fs);

			gl.attachShader(program, vs);
			gl.attachShader(program, fs);

			gl.linkProgram(program);
			gl.useProgram(program);

			gl.deleteShader(vs);
			gl.deleteShader(fs);
			gl.deleteProgram(program);

			var bfr = gl.createBuffer();
			Shader.aPos = gl.getAttribLocation(program, "aPos");

			// Setup uniforms
			Shader.iGlobalTime = gl.getUniformLocation(program, "iGlobalTime");
			Shader.iResolution = gl.getUniformLocation(program, "iResolution");
			Shader.iSample     = gl.getUniformLocation(program, "iSample");
			Shader.iSync       = gl.getUniformLocation(program, "iSync");

			// Setup rectangle vertices
			gl.bindBuffer(gl.ARRAY_BUFFER, bfr);
			gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1.0,-1.0,1.0,-1.0,-1.0,1.0,1.0,-1.0,1.0,1.0,-1.0,1.0]), gl.STATIC_DRAW);
			gl.enableVertexAttribArray(bfr);

			// Setup viewport
			gl.uniform2f(Shader.iResolution, gl.canvas.width, gl.canvas.height);
			gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);

			// Update the URL hash if the code was parsed due to a user event
			if (e) { window.location.hash = btoa(codeValue) + ";" + btoa(Demo.Synthesizer.Editor.getValue()); }

			// Check for errors, else start rendering
			if (gl.getError()) { Shader.error(); }
			else {
				Shader.pause = playStatus;
				Shader.render();
			}
		},

		render: function() {

			Shader.animationRequest = !Shader.pause && window.requestAnimationFrame(Shader.render);

			Shader.time = (new Date().getTime() - Shader.playTime) / 1000;

			gl.uniform1f(Shader.iGlobalTime, Shader.time);
			gl.vertexAttribPointer(Shader.aPos, 2, gl.FLOAT, false, 0, 0);
			gl.drawArrays(gl.TRIANGLES, 0, 6);

			Shader.fps = Shader.getFPS();
		},

		getFPS: function() {

			Shader.frameNumber++;
			var interval = (new Date().getTime()-Shader.fpsStartTime)/1000;

			if (interval>1) {
				Shader.fpsStartTime = new Date().getTime();
				Shader.frameNumber = 0;
			}

			return Math.floor(Shader.frameNumber/interval);
		},

		canvasSetup: function() {

			// Update with and height
			gl.canvas.width = $view.offsetWidth;
			gl.canvas.height = $view.offsetHeight;

			// Update uniform and viewport
			gl.uniform2f(Shader.iResolution, gl.canvas.width, gl.canvas.height);
			gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);
		},

		togglePlayback: function(e) {

			if (typeof e == "boolean") { Shader.pause = !e; }
			else { Shader.pause = !Shader.pause; }

			if (!Shader.pause) {
				Shader.playTime += new Date().getTime() - Shader.pauseTime;
				Shader.updateTimer = window.setInterval(Shader.updateInfo, 100);
				Shader.render();
			} else {
				Shader.pauseTime = new Date().getTime();
				window.clearInterval(Shader.updateTimer);
			}

			$play.setAttribute("data-status", Shader.pause ? "0" : "1");
			$play.style.backgroundPosition = Shader.pause ? "0px 0px" : "-20px 0px";
		},

		reset: function() {
			$time.innerHTML = "0.00";
			if (Shader.pause){ Shader.playTime = Shader.pauseTime = 0; }
			else { Shader.playTime = new Date().getTime(); }
		},

		error: function(e) {
			$codeView.className += " error";
		},

		setupEditor: function() {

			Shader.Editor = ace.edit("shader-editor");
			Shader.Editor.setTheme("ace/theme/monokai");
			Shader.Editor.getSession().setMode("ace/mode/glsl");
			Shader.Editor.setShowPrintMargin(false);
			Shader.Editor.getSession().setUseWrapMode(true);

			Shader.Editor.commands.addCommand({
				name: 'compile',
				bindKey: {win: 'Ctrl-Enter',  mac: 'Command-Enter'},
				exec: Shader.compile
			});			

			// Use default code example if there's no base64 URL hash
			if (Demo.base64.length==1) { Shader.Editor.setValue(fsc); }
			else { Shader.Editor.setValue(atob(Demo.base64[0])); }

			Shader.Editor.gotoLine(0);
		},

		updateInfo: function() {
			$time.innerHTML = Shader.time.toFixed(2);
			$fps.innerHTML = (Shader.fps<9?"0"+Shader.fps:Shader.fps) + " FPS";
		}
	};

}(window.Demo || (window.Demo = {}), window));