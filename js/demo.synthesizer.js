;(function(Demo, window, undefined) {

	function $(str) { return document.querySelector(str); }

	window.f = function(){};
	var W, H, HW, HH, timer;

	var allowedVariables = ["Math", "r"];
	var example = "/**\n * Synthesizer (JavaScript)\n * \n * function f // sample function (called automaticly)\n * int      t // current sample passed to f()\n * int      r // sample rate\n */\n\n// Example by Killerwolf\n\nvar lastLoPass = 0;\nvar beat = [4,2,4,2,4,6,2,6,4,2,4,6,6,2,6,4,2,6,4,6,8,4,2,4,2,4,14,4,6,2,10,2,6,6,4,6,6,2,10,2,4,2];\nvar melpitch = [4,3,3,4];\n\nfunction lopa(input, cutoff){\n	var retrn = lastLoPass + (cutoff*(input-lastLoPass)); \n	lastLoPass = retrn;\n	lastLoPass = retrn;\n	return retrn;\n}\n\nfunction f(t) {\n	return lopa(Math.sin(Math.sin(t*100*beat[~~(t*6)%42]*melpitch[~~(t*1.5)%4]))*0.6, 0.05);\n}\n";

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
	var node = atx.createScriptProcessor(bufferSize,0,2);
	
	// HTML-Elements
	var $view     = $(".synthesizer td");
	var $codeView = $(".synthesizer .code-view");
	var $code     = $("#synthesizer-editor");
	var $play     = $(".synthesizer .play-pause");
	var $reset    = $(".synthesizer .reset");
	var $run      = $(".synthesizer .run");
	var $time     = $(".synthesizer .time");

	var Synth = Demo.Synthesizer = {

		time: 0,

		init: function() {

			// Setup Ace-Editor
			Synth.setupEditor();

			// Set system specific variables
			sampleRate = atx.sampleRate;
			increase = bufferSize/(sampleRate*bufferSize);

			// Parse code and setup canvas
			Synth.parseCode();
			Synth.canvasSetup();

			// Register audio process and start playback
			node.onaudioprocess = Synth.process;
			Synth.togglePlayback(true);

			// Event-Listeners
			$run.addEventListener("click", Synth.parseCode, false);
			$play.addEventListener("click", Synth.togglePlayback, false);
			$reset.addEventListener("click", Synth.reset, false);
			window.addEventListener("resize", Synth.canvasSetup, false);
		},

		process: function(e) {

			var ch0 = e.outputBuffer.getChannelData(0);
			var ch1 = e.outputBuffer.getChannelData(1);
			var freq = 0, current, last;

			for (var i = 0, l = ch0.length; i < l; i++) {
				Synth.display(ch0[i]=ch1[i]=f(Synth.time+=increase),i);
				
				current = ch0[i];
				if ((current>0&&last<0)||(current<0&&last>0)){freq++;}
				last = current;
			}

			Synth.freq = freq;
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
				Demo.Shader.gl.uniform1f(Demo.Shader.iSample,Synth.freq);
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

			// Listen for nested errors which try-catch can'Synth.time find
			window.onerror = Synth.error;
			var codeValue = Synth.Editor.getValue();

			// Remove error class
			$codeView.className = $codeView.className.replace("error", "");

			// Remove the previous script
			var $script = $("#synthesizer-script");
			if ($script) { $script.remove(); }

			// Create new script and safely insert the code
			$script           = document.createElement("script");
			$script.id        = "synthesizer-script";
			$script.innerHTML = "try{window.f=function(r){"+Synth.XSSPreventer()+codeValue+"\n;return f}("+sampleRate+")}catch(e){Synth.error(e)}";

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
				timer = window.setInterval(function() { $time.innerHTML = ((Synth.time*(1/increase))/sampleRate).toFixed(2); }, 100);
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
			$time.innerHTML = "0.00"; Synth.time = 0;
		},

		error: function(e) {
			$codeView.className += " error";
		},

		setupEditor: function() {

			Synth.Editor = ace.edit("synthesizer-editor");
			Synth.Editor.setTheme("ace/theme/monokai");
			Synth.Editor.getSession().setMode("ace/mode/javascript");
			Synth.Editor.setShowPrintMargin(false);
			Synth.Editor.getSession().setUseWrapMode(true);

			Synth.Editor.commands.addCommand({
				name: 'compile',
				bindKey: {win: 'Ctrl-Enter',  mac: 'Command-Enter'},
				exec: Synth.parseCode
			});

			// Use default code example if there's no base64 URL hash
			if (Demo.base64.length==1) { Synth.Editor.setValue(example); }
			else { Synth.Editor.setValue(atob(Demo.base64[1])); }

			Synth.Editor.gotoLine(0);
		}
	};

}(window.Demo || (window.Demo = {}), window));