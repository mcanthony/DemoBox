;(function(Demo, window, undefined) {

	function $(str) { return document.querySelector(str); }

	window.t = 0;
	var example = "/**\n * Synthesizer (Javascript)\n * \n * function f // sample function (called automaticly)\n * int      t // current sample\n * int      r // sample rate\n */\n\nfunction f() { return Math.sin(t*0.1); }";

	// Settings
	var bufferSize = 512;
	var waveSize = 10;
	var lineWidth = 5;
	var lineColor = "#0F9";

	// Interfaces
	var ctx = $(".synthesizer canvas").getContext("2d");
	var atx = new (window.AudioContext || window.webkitAudioContext || window.mozAudioContext);
	var node = atx.createScriptProcessor(bufferSize,1,1);
	
	// HTML-Elements
	var $view = $(".synthesizer td");
	var $code = $(".synthesizer textarea");

	var $play = $(".synthesizer .play-pause");
	var $reset = $(".synthesizer .reset");
	var $run = $(".synthesizer .run");
	var $time = $(".synthesizer .time");

	var W, H, HW, HH;

	Demo.Synthesizer = {

		init: function() {

			var base64 = window.location.hash.substr(1);
			if (!base64) { $code.value = example; }

			// Play
			Demo.Synthesizer.parseCode();
			Demo.Synthesizer.canvasSetup();

			// Event-Listeners
			$run.addEventListener("click", Demo.Synthesizer.parseCode, false);
			$play.addEventListener("click", Demo.Synthesizer.togglePlayback);
			$reset.addEventListener("click", Demo.Synthesizer.reset);

			window.r = atx.sampleRate;
			window.addEventListener("resize", Demo.Synthesizer.canvasSetup);
		},

		process: function(e) {

			var data = e.outputBuffer.getChannelData(0), sample;

			for (var i = 0; i < data.length; ++i) {
				sample = f();
				data[i] = sample;
				Demo.Synthesizer.display(sample,i);
				window.t++;
			}

			$time.innerHTML = (window.t/data.length).toFixed(2);
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
			window.t = 0;
			$time.innerHTML = (window.t/bufferSize/10).toFixed(2);
			Demo.Synthesizer.togglePlayback(false);
		},

		togglePlayback: function(e) {
			var playing;

			if (typeof e == "boolean") { playing = !e; }
			else { playing = e && e.target.getAttribute("data-status") == "1"; }

			if (!playing) { node.connect(atx.destination); }
			else { node.disconnect(); }

			$play.setAttribute("data-status", playing ? "0" : "1");
			$play.style.backgroundPosition = playing ? "0px 0px" : "-20px 0px";
		},

		parseCode: function(e) {
			var $script = $("#script");
			if ($script) { $script.remove(); }

			$script = document.createElement("script");
			$script.id = "script";
			$script.innerHTML = $code.value;

			if (e) { window.location.hash = btoa($(".shader textarea").value) + ";" + btoa($code.value); }
			document.body.appendChild($script);
		},

		canvasSetup: function() {
			W = ctx.canvas.width = $view.offsetWidth;   HW = W>>1;
			H = ctx.canvas.height = $view.offsetHeight; HH = H>>1;

			// Canvas setup
			ctx.fillStyle = "#111";
			ctx.strokeStyle = lineColor;
			ctx.lineWidth = lineWidth;

			Demo.Synthesizer.generateThumbnail();
		},

		generateThumbnail: function() {
			node.onaudioprocess = Demo.Synthesizer.process;
			node.connect(atx.destination);
			window.setTimeout(function() { node.disconnect(); }, 10);
		}
	};

	// Run code and enable tabs
	$code.addEventListener("keydown", function(e) {
		if (e.ctrlKey && [13, 83].indexOf(e.keyCode) != -1) {
			
			e.preventDefault();
			window.location.hash = btoa($(".shader textarea").value) + ";" + btoa($code.value);
			Demo.Synthesizer.parseCode();

		} else if (e.keyCode === 9) {

			var start = Demo.Synthesizer.selectionStart;
			var end = Demo.Synthesizer.selectionEnd;
			Demo.Synthesizer.value = (Demo.Synthesizer.value.substring(0, start) + "\t" + Demo.Synthesizer.value.substring(end));
			Demo.Synthesizer.selectionStart = Demo.Synthesizer.selectionEnd = start + 1;
			e.preventDefault();
		}
	}, false);

}(window.Demo || (window.Demo = {}), window));