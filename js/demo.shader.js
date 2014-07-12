;(function(Demo, window, undefined) {

	function $(str) { return document.querySelector(str); }

	var aPos, bfr, iGlobalTime, iResolution, iSample, request, timer, pauseTime = new Date().getTime(), startTime = performance.now(), t = 0;

	var gl  = $(".shader canvas").getContext("webgl");
	var vsc = "attribute vec2 aPos;void main(){gl_Position=vec4(aPos.x,aPos.y,0.0,1.0);}";
	var fss = "precision mediump float;uniform vec2 iResolution;uniform float iGlobalTime;uniform float iSample;\n"
	var fsc = "/**\n * Fragment-Shader (OpenGL ES 2.0)\n *  \n * vec2  iResolution // canvas resolution in pixels\n * float iGlobalTime // playback time in seconds\n * float iSample     // Current sample value from synthesizer from -1.0 to 1.0 \n */\n\nvoid main()\n{\n	vec2 uv = gl_FragCoord.xy/iResolution.xy;\n	gl_FragColor = vec4(uv,(sin(iGlobalTime)+1.0)/2.0,1.0);\n}";

	// HTML-Elements
	var $view     = $(".shader td");
	var $codeView = $(".shader .code-view");
	var $code     = $("#shader-editor");
	var $play     = $(".shader .play-pause");
	var $reset    = $(".shader .reset");
	var $run      = $(".shader .run");
	var $time     = $(".shader .time");

	Demo.Shader = {

		init: function() {

			// Setup Ace-Editor
			Demo.Shader.Editor = ace.edit("shader-editor");
			Demo.Shader.Editor.setTheme("ace/theme/monokai");
			Demo.Shader.Editor.getSession().setMode("ace/mode/glsl");
			Demo.Shader.Editor.setShowPrintMargin(false);
			Demo.Shader.Editor.getSession().setUseWrapMode(true);

			Demo.Shader.Editor.commands.addCommand({
				name: 'compile',
				bindKey: {win: 'Ctrl-Enter',  mac: 'Command-Enter'},
				exec: Demo.Shader.compile
			});

			// Use default code example if there's no base64 URL hash
			if (Demo.base64.length==1) { Demo.Shader.Editor.setValue(fsc); }
			else { Demo.Shader.Editor.setValue(atob(Demo.base64[0])); }

			Demo.Shader.Editor.gotoLine(0);

			// Reference gl context
			Demo.Shader.gl = gl;

			// Setup view, compile and run
			Demo.Shader.canvasSetup();
			Demo.Shader.compile();
			Demo.Shader.togglePlayback(true);

			// Register event-listeners
			$run.addEventListener("click", Demo.Shader.compile, false);
			$play.addEventListener("click", Demo.Shader.togglePlayback, false);
			$reset.addEventListener("click", Demo.Shader.reset, false);
			window.addEventListener("resize", Demo.Shader.canvasSetup, false);
		},

		compile: function(e) {

			// Remove error class
			$codeView.className = $codeView.className.replace("error", "");

			var codeValue = Demo.Shader.Editor.getValue();

			// Stop rendering while compiling
			window.cancelAnimationFrame(request);
			Demo.Shader.stop = true;

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

			bfr = gl.createBuffer();
			aPos = gl.getAttribLocation(program, "aPos");

			// Setup uniforms
			Demo.Shader.iGlobalTime = iGlobalTime = gl.getUniformLocation(program, "iGlobalTime");
			Demo.Shader.iResolution = iResolution = gl.getUniformLocation(program, "iResolution");
			Demo.Shader.iSample     = iSample     = gl.getUniformLocation(program, "iSample");

			// Setup rectangle vertices
			gl.bindBuffer(gl.ARRAY_BUFFER, bfr);
			gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1.0,-1.0,1.0,-1.0,-1.0,1.0,1.0,-1.0,1.0,1.0,-1.0,1.0]), gl.STATIC_DRAW);
			gl.enableVertexAttribArray(bfr);

			// Setup viewport
			gl.uniform2f(iResolution, gl.canvas.width, gl.canvas.height);
			gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);

			// Update the URL hash if the code was parsed due to a user event
			if (e) { window.location.hash = btoa(codeValue) + ";" + btoa(Demo.Synthesizer.Editor.getValue()); }

			// Check for errors, else start rendering
			if (gl.getError()) { Demo.Shader.error(); }
			else { Demo.Shader.stop = false; Demo.Shader.render(0); }
		},

		render: function(time) {

			request = !Demo.Shader.stop && window.requestAnimationFrame(Demo.Shader.render);

			t = (time-startTime) / 1000;
			gl.uniform1f(iGlobalTime, t);
			gl.vertexAttribPointer(aPos, 2, gl.FLOAT, false, 0, 0);
			gl.drawArrays(gl.TRIANGLES, 0, 6);
		},

		canvasSetup: function() {

			// Update with and height
			gl.canvas.width = $view.offsetWidth;
			gl.canvas.height = $view.offsetHeight;

			// Update uniform and viewport
			gl.uniform2f(iResolution, gl.canvas.width, gl.canvas.height);
			gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);
		},

		togglePlayback: function(e) {
			var playing;

			if (typeof e == "boolean") { playing = !e; }
			else { playing = e && e.target.getAttribute("data-status") == "1"; }

			Demo.Shader.stop = playing;

			if (!playing) {
				startTime += new Date().getTime() - pauseTime;
				timer = window.setInterval(function() { $time.innerHTML = t.toFixed(2); }, 100);
				Demo.Shader.render(0);
			} else {
				pauseTime = new Date().getTime();
				window.clearInterval(timer);
			}

			$play.setAttribute("data-status", playing ? "0" : "1");
			$play.style.backgroundPosition = playing ? "0px 0px" : "-20px 0px";
		},

		reset: function() {
			$time.innerHTML = "0.00";
			pauseTime = new Date().getTime();
			startTime =  window.performance.now();
		},

		error: function(e) {
			$codeView.className += " error";
		}
	};

}(window.Demo || (window.Demo = {}), window));