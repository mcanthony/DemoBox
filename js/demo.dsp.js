;(function(Demo, window, undefined) {

	navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia;

	window.f = function(){};
	var W, H, HW, HH, timer;
	var allowedVariables = ["Math", "r"].concat(Object.getOwnPropertyNames(Math));

	var examples = {
		"Choose Example": "LyoqCiAqIERTUCAoSmF2YVNjcmlwdCkKICogCiAqIGZ1bmN0aW9uIGYgLy8gc2FtcGxlIGZ1bmN0aW9uIChjYWxsZWQgYXV0b21hdGljbHkpCiAqIGludCAgICAgIHQgLy8gY3VycmVudCBzYW1wbGUgcGFzc2VkIHRvIGYoKQogKiBpbnQgICAgICByIC8vIHNhbXBsZSByYXRlIGluIEhlcnR6CiAqLwoKZnVuY3Rpb24gZih0KSB7IHJldHVybiBNYXRoLnNpbigyICogTWF0aC5QSSAqIDQ0MCAqIHQpOyB9",
		"Chiptune": "dmFyIGJlYXQgICA9IDEvNDsKdmFyIHN0ZXAgICA9IDEvci9iZWF0Owp2YXIgbm90ZXMgID0gIkNjRGRFRmZHZ0FhSCIuc3BsaXQoIiIpOwoKdmFyIG1lbG9keSA9ICJBREZBREZBQy1HRkdBRENFRCIuc3BsaXQoIiIpOwp2YXIgYmVhdCAgID0gWzIsOCwxLDJdOwoKdmFyIGIgPSBiZWF0WzBdLCB0dCA9IGJlYXQuaSA9IG1lbG9keS5pID0gMCwgbjsKCmZ1bmN0aW9uIGYodCkgewogICAgaWYgKHQ8MC4wMSkgeyB0dCA9IDA7IGJlYXQuaSA9IDA7IG1lbG9keS5pID0gMDsgfQogICAgdHQgKz0gc3RlcDsKICAgIAogICAgbiA9IHRvbmUobm90ZXMuaW5kZXhPZihtZWxvZHlbbWVsb2R5LmklbWVsb2R5Lmxlbmd0aF0pLGIpOwogICAgYiA9IGJlYXRbYmVhdC5pJWJlYXQubGVuZ3RoXTsKICAgIAogICAgaWYgKHR0PjEvYikgeyB0dCA9IDA7IGJlYXQuaSsrOyBtZWxvZHkuaSsrOyAgfQoJcmV0dXJuICFuPzA6c3F1YXJlV2F2ZSgwLjIqbip0LDEwKSowLjM7Cn0KCmZ1bmN0aW9uIHNxdWFyZVdhdmUoeCxrKSB7Zm9yKHZhciBpPTEsbj0wO2k8aztpKyspe24rPU1hdGguc2luKDIqTWF0aC5QSSooMippLTEpKngpLygyKmktMSl9cmV0dXJuIDQvTWF0aC5QSSpufQpmdW5jdGlvbiB0b25lKG4sb2N0YXZlKSB7IHJldHVybiBuPT0tMT8wOk1hdGgucG93KE1hdGgucG93KDIsMS8xMiksbikgKiA0NDAgKiBvY3RhdmU7IH0="
	};

	// Settings
	var bufferSize = 2048;
	var waveSize   = 50;
	var lineWidth  = 5;
	var lineColor  = "#0F9";
	var ftcount    = 0;
	var sampleRate = null;
	var increase   = null;
	var warned     = window.localStorage.getItem("warned");

	// Interfaces
	var ctx = $(".dsp canvas").getContext("2d");
	var atx = new (window.AudioContext || window.webkitAudioContext || window.mozAudioContext);
	var node = atx.createScriptProcessor(bufferSize,2,2);
	var gain = atx.createGain();

	gain.gain.value = window.localStorage.getItem("gain") || 0.02;
	
	// HTML-Elements
	var $view     = $(".dsp td:first-child");
	var $codeView = $(".dsp .code-view");
	var $code     = $("#dsp-editor");
	var $play     = $(".dsp .play-pause");
	var $reset    = $(".dsp .reset");
	var $run      = $(".dsp .run");
	var $time     = $(".dsp .time");
	var $mic      = $(".dsp .mic");
	var $gain     = $("#gain");
	var $examples = $(".dsp .examples");

	$gain.value = gain.gain.value;

	var DSP = Demo.DSP = {

		time: 0,
		playing: false,
		diagram: "wave",

		init: function(example) {

			DSP.example = examples[example] ? example : "Choose Example";

			// Setup Ace-Editor
			DSP.setupEditor();

			// Set system specific variables
			sampleRate = atx.sampleRate;
			increase = bufferSize/(sampleRate*bufferSize);

			// Parse code and setup canvas
			DSP.parseCode();
			DSP.canvasSetup();

			// Register audio process and start playback
			node.onaudioprocess = DSP.process;
			node.connect(gain);

			// Event-Listeners
			$run.addEventListener("click", DSP.parseCode, false);
			$play.addEventListener("click", DSP.togglePlayback, false);
			$reset.addEventListener("click", DSP.reset, false);
			$mic.addEventListener("click", DSP.toggleMic, false);
			$gain.addEventListener("change", DSP.gainSlider, false);
			$examples.addEventListener("change", DSP.loadExample, false);
			window.addEventListener("resize", DSP.canvasSetup, false);
			
			$(".diagram-controls span").on("click", DSP.toggleDiagram);
		},

		process: function(e) {

			if (!DSP.playing) { return; }

			var freq = 0, current, last, in0, in1, out0, out1;

			if (DSP.micStream) {
				in0 = e.inputBuffer.getChannelData(0);
				in1 = e.inputBuffer.getChannelData(1);
			}

			out0 = e.outputBuffer.getChannelData(0);
			out1 = e.outputBuffer.getChannelData(1);

			for (var i = 0, l = out0.length; i < l; i++) {

				if (DSP.micStream) { current = in0[i]; out0[i] = out1[i] = 0; }
				else { current = out0[i] = out1[i]= f(DSP.time+=increase); }

				if (DSP.diagram == "wave") { DSP.displayWave(current,i); }
				if ((current>0&&last<0)||(current<0&&last>0)){freq++;}

				last = current;
			}

			if (DSP.diagram == "spectrum") { DSP.displaySpectrum(DSP.micStream ? in0 : out0); }
			if (DSP.diagram == "spectrogram") { DSP.displaySpectrogram(DSP.micStream ? in0 : out0); }

			DSP.freq = freq;

			if (DSP.generatingThumbnail) { DSP.generateThumbnail(true); }
		},

		canvasSetup: function() {

			// Update with and height variables
			W = ctx.canvas.width = $view.offsetWidth;   HW = W>>1;
			H = ctx.canvas.height = $view.offsetHeight; HH = H>>1;

			// Reset context variables
			ctx.fillStyle = "#111";
			ctx.strokeStyle = lineColor;
			ctx.lineWidth = lineWidth;

			DSP.generateThumbnail();
		},

		toggleDiagram: function(e) {

			DSP.diagram = e.target.getAttribute("data-type");
			e.target.parentElement.children.addClass("disabled");
			e.target.removeClass("disabled");

			if (DSP.diagram == "spectrogram") {
				ftcount = 0;
				ctx.fillStyle = "#111"; ctx.fillRect(0,0,W,H);
			}
		},

		displayWave: function(sample, i) {

			var x = (i/bufferSize)*W;
			var y = sample*waveSize+HH;

			if (i==0) {

				Demo.Shader.gl.uniform1f(Demo.Shader.iSample,DSP.freq);
				Demo.Shader.gl.uniform1f(Demo.Shader.iSync,DSP.time);

				ctx.fillStyle = "#111"; ctx.fillRect(0,0,W,H);
				ctx.fillStyle = "#222"; ctx.fillRect(0,HH,W,2);

				ctx.beginPath(); ctx.moveTo(x,y);
				return;
			}

			ctx.lineTo(x,y);

			if (i==bufferSize-1) { ctx.stroke(); }
		},

		displaySpectrum: function(data) {

			var l = 512, u = W/l, i, j, real, imag;

			ctx.fillStyle = "#111"; ctx.fillRect(0,0,W,H);
			ctx.fillStyle = lineColor;
			ctx.beginPath();

			for(i = 0; i < l; i++) {

				real = imag = 0;

				for(j=0; j < l; j++ ) {
					real += data[j]*Math.cos(Math.PI*i*j/l);
					//imag += data[j]*Math.sin(Math.PI*i*j/l);
				}

				ctx.rect(i*u,HH,u*2,-Math.abs(real));
			}

			ctx.fill();
		},

		displaySpectrogram: function(data) {
			
			var l = 512, con = -2*Math.PI/l, i, j, b, real, imag, val;

			for(i = 0; i < l/2; i++) {

				real = imag = 0;

				for(j= 0 ; j < l; j++) {

					real += data[j]*Math.cos(b = con*i*j);
					imag += data[j]*Math.sin(b);
				}

				val = ~~(10 * Math.log(real*real+imag*imag)+170);

				ctx.fillStyle = "hsl("+val+",80%,50%)";
				ctx.fillRect(ftcount%W, ~~(i*(l/(i+15))*H/l)*0.95, 1, ~~((l/(i+15))*H/l+1));
			}

			ftcount++;
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

			// Listen for nested errors which try-catch can'DSP.time find
			window.onerror = DSP.error;
			var codeValue = DSP.Editor.getValue();

			// Remove error class
			$codeView.className = $codeView.className.replace("error", "");

			// Remove the previous script
			var $script = $("#dsp-script");
			if ($script) { $script.remove(); }

			// Create new script and safely insert the code
			$script           = document.createElement("script");
			$script.id        = "dsp-script";
			$script.innerHTML = "try{window.f=function(r){"+DSP.XSSPreventer()+codeValue+"\n;return f}("+sampleRate+")}catch(e){DSP.error(e)}";

			// Update the URL hash if the code was parsed due to a user event
			if (e) { window.location.search = ""; window.location.hash = btoa(Demo.Shader.Editor.getValue()) + ";" + btoa(codeValue); }
			
			// Append the script
			document.body.appendChild($script);

			// Stop listening for global errors after a short time
			window.setTimeout(function() { window.onerror = null; }, 100);
		},

		togglePlayback: function(e) {

			if (!warned) {
				if (confirm("The playback volume currently varies greatly from system to system. Please turn your speakers down before continuing."))
				{ warned = true; window.localStorage.setItem("warned", "true"); }
				else { return; }
			}

			DSP.playing = typeof e == "object" ? !DSP.playing : e;

			if (DSP.playing) {

				timer = window.setInterval(DSP.updateInfo, 100);
				gain.connect(atx.destination);

			} else {
				window.clearInterval(timer);
				gain.disconnect();
			}

			$play.setAttribute("data-status", DSP.playing ? "1" : "0");
			$play.style.backgroundPosition = DSP.playing ? "-20px 0px" : "0px 0px";
		},

		toggleMic: function(e) {

			var enabled = $mic.className.indexOf("disabled") == -1;

			if (!enabled) {
				navigator.getUserMedia({ audio: true }, function(stream) {
					DSP.micStream = stream;
					src = atx.createMediaStreamSource(stream).connect(node);
					$mic.className = $mic.className.replace("disabled", "");
					$code.className += " disabled";
				}, function(e) { alert("Access denied"); });
			} else {
				DSP.micStream.stop();
				DSP.micStream = false;
				$mic.className += " disabled";
				$code.className = $code.className.replace("disabled", "");
			}
		},

		generateThumbnail: function(stop) {

			if (stop === true) {
				if (!DSP.playState) { gain.disconnect(); }
				DSP.playing = DSP.playState;
				delete DSP.generatingThumbnail;
				gain.gain.value = DSP.gainVal;
				return;
			}

			if (DSP.generatingThumbnail) { return; }

			DSP.playState = DSP.playing;
			DSP.playing = true;
			DSP.generatingThumbnail = true;

			DSP.gainVal = gain.gain.value;
			gain.gain.value = 0;
			gain.connect(atx.destination);
		},

		reset: function() {
			$time.innerHTML = "0.00"; DSP.time = 0;
		},

		error: function(e) {
			$codeView.className += " error";
		},

		updateInfo: function() {
			$time.innerHTML = ((DSP.time*(1/increase))/sampleRate).toFixed(2);
		},

		setupEditor: function() {

			DSP.Editor = ace.edit("dsp-editor");
			DSP.Editor.setTheme("ace/theme/monokai");
			DSP.Editor.getSession().setMode("ace/mode/javascript");
			DSP.Editor.setShowPrintMargin(false);
			DSP.Editor.getSession().setUseWrapMode(true);

			DSP.Editor.commands.addCommand({
				name: 'compile',
				bindKey: {win: 'Ctrl-Enter',  mac: 'Command-Enter'},
				exec: DSP.parseCode
			});

			// Use default code example if there's no base64 URL hash
			if (!Demo.base64[1]||$_GET.dspExample) { DSP.Editor.setValue(atob(examples[DSP.example])); }
			else { DSP.Editor.setValue(atob(Demo.base64[1])); }

			DSP.Editor.gotoLine(0);
		},

		gainSlider: function(e) {
			var val = e.target.value;
			gain.gain.value = val;
			window.localStorage.setItem("gain", val);
		},

		loadExample: function() {
			var which = typeof str == "string" ? str : $examples.value;
			if (!examples[which]) { which = "Choose Example"; }

			DSP.Editor.setValue(atob(examples[which]));
			DSP.Editor.gotoLine(0);

			DSP.parseCode();
			DSP.generateThumbnail();
		}
	};

}(window.Demo || (window.Demo = {}), window));