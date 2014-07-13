;(function(Demo, window, undefined) {

	function $(str) { return document.querySelector(str); }
	navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia;

	window.f = function(){};
	var W, H, HW, HH, timer;

	var allowedVariables = ["Math", "r"];
	var example = "/**\n * Synthesizer (JavaScript)\n * \n * function f // sample function (called automaticly)\n * int      t // current sample passed to f()\n * int      r // sample rate\n */\n\nvar step = 512/(512*r);\nvar notes = \"CcDdEFfGgAaH\".split(\"\");\nvar melody = \"CDEFGGAAAAGAAAAGFFFFEEDDDDC\".split(\"\");\nvar beat = [4,4,4,4,2,2,4,4,4,4,1,4,4,4,4,1,4,4,4,4,2,2,4,4,4,4,1];\nvar b = beat[0], tt = beat.i = melody.i = 0, n;\n\nfunction tone(n) {  return Math.pow(Math.pow(2,1/12),n) * 440; }\n\nfunction f(t) {\n\n    if (t<0.01) { tt = 0; beat.i = 0; melody.i = 0; }\n    tt += step;\n    \n    n = tone(notes.indexOf(melody[melody.i%melody.length]));\n    b = beat[beat.i%beat.length];\n    \n    if (tt>1/b) { tt = 0; beat.i++; melody.i++;  }\n    if (tt>0.95/b) { n = 0; }\n\n	return Math.sin(2*n*t);\n}";

	// Settings
	var bufferSize = 512;
	var waveSize = 100;
	var lineWidth = 5;
	var lineColor = "#0F9";
	var sampleRate;
	var increase;
	var scroll = 0;

	// Interfaces
	var ctx = $(".synthesizer canvas").getContext("2d");
	var atx = new (window.AudioContext || window.webkitAudioContext || window.mozAudioContext);
	var node = atx.createScriptProcessor(bufferSize,2,2);
	
	// HTML-Elements
	var $view     = $(".synthesizer td");
	var $codeView = $(".synthesizer .code-view");
	var $code     = $("#synthesizer-editor");
	var $play     = $(".synthesizer .play-pause");
	var $reset    = $(".synthesizer .reset");
	var $run      = $(".synthesizer .run");
	var $time     = $(".synthesizer .time");
	var $mic      = $(".synthesizer .mic");

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
			$mic.addEventListener("click", Synth.toggleMic, false);
			window.addEventListener("resize", Synth.canvasSetup, false);
		},

		process: function(e) {

			var freq = 0, current, last, in0, in1, out0, out1;

			if (Synth.micStream) {
				in0 = e.inputBuffer.getChannelData(0);
				in1 = e.inputBuffer.getChannelData(1);
			}

			out0 = e.outputBuffer.getChannelData(0);
			out1 = e.outputBuffer.getChannelData(1);

			for (var i = 0, l = out0.length; i < l; i++) {

				if (Synth.micStream) {
					current = in0[i];
					Synth.displayWave(current,i);
				} else {
					current = out0[i];
					Synth.displayWave(out0[i]=out1[i]=f(Synth.time+=increase),i);
				}
				
				if ((current>0&&last<0)||(current<0&&last>0)){freq++;}
				last = current;
			}

			Synth.freq = freq;
			Synth.displaySpectrum(Synth.micStream ? in0 : out0);
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

		displayWave: function(sample, i) {

			var x = (i/bufferSize)*W;
			var y = sample*waveSize+HH;

			var frequencies

			if (i==0) {

				Demo.Shader.gl.uniform1f(Demo.Shader.iSample,Synth.freq);
				Demo.Shader.gl.uniform1f(Demo.Shader.iSync,Synth.time);

				ctx.fillStyle = "#111"; ctx.fillRect(0,0,W,H);
				ctx.fillStyle = "#222"; ctx.fillRect(0,HH,W,2);
				ctx.beginPath(); ctx.moveTo(x,y);
				return;
			}

			ctx.lineTo(x,y);

			if (i==bufferSize-1) { ctx.stroke(); }
		},

		displaySpectrum: function(data) {

			var l = data.length, u = W/l, i, j, real, imag;

			ctx.fillStyle = "#999";
			ctx.beginPath();

			for(i=0; i < l; i++ ) {

				real = imag = 0;

				for(j=0; j < l; j++ ) {
					real += data[j]*Math.cos(Math.PI*i*j/l);
					//imag += data[j]*Math.sin(Math.PI*i*j/l);
				}

				ctx.rect(i*u,H,u*2,-Math.abs(real)*0.5);
			}

			ctx.fill();
		},

		displaySpectogram: function(data) {
			
			var l = 128||data.length, i, j, real, imag, num;

			for(i=0; i < l; i++ ) {

				real = imag = 0;

				for(j=0; j < l; j++ ) {
					real += data[j]*Math.cos(Math.PI*i*j/l);
					imag += data[j]*Math.sin(Math.PI*i*j/l);
				}

				num = ~~Math.abs(Math.log(Math.sqrt(real*real+imag*imag)))*100;
				ctx.fillStyle = "hsl("+num+",50%,"+(imag*50)+"%)";
				ctx.fillRect(scroll%W, i*H/l, 1, H/l);
			}

			scroll++;
			return;
		},

		XSSPreventer: function() {

			var keys = [], key;
			
			// Gather all disallowed variables
			for (key in window) {
				if (allowedVariables.indexOf(key) == -1) {
					keys.push(key);
				}
			}

			// Redefine them as undefined;
			return keys.length ? "var " + keys.join(",") + ";" : "";
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

		toggleMic: function(e) {

			var enabled = $mic.className.indexOf("disabled") == -1;

			if (!enabled) {
				navigator.getUserMedia({ audio: true }, function(stream) {
					Synth.micStream = stream;
					src = atx.createMediaStreamSource(stream).connect(node);
					$mic.className = $mic.className.replace("disabled", "");
					$code.className += " disabled";
				}, function(e) { alert("Access denied"); });
			} else {
				Synth.micStream.stop();
				Synth.micStream = false;
				$mic.className += " disabled";
				$code.className = $code.className.replace("disabled", "");
			}
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