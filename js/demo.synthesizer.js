;(function(Demo, window, undefined) {

	function $(str) { return document.querySelector(str); }

	window.f = function(){};
	var W, H, HW, HH, timer, t = 0;

	var allowedVariables = ["Math", "r"];
	var example = "/**\n * Synthesizer (JavaScript)\n * \n * function f // sample function (called automaticly)\n * int      t // current sample passed to f()\n * int      r // sample rate\n */\n\nfunction f(t) { return 0.5 * Math.sin(880 * Math.PI * t); }";

	// Settings
	var bufferSize = 512;
	var waveSize = 100;
	var lineWidth = 5;
	var lineColor = "#0F9";
	var sampleRate;
	var increase;

	// Interfaces
	var ctx = $(".synthesizer canvas").getContext("2d");
	var atx = new (window.AudioContext || window.webkitAudioContext || window.mozAudioContext);
	var node = atx.createScriptProcessor(bufferSize,1,2);
	
	// HTML-Elements
	var $view     = $(".synthesizer td");
	var $codeView = $(".synthesizer .code-view");
	var $code     = $("#synthesizer-editor");
	var $play     = $(".synthesizer .play-pause");
	var $reset    = $(".synthesizer .reset");
	var $run      = $(".synthesizer .run");
	var $time     = $(".synthesizer .time");

	Demo.Synthesizer = {

		init: function() {

			// Setup Ace-Editor
			Demo.Synthesizer.Editor = ace.edit("synthesizer-editor");
			Demo.Synthesizer.Editor.setTheme("ace/theme/monokai");
			Demo.Synthesizer.Editor.getSession().setMode("ace/mode/javascript");
			Demo.Synthesizer.Editor.setShowPrintMargin(false);
			Demo.Synthesizer.Editor.getSession().setUseWrapMode(true);

			// Use default code example if there's no base64 URL hash
			if (Demo.base64.length==1) { Demo.Synthesizer.Editor.setValue(example); }
			else { Demo.Synthesizer.Editor.setValue(atob(Demo.base64[1])); }

			Demo.Synthesizer.Editor.gotoLine(0);

			// Set system specific variables
			sampleRate = atx.sampleRate;
			increase = bufferSize/(sampleRate*bufferSize);

			// Parse code and setup canvas
			Demo.Synthesizer.parseCode();
			Demo.Synthesizer.canvasSetup();

			// Register audio process and start playback
			node.onaudioprocess = Demo.Synthesizer.process;
			Demo.Synthesizer.togglePlayback(true);

			// Event-Listeners
			$run.addEventListener("click", Demo.Synthesizer.parseCode, false);
			$play.addEventListener("click", Demo.Synthesizer.togglePlayback, false);
			$reset.addEventListener("click", Demo.Synthesizer.reset, false);
			$code.addEventListener("keydown", Demo.Synthesizer.onInput, false);
			window.addEventListener("resize", Demo.Synthesizer.canvasSetup, false);
		},

		process: function(e) {

			var ch0 = e.outputBuffer.getChannelData(0);
			var ch1 = e.outputBuffer.getChannelData(1);

			for (var i = 0, l = ch0.length; i < l; i++) {
				Demo.Synthesizer.display(ch0[i]=ch1[i]=f(t+=increase),i);
				Demo.Shader.gl.uniform1f(Demo.Shader.iSample,ch0[i]);
			}
		},

		canvasSetup: function() {

			// Update with and height variables
			W = ctx.canvas.width = $view.offsetWidth;   HW = W>>1;
			H = ctx.canvas.height = $view.offsetHeight; HH = H>>1;

			// Reset context variables
			ctx.fillStyle = "#111";
			ctx.strokeStyle = lineColor;
			ctx.lineWidth = lineWidth;
		},

		display: function(sample, i) {

			var x = (i/bufferSize)*W;
			var y = sample*waveSize+HH;

			if (i==0) {
				ctx.fillStyle = "#111"; ctx.fillRect(0,0,W,H);
				ctx.fillStyle = "#222"; ctx.fillRect(0,HH,W,2);
				ctx.beginPath(); ctx.moveTo(x,y);
				return;
			}

			ctx.lineTo(x,y);

			if (i==bufferSize-1) { ctx.stroke(); }
		},

		XSSPreventer: function() {

			var keys = [], key;
			
			// Gather all disallowed variables
			for (key in window) {
				if(!~allowedVariables.indexOf(key)) {
					keys.push(key);
				}
			}

			// Redefine them as undefined;
			return "var " + keys.join(",") + ";"
		},

		parseCode: function(e) {

			// Listen for nested errors which try-catch can't find
			window.onerror = Demo.Synthesizer.error;
			var codeValue = Demo.Synthesizer.Editor.getValue();

			// Remove error class
			$codeView.className = $codeView.className.replace("error", "");

			// Remove the previous script
			var $script = $("#synthesizer-script");
			if ($script) { $script.remove(); }

			// Create new script and safely insert the code
			$script           = document.createElement("script");
			$script.id        = "synthesizer-script";
			$script.innerHTML = "try{window.f=function(r){"+Demo.Synthesizer.XSSPreventer()+codeValue+"\n;return f}("+sampleRate+")}catch(e){Demo.Synthesizer.error(e)}";

			// Update the URL hash if the code was parsed due to a user event
			if (e) { window.location.hash = btoa(Demo.Shader.Editor.getValue()) + ";" + btoa(codeValue); }
			
			// Append the script
			document.body.appendChild($script);

			// Stop listening for global errors after a short time
			window.setTimeout(function() { window.onerror = null; }, 100);
		},

		togglePlayback: function(e) {
			var playing;

			if (typeof e == "boolean") { playing = !e; }
			else { playing = e && e.target.getAttribute("data-status") == "1"; }

			if (!playing) {
				timer = window.setInterval(function() { $time.innerHTML = ((t*(1/increase))/sampleRate).toFixed(2); }, 100);
				node.connect(atx.destination);
			} else {
				window.clearInterval(timer);
				node.disconnect();
			}

			$play.setAttribute("data-status", playing ? "0" : "1");
			$play.style.backgroundPosition = playing ? "0px 0px" : "-20px 0px";
		},

		generateThumbnail: function() {
			node.connect(atx.destination);
			window.setTimeout(function() { node.disconnect(); }, 10);
		},

		reset: function() {
			$time.innerHTML = "0.00"; t = 0;
		},

		error: function(e) {
			$codeView.className += " error";
		},

		onInput: function(e) {
			if (e.ctrlKey && [13, 83].indexOf(e.keyCode) != -1) {
				e.preventDefault();
				Demo.Synthesizer.parseCode(e);
			}
		}
	};

}(window.Demo || (window.Demo = {}), window));