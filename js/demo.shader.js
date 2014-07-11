;(function(Demo, window, undefined) {

	var gl, bfr, aPos, iGlobalTime, iResolution, request;

	var vsc = "attribute vec2 aPos;void main(){gl_Position=vec4(aPos.x,aPos.y,0.0,1.0);}";
	var fss = "precision mediump float;uniform vec2 iResolution;uniform float iGlobalTime;\n"
	var fsc = "/**\n * Fragment-Shader (OpenGL ES 2.0)\n *  \n * vec2  iResolution // canvas resolution in pixels\n * float iGlobalTime // playback time in seconds\n */\n\nvoid main()\n{\n\tvec2 uv = gl_FragCoord.xy/iResolution.xy;\n\tgl_FragColor = vec4(uv,(sin(iGlobalTime)+1.0)/2.0,1.0);\n}";

	var $view = document.querySelector(".shader td");
	var $code = document.querySelector("#shader-code");
	var $play = document.querySelector(".shader .play-pause");
	var $reset = document.querySelector(".shader .reset");
	var $run = document.querySelector(".shader .run");
	var $time = document.querySelector(".shader .time");

	Demo.Shader = {

		init: function() {

			$code.value = fsc;
			start = new Date().getTime();

			//base64 = location.hash.substr(1);
			//if (base64) { $code.value = atob(base64); }

			Demo.Shader.canvasSetup();
			Demo.Shader.compile();
			Demo.Shader.render();

			$run.addEventListener("click", Demo.Shader.compile);
			$play.addEventListener("click", Demo.Shader.togglePlayback);
			$reset.addEventListener("click", Demo.Shader.reset);
			window.addEventListener("resize", Demo.Shader.canvasSetup, false);
		},

		render: function(time) {

			if (gl.getError()) { return window.cancelAnimationFrame(request); }
			request = !Demo.Shader.stop && window.requestAnimationFrame(Demo.Shader.render);

			$time.innerHTML = (time/1000).toFixed(2);
			gl.uniform1f(iGlobalTime, time/1000);
			gl.vertexAttribPointer(aPos, 2, gl.FLOAT, false, 0, 0);
			gl.drawArrays(gl.TRIANGLES, 0, 6);
		},

		compile: function() {

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

			iGlobalTime = gl.getUniformLocation(program, "iGlobalTime");
			iResolution = gl.getUniformLocation(program, "iResolution");

			gl.bindBuffer(gl.ARRAY_BUFFER, bfr);
			gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1.0,-1.0,1.0,-1.0,-1.0,1.0,1.0,-1.0,1.0,1.0,-1.0,1.0]), gl.STATIC_DRAW);
			gl.enableVertexAttribArray(bfr);

			gl.uniform2f(iResolution, gl.canvas.width, gl.canvas.height);
			gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);

			Demo.Shader.render(0);
		},

		reset: function() {
			Demo.Shader.togglePlayback(false);
		},

		togglePlayback: function(e) {
			var playing;

			if (typeof e == "boolean") { playing = !e; }
			else { playing = e && e.target.getAttribute("data-status") == "1"; }

			Demo.Shader.stop = playing;

			if (!playing) { Demo.Shader.render(0); }

			$play.setAttribute("data-status", playing ? "0" : "1");
			$play.style.backgroundPosition = playing ? "0px 0px" : "-20px 0px";
		},

		canvasSetup: function() {
			gl = document.querySelector("#shader-canvas").getContext("webgl");
			gl.canvas.width = $view.offsetWidth;
			gl.canvas.height = $view.offsetHeight;

			gl.uniform2f(iResolution, gl.canvas.width, gl.canvas.height);
			gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);
		}
	};

	$code.addEventListener("keydown", function(e) {
		if (e.ctrlKey && [13, 83].indexOf(e.keyCode) != -1) {

			Demo.Shader.compile();
			location.hash = btoa(Demo.Shader.value);
			e.preventDefault();

		} else if (e.keyCode === 9) {

			var start = Demo.Shader.selectionStart;
			var end = Demo.Shader.selectionEnd;

			Demo.Shader.value = (Demo.Shader.value.substring(0, start) + "\t" + Demo.Shader.value.substring(end));
			Demo.Shader.selectionStart = Demo.Shader.selectionEnd = start + 1;
			e.preventDefault();
		}
	}, false);

}(window.Demo || (window.Demo = {}), window));