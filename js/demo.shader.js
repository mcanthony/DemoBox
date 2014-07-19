;(function(Demo, window, undefined) {

	var gl  = $(".shader canvas").getContext("webgl");
	var vsc = "attribute vec2 aPos;void main(){gl_Position=vec4(aPos.x,aPos.y,0.0,1.0);}";
	var fss = "precision mediump float;uniform vec2 iResolution;uniform float iGlobalTime;uniform float iSample;uniform float iSync;\n"

	var examples = {
		"Choose Example": "LyoqCiAqIEZyYWdtZW50LVNoYWRlciAoT3BlbkdMIEVTIDIuMCkKICogIAogKiB2ZWMyICBpUmVzb2x1dGlvbiAvLyBjYW52YXMgcmVzb2x1dGlvbiBpbiBwaXhlbHMKICogZmxvYXQgaUdsb2JhbFRpbWUgLy8gcGxheWJhY2sgdGltZSBpbiBzZWNvbmRzCiAqIGZsb2F0IGlTYW1wbGUgICAgIC8vIEN1cnJlbnQgc2FtcGxlIHZhbHVlIGZyb20gRFNQIGZyb20gLTEuMCB0byAxLjAgCiAqIGZsb2F0IGlTeW5jICAgICAgIC8vIEN1cnJlbnQgRFNQIHBsYXliYWNrIHRpbWUgaW4gc2Vjb25kcwogKi8KCnZvaWQgbWFpbigpCnsKCXZlYzIgdXYgPSBnbF9GcmFnQ29vcmQueHkgLyBpUmVzb2x1dGlvbi54eTsKCWdsX0ZyYWdDb2xvciA9IHZlYzQodXYsc2luKGlHbG9iYWxUaW1lKSwxLjApOwp9",
		"2D Voroni": "Y29uc3QgaW50IE4gPSAyMDA7CnZlYzIgcG9pbnRzW05dOwoKdmVjMiBub2lzZSh2ZWMyIGNvKXsKICAgIHJldHVybiB2ZWMyKAoJCWZyYWN0KHNpbihkb3QoY28ueHkgLHZlYzIoMTIuOTg5OCw3OC4yMzMpKSkgKiA0Mzc1OC41NDUzKSwKCQlmcmFjdChjb3MoZG90KGNvLnl4ICx2ZWMyKDEyLjk4OTgsNDM3NTguNTQ1MykpKSAqIDc4LjIzMykKCSk7Cn0KCnZvaWQgZ2VuZXJhdGVQb2ludHMoKQp7CQoJZmxvYXQgbiA9IDAuMDsKCQoJZm9yKGludCBpID0gMDsgaSA8IE47IGkrKykKCXsKCQlwb2ludHNbaV0gPSBub2lzZSh2ZWMyKG4pKTsJCQoJCW4gKz0gMS4wL2Zsb2F0KE4pOwoJfQp9CgpmbG9hdCB2b3JvbmkodmVjMiB1dikKewoJZmxvYXQgZGlzdCA9IDEuMDsKCQoJZm9yKGludCBpID0gMDsgaSA8IE47IGkrKykKCXsgZGlzdCA9IG1pbihkaXN0LCBsZW5ndGgodXYtcG9pbnRzW2ldKSk7IH0KCglyZXR1cm4gMS4wIC0gZGlzdCoxMC4wOwp9Cgp2b2lkIG1haW4oKQp7CQoJZ2VuZXJhdGVQb2ludHMoKTsKCQoJdmVjMiB1diA9IGdsX0ZyYWdDb29yZC54eSAvIGlSZXNvbHV0aW9uLnh5OwoJdmVjMyBjb2wgPSB2ZWMzKHZvcm9uaSh1dikpOwoJCglnbF9GcmFnQ29sb3IgPSB2ZWM0KGNvbCwxLjApOwp9",
		"2D Perlin": "I2RlZmluZSBOIDIwCiNkZWZpbmUgVSAxLjAvZmxvYXQoTikKCQp2ZWMyIG5vaXNlKHZlYzIgY28pewogICAgcmV0dXJuICh2ZWMyKAoJCWZyYWN0KHNpbihkb3QoY28ueHkgLHZlYzIoMTIuOTg5OCw3OC4yMzMpKSkgKiA0Mzc1OC41NDUzKSwKCQlmcmFjdChjb3MoZG90KGNvLnl4ICx2ZWMyKDEyLjk4OTgsNDM3NTguNTQ1MykpKSAqIDc4LjIzMykKCSktMC41KSoyLjA7Cn0KCmZsb2F0IGYoZmxvYXQgdCkgeyByZXR1cm4gNi4wKnQqdCp0KnQqdC0xNS4wKnQqdCp0KnQrMTAuMCp0KnQqdDsgfQoKZmxvYXQgcGVybGluKHZlYzIgcCkKewoJZmxvYXQgaSA9IGZsb29yKHAueCk7CglmbG9hdCBqID0gZmxvb3IocC55KTsKCQoJZmxvYXQgdSA9IHAueCAtIGk7CglmbG9hdCB2ID0gcC55IC0gajsKCQoJdmVjMiBnMDAgPSBub2lzZSh2ZWMyKGkgICAgLCBqICAgICkpOwoJdmVjMiBnMDEgPSBub2lzZSh2ZWMyKGkgICAgLCBqKzEuMCkpOwoJdmVjMiBnMTAgPSBub2lzZSh2ZWMyKGkrMS4wLCBqICAgICkpOwoJdmVjMiBnMTEgPSBub2lzZSh2ZWMyKGkrMS4wLCBqKzEuMCkpOwoJCglmbG9hdCBxMDAgPSBnMDAueCoodSAgICApICsgZzAwLnkqKHYgICAgKTsKCWZsb2F0IHEwMSA9IGcwMS54Kih1ICAgICkgKyBnMDEueSoodi0xLjApOwoJZmxvYXQgcTEwID0gZzEwLngqKHUtMS4wKSArIGcxMC55Kih2ICAgICk7CglmbG9hdCBxMTEgPSBnMTEueCoodS0xLjApICsgZzExLnkqKHYtMS4wKTsKCQoJZmxvYXQgcXgwID0gcTAwKigxLjAtZih1KSkgKyBxMTAqZih1KTsKCWZsb2F0IHF4MSA9IHEwMSooMS4wLWYodSkpICsgcTExKmYodSk7CglmbG9hdCBxeHkgPSBxeDAqKDEuMC1mKHYpKSArIHF4MSpmKHYpOwoKCXJldHVybiBxeHkrMC41Owp9Cgp2b2lkIG1haW4oKQp7Cgl2ZWMzIGNvbCA9IHZlYzMocGVybGluKGdsX0ZyYWdDb29yZC54eS9VLWlHbG9iYWxUaW1lKjUuMCkpOwoJZ2xfRnJhZ0NvbG9yID0gdmVjNChjb2wsMS4wKTsKfQ==",
		"2D Fractals": "I2RlZmluZSBOIDEwMC4wIC8vIEl0ZXJhdGlvbnMKI2RlZmluZSBaICAgMi4wIC8vIFpvb20KI2RlZmluZSBNIGZhbHNlIC8vIE1hbmRlbGJyb3QKCnZvaWQgbWFpbigpCnsKCXZlYzMgZCA9IHZlYzMoMSk7IHZlYzIgYyA9IHZlYzIoLTAuNzksMC4yKTsKCXZlYzIgeiA9ICgyLjAgKiBnbF9GcmFnQ29vcmQueHkgLSBpUmVzb2x1dGlvbi54eSkgLyBpUmVzb2x1dGlvbi54eCAqIFo7CglpZiAoTSkgeyBjID0gejsgeiA9IHZlYzIoMCk7IH0KCglmb3IoZmxvYXQgaT0wLjA7aTxOO2krPTEuMCkKCXsKCQl6ID0gdmVjMih6Lngqei54LXoueSp6LnksMi4wKnoueCp6LnkpK2M7CgkJaWYgKGxlbmd0aCh6KT4yLjApIHsgZCA9IHZlYzMoaS9OKTsgYnJlYWs7IH0KCX0KCQoJZ2xfRnJhZ0NvbG9yID0gdmVjNCgzLjAqZCp2ZWMzKGdsX0ZyYWdDb29yZC54eS9pUmVzb2x1dGlvbi54eSxpU2FtcGxlKjAuMSkrdmVjMygwLjA3KSwxLjApOwp9",
		"3D Raymarching": "I2RlZmluZSBTVEVQUyAxNgojZGVmaW5lIFBSRUNJU0lPTiAwLjAwMQojZGVmaW5lIERFUFRIIDUuMAoKdmVjMyBleWUgPSB2ZWMzKDAsMC41LC0xKTsKdmVjMyBsaWdodCA9IHZlYzMoMCwxLC0xKTsKCmZsb2F0IGJveCwgZ3JvdW5kOwpmbG9hdCB0ID0gaUdsb2JhbFRpbWU7CgpmbG9hdCB1ZEJveCh2ZWMzIHAsdmVjMyBiLGZsb2F0IHIpe3JldHVybiBsZW5ndGgobWF4KGFicyhwKS1iLDAuMCkpLXI7fQptYXQzIHJvdFkoZmxvYXQgYSl7ZmxvYXQgcz1zaW4oYSk7ZmxvYXQgYz1jb3MoYSk7cmV0dXJuIG1hdDMoYywwLC1zLDAsMSwwLHMsMCxjKTt9CgpmbG9hdCBzY2VuZSh2ZWMzIHApCnsJCglncm91bmQgPSBwLnkrMC41OwoJYm94ID0gdWRCb3gocCpyb3RZKHAueSo1LjApKnJvdFkodCksdmVjMygwLjEsMC4yLDAuMSksMC4wMyk7CgkKCWZsb2F0IGQgPSAxZTEwOwoJCglkID0gbWluKGQsIGdyb3VuZCk7CglkID0gbWluKGQsIGJveCk7CgkKCXJldHVybiBkOwp9Cgp2ZWMzIGdldE5vcm1hbCh2ZWMzIHApCnsKCXZlYzIgZSA9IHZlYzIoUFJFQ0lTSU9OLDApOwoJdmVjMyBuID0gbm9ybWFsaXplKHZlYzMoCgkJc2NlbmUocCtlLnh5eSkgLSBzY2VuZShwLWUueHl5KSwKCQlzY2VuZShwK2UueXh5KSAtIHNjZW5lKHAtZS55eHkpLAoJCXNjZW5lKHArZS55eXgpIC0gc2NlbmUocC1lLnl5eCkKCSkpOwoJCglyZXR1cm4gbjsKfQoKdmVjMyBwcm9jZXNzQ29sb3IodmVjMyBwKQp7CglmbG9hdCBkID0gMWUxMDsKCQoJdmVjMyBuID0gZ2V0Tm9ybWFsKHApOwoJdmVjMyBsID0gbm9ybWFsaXplKGxpZ2h0LXApOwoJdmVjMyBjb2w7CgkKCWZsb2F0IGRpc3QgPSBsZW5ndGgobGlnaHQtcCk7CglmbG9hdCBkaWZmID0gbWF4KGRvdChuLGwpLDAuMCk7CglmbG9hdCBzcGVjID0gcG93KGRpZmYsMTAwLjApOwoJCglpZiAoZ3JvdW5kPGQpe2NvbD12ZWMzKGRpZmYqMC41KTtkPWdyb3VuZDt9CglpZiAoYm94PGQpe2NvbD1uK2RpZmYrc3BlYzt9CgkKCWNvbCAqPSBtaW4oMS4wLDEuMC9kaXN0KTsKCQoJcmV0dXJuIGNvbDsKfQoKdmVjMyBsb29rQXQodmVjMyBvLCB2ZWMzIHQpCnsKCXZlYzIgdXYgPSAoMi4wICogZ2xfRnJhZ0Nvb3JkLnh5IC0gaVJlc29sdXRpb24ueHkpIC8gaVJlc29sdXRpb24ueHg7Cgl2ZWMzIGRpciA9IG5vcm1hbGl6ZSh0LW8pLCB1cCA9IHZlYzMoMCwxLDApLCByaWdodCA9IGNyb3NzKHVwLGRpcik7Cgl1cCA9IGNyb3NzKGRpcixyaWdodCk7CgkKCXJldHVybiBub3JtYWxpemUocmlnaHQqdXYueCArIHVwKnV2LnkgKyBkaXIpOwp9Cgp2ZWMzIG1hcmNoKHZlYzMgcm8sIHZlYzMgcmQpCnsKCXZlYzMgcDsgZmxvYXQgdD0wLjAsIGQ7CgkKCWZvciAoaW50IGk9MDtpPFNURVBTO2krKykKCXsKCQlkPXNjZW5lKHJvK3JkKnQpOwoJCWlmKGQ8UFJFQ0lTSU9OfHx0PkRFUFRIKXticmVhazt9CgkJdCs9ZDsKCX0KCQoJcmV0dXJuKHJvK3JkKnQpOwp9Cgp2b2lkIG1haW4oKQp7CQoJdmVjMyBwID0gbWFyY2goZXllLGxvb2tBdChleWUsdmVjMygwKSkpOwoJdmVjMyBjb2wgPSBwcm9jZXNzQ29sb3IocCk7CgoJZ2xfRnJhZ0NvbG9yID0gdmVjNChjb2wsMS4wKTsKfQ=="
	};

	// HTML-Elements
	var $view     = $(".shader td:first-child");
	var $codeView = $(".shader .code-view");
	var $code     = $("#shader-editor");
	var $play     = $(".shader .play-pause");
	var $reset    = $(".shader .reset");
	var $run      = $(".shader .run");
	var $time     = $(".shader .time");
	var $fps      = $(".shader .fps");
	var $examples = $(".shader .examples");

	var Shader = Demo.Shader = {

		time: 0,
		pause: false,
		frameNumber: 0,
		playTime: 0,
		pauseTime: 0,
		fpsStartTime: 0,

		init: function(example) {

			Shader.example = examples[example] ? example : "Choose Example";

			// Setup Ace-Editor
			Shader.setupEditor();

			// Reference gl context
			Shader.gl = gl;

			// Setup view, compile and run
			Shader.canvasSetup();
			Shader.compile();
			Shader.togglePlayback(false);
			Shader.pauseTime = 0;

			// Register event-listeners
			$run.addEventListener("click", Shader.compile, false);
			$play.addEventListener("click", Shader.togglePlayback, false);
			$reset.addEventListener("click", Shader.reset, false);
			$examples.addEventListener("change", Shader.loadExample, false);
			window.addEventListener("resize", Shader.canvasSetup, false);
		},

		compile: function(e) {

			// Remove error class
			$codeView.className = $codeView.className.replace("error", "");

			// Get glsl code
			var codeValue = Shader.Editor.getValue();

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

			Shader.bfr = gl.createBuffer();
			Shader.aPos = gl.getAttribLocation(program, "aPos");

			// Setup uniforms
			Shader.iGlobalTime = gl.getUniformLocation(program, "iGlobalTime");
			Shader.iResolution = gl.getUniformLocation(program, "iResolution");
			Shader.iSample     = gl.getUniformLocation(program, "iSample");
			Shader.iSync       = gl.getUniformLocation(program, "iSync");

			// Setup rectangle vertices
			gl.bindBuffer(gl.ARRAY_BUFFER, Shader.bfr);
			gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1.0,-1.0,1.0,-1.0,-1.0,1.0,1.0,-1.0,1.0,1.0,-1.0,1.0]), gl.STATIC_DRAW);
			gl.enableVertexAttribArray(Shader.bfr);

			// Setup viewport
			gl.uniform2f(Shader.iResolution, gl.canvas.width, gl.canvas.height);
			gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);

			// Update the URL hash if the code was parsed due to a user event
			if (e) { window.location.hash = btoa(codeValue) + ";" + btoa(Demo.DSP.Editor.getValue()); }

			var err = gl.getError();

			// Check for errors, else start rendering
			if (err&&err!=gl.INVALID_VALUE) { Shader.error(); }
			else { Shader.render(); }
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

			var interval = (new Date().getTime()-Shader.fpsStartTime)/1000;

			if (interval>1) {
				Shader.fpsStartTime = new Date().getTime();
				Shader.frameNumber = 0;
			}

			return Math.min(Math.floor(++Shader.frameNumber/interval),60);
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
			if (!Demo.base64[0]||$_GET.shaderExample) { Shader.Editor.setValue(atob(examples[Shader.example])); }
			else { Shader.Editor.setValue(atob(Demo.base64[0])); }

			Shader.Editor.gotoLine(0);
		},

		updateInfo: function() {
			$time.innerHTML = Shader.time.toFixed(2);
			$fps.innerHTML = (Shader.fps<9?"0"+Shader.fps:Shader.fps) + " FPS";
		},

		loadExample: function(str) {
			var which = str || $examples.value;
			if (!examples[which]) { which = "Choose Example"; }

			Shader.Editor.setValue(atob(examples[which]));
			Shader.Editor.gotoLine(0);

			Shader.compile();
			Shader.togglePlayback(true);
			Shader.pauseTime = 0;
			Shader.pauseTime = new Date().getTime();
		}
	};

}(window.Demo || (window.Demo = {}), window));