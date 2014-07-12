;(function(Demo, window, undefined) {

	function $(str) { return document.querySelector(str); }

	var aPos, bfr, iGlobalTime, iResolution, iSample, request, timer, pauseTime = new Date().getTime(), startTime = performance.now(), t = 0;

	var gl  = $(".shader canvas").getContext("webgl");
	var vsc = "attribute vec2 aPos;void main(){gl_Position=vec4(aPos.x,aPos.y,0.0,1.0);}";
	var fss = "precision mediump float;uniform vec2 iResolution;uniform float iGlobalTime;uniform float iSample;\n"
	var fsc = "/**\n * Fragment-Shader (OpenGL ES 2.0)\n *  \n * vec2  iResolution // canvas resolution in pixels\n * float iGlobalTime // playback time in seconds\n * float iSample     // Current sample value from synthesizer from -1.0 to 1.0 \n */\n\nvoid main()\n{\n	vec2 uv = gl_FragCoord.xy/iResolution.xy;\n	gl_FragColor = vec4(uv,(sin(iGlobalTime)+1.0)/2.0,1.0);\n}";

	var $view  = $(".shader td");
	var $code  = $(".shader textarea");
	var $play  = $(".shader .play-pause");
	var $reset = $(".shader .reset");
	var $run   = $(".shader .run");
	var $time  = $(".shader .time");

	Demo.Shader = {

		init: function() {

			// Use default code example if there's no base64 URL hash
			if (!Demo.base64) { $code.value = fsc; }

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
			$code.addEventListener("keydown", Demo.Shader.onInput, false);
			window.addEventListener("resize", Demo.Shader.canvasSetup, false);
		},

		compile: function(e) {

			// Remove error class
			$code.className = "";

			// Stop rendering while compiling
			window.cancelAnimationFrame(request);
			Demo.Shader.stop = true;

			var vs = gl.createShader(gl.VERTEX_SHADER);
			var fs = gl.createShader(gl.FRAGMENT_SHADER);
			var program = gl.createProgram();

			gl.shaderSource(vs, vsc);
			gl.shaderSource(fs, fss + $code.value);

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
			if (e) { window.location.hash = btoa($code.value) + ";" + btoa($(".synthesizer textarea").value); }

			// Check for errors, else start rendering
			if (gl.getError()) { Demo.Shader.error(); }
			else { Demo.Shader.render(0); }
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
			$code.className = "error";
		},

		onInput: function(e) {

			if (e.ctrlKey && [13, 83].indexOf(e.keyCode) != -1) {

				e.preventDefault();
				Demo.Shader.compile();

			} else if (e.keyCode === 9) {

				var start = $code.selectionStart;
				var end = $code.selectionEnd;

				$code.value = ($code.value.substring(0, start) + "\t" + $code.value.substring(end));
				$code.selectionStart = Demo.Shader.selectionEnd = start + 1;
				e.preventDefault();
			}
		}
	};

}(window.Demo || (window.Demo = {}), window));