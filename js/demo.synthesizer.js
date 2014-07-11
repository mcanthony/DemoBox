;(function(Demo, window, undefined) {

	function $(str) { return document.querySelector(str); }

	var t = 0, sampleRate, timer;
	window.f = function(){};

	var W, H, HW, HH;
	var example = "/**\n * Synthesizer (JavaScript)\n * \n * function f // sample function (called automaticly)\n * int      t // current sample passed to f()\n * int      r // sample rate\n */\n\nfunction f(t) { return Math.sin(t*0.1); }";
	var allowed = ["Math", "r"];

	// Settings
	var bufferSize = 512;
	var increase;
	var waveSize = 100;
	var lineWidth = 5;
	var lineColor = "#0F9";

	// Interfaces
	var ctx = $(".synthesizer canvas").getContext("2d");
	var atx = new (window.AudioContext || window.webkitAudioContext || window.mozAudioContext);
	var node = atx.createScriptProcessor(bufferSize,1,2);
	
	// HTML-Elements
	var $view  = $(".synthesizer td");
	var $code  = $(".synthesizer textarea");
	var $play  = $(".synthesizer .play-pause");
	var $reset = $(".synthesizer .reset");
	var $run   = $(".synthesizer .run");
	var $time  = $(".synthesizer .time");

	Demo.Synthesizer = {

		init: function() {

			var base64 = window.location.hash.substr(1);
			if (!base64) { $code.value = example; }

			sampleRate = atx.sampleRate;
			increase = bufferSize/(sampleRate*bufferSize);

			// Play
			Demo.Synthesizer.parseCode();
			Demo.Synthesizer.canvasSetup();

			node.onaudioprocess = Demo.Synthesizer.process;
			Demo.Synthesizer.togglePlayback(true);

			// Event-Listeners
			$run.addEventListener("click", Demo.Synthesizer.parseCode, false);
			$play.addEventListener("click", Demo.Synthesizer.togglePlayback);
			$reset.addEventListener("click", Demo.Synthesizer.reset);

			window.addEventListener("resize", Demo.Synthesizer.canvasSetup);
		},

		process: function(e) {

			var data = e.outputBuffer.getChannelData(0);

			for (var i = 0, l = data.length; i < l; i++) {
				Demo.Synthesizer.display(data[i]=f(t+=increase),i);
				Demo.Shader.gl.uniform1f(Demo.Shader.iSample,data[i]);
			}
		},

		display: function(sample, i) {

			var x = (i/bufferSize)*W;
			var y = sample*waveSize+HH;

			if (i==0) {
				ctx.fillRect(0,0,W,H);
				ctx.beginPath();
				ctx.moveTo(x,y);
				return;
			}

			ctx.lineTo(x,y);

			if (i==bufferSize-1) { ctx.stroke(); }
		},

		reset: function() {
			t = 0;
			$time.innerHTML = "0.00";
			// Demo.Synthesizer.togglePlayback(false);
		},

		togglePlayback: function(e) {
			var playing;

			if (typeof e == "boolean") { playing = !e; }
			else { playing = e && e.target.getAttribute("data-status") == "1"; }

			if (!playing) {
				timer = window.setInterval(function() { $time.innerHTML = (t/sampleRate).toFixed(2); }, 100);
				node.connect(atx.destination);
			} else {
				window.clearInterval(timer);
				node.disconnect();
			}

			$play.setAttribute("data-status", playing ? "0" : "1");
			$play.style.backgroundPosition = playing ? "0px 0px" : "-20px 0px";
		},

		parseCode: function(e) {

			window.onerror = Demo.Synthesizer.error;
			$code.className = "";

			var $script = $("#script");
			if ($script) { $script.remove(); }

			$script = document.createElement("script");
			$script.id = "script";
			$script.innerHTML = "try{window.f=function(r){"+Demo.Synthesizer.XSSPreventer()+$code.value+"\n;return f}("+sampleRate+")}catch(e){Demo.Synthesizer.error(e)}";

			if (e) { window.location.hash = btoa($(".shader textarea").value) + ";" + btoa($code.value); }
			document.body.appendChild($script);
			window.onerror = null;
		},

		canvasSetup: function() {
			W = ctx.canvas.width = $view.offsetWidth;   HW = W>>1;
			H = ctx.canvas.height = $view.offsetHeight; HH = H>>1;

			// Canvas setup
			ctx.fillStyle = "#111";
			ctx.strokeStyle = lineColor;
			ctx.lineWidth = lineWidth;
			//Demo.Synthesizer.generateThumbnail();
		},

		generateThumbnail: function() {
			node.connect(atx.destination);
			window.setTimeout(function() { node.disconnect(); }, 10);
		},

		XSSPreventer: function() {
			var keys = [];
			
			for (var key in window) {
				if(!~allowed.indexOf(key)) {
					keys.push(key);
				}
			}

			return "var " + keys.join(",") + ";"
		},

		error: function(e) {
			$code.className = "error";
		}
	};

	// Run code and enable tabs
	$code.addEventListener("keydown", function(e) {
		if (e.ctrlKey && [13, 83].indexOf(e.keyCode) != -1) {
			
			e.preventDefault();
			window.location.hash = btoa($(".shader textarea").value) + ";" + btoa($code.value);
			Demo.Synthesizer.parseCode();

		} else if (e.keyCode === 9) {

			var start = $code.selectionStart;
			var end = $code.selectionEnd;
			$code.value = ($code.value.substring(0, start) + "\t" + $code.value.substring(end));
			$code.selectionStart = $code.selectionEnd = start + 1;
			e.preventDefault();
		}
	}, false);

}(window.Demo || (window.Demo = {}), window));