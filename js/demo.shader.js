;(function(Demo, window, undefined) {

	function $(str) { return document.querySelector(str); }

	var gl, bfr, aPos, iGlobalTime, iResolution, iSample, request, startTime = performance.now(), timer, t = 0;

	var vsc = "attribute vec2 aPos;void main(){gl_Position=vec4(aPos.x,aPos.y,0.0,1.0);}";
	var fss = "precision mediump float;uniform vec2 iResolution;uniform float iGlobalTime;uniform float iSample;\n"
	var fsc = "/**\n * Fragment-Shader (OpenGL ES 2.0)\n *  \n * vec2  iResolution // canvas resolution in pixels\n * float iGlobalTime // playback time in seconds\n */\n\nvoid main()\n{\n\tvec2 uv = gl_FragCoord.xy/iResolution.xy;\n\tgl_FragColor = vec4(uv,(sin(iGlobalTime)+1.0)/2.0,1.0);\n}";

	var $view  = $(".shader td");
	var $code  = $(".shader textarea");
	var $play  = $(".shader .play-pause");
	var $reset = $(".shader .reset");
	var $run   = $(".shader .run");
	var $time  = $(".shader .time");

	Demo.Shader = {

		init: function() {

			var base64 = window.location.hash.substr(1);
			if (!base64) { $code.value = fsc; }

			Demo.Shader.canvasSetup();
			Demo.Shader.compile();
			Demo.Shader.togglePlayback(true);

			$run.addEventListener("click", Demo.Shader.compile);
			$play.addEventListener("click", Demo.Shader.togglePlayback);
			$reset.addEventListener("click", Demo.Shader.reset);
			window.addEventListener("resize", Demo.Shader.canvasSetup, false);
		},

		render: function(time) {

			request = !Demo.Shader.stop && window.requestAnimationFrame(Demo.Shader.render);
			t = time - startTime;

			gl.uniform1f(iGlobalTime, t/1000);
			gl.vertexAttribPointer(aPos, 2, gl.FLOAT, false, 0, 0);
			gl.drawArrays(gl.TRIANGLES, 0, 6);
		},

		compile: function(e) {

			$code.className = "";

			if (e) { window.location.hash = btoa($code.value) + ";" + btoa($(".synthesizer textarea").value); }
			window.cancelAnimationFrame(request);

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

			Demo.Shader.iGlobalTime = iGlobalTime = gl.getUniformLocation(program, "iGlobalTime");
			Demo.Shader.iResolution = iResolution = gl.getUniformLocation(program, "iResolution");
			Demo.Shader.iSample = iSample = gl.getUniformLocation(program, "iSample");

			gl.bindBuffer(gl.ARRAY_BUFFER, bfr);
			gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1.0,-1.0,1.0,-1.0,-1.0,1.0,1.0,-1.0,1.0,1.0,-1.0,1.0]), gl.STATIC_DRAW);
			gl.enableVertexAttribArray(bfr);

			gl.uniform2f(iResolution, gl.canvas.width, gl.canvas.height);
			gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);

			if (gl.getError()) { Demo.Shader.error(); }
			else { Demo.Shader.render(0); }
		},

		reset: function() {
			$time.innerHTML = "0.00";
			startTime = performance.now();
			// Demo.Shader.togglePlayback(false);
		},

		togglePlayback: function(e) {
			var playing;

			if (typeof e == "boolean") { playing = !e; }
			else { playing = e && e.target.getAttribute("data-status") == "1"; }

			Demo.Shader.stop = playing;

			if (!playing) {
				timer = window.setInterval(function() { $time.innerHTML = (t/1000).toFixed(2); }, 100);
				Demo.Shader.render(0);
			} else {
				window.clearInterval(timer);
			}

			$play.setAttribute("data-status", playing ? "0" : "1");
			$play.style.backgroundPosition = playing ? "0px 0px" : "-20px 0px";
		},

		canvasSetup: function() {
			Demo.Shader.gl = gl = $(".shader canvas").getContext("webgl");
			gl.canvas.width = $view.offsetWidth;
			gl.canvas.height = $view.offsetHeight;

			gl.uniform2f(iResolution, gl.canvas.width, gl.canvas.height);
			gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);
		},

		error: function(e) {
			$code.className = "error";
		}
	};

	$code.addEventListener("keydown", function(e) {
		if (e.ctrlKey && [13, 83].indexOf(e.keyCode) != -1) {

			e.preventDefault();
			window.location.hash = btoa($code.value) + ";" + btoa($(".synthesizer textarea").value);
			Demo.Shader.compile();

		} else if (e.keyCode === 9) {

			var start = $code.selectionStart;
			var end = $code.selectionEnd;

			$code.value = ($code.value.substring(0, start) + "\t" + $code.value.substring(end));
			$code.selectionStart = Demo.Shader.selectionEnd = start + 1;
			e.preventDefault();
		}
	}, false);

}(window.Demo || (window.Demo = {}), window));