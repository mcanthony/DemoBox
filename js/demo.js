;(function(Demo, window, undefined) {

	function $(str) { return document.querySelector(str); }

	var base64 = location.hash.substr(1);

	if (base64) {
		base64 = base64.split(";");
		$(".shader textarea").value = atob(base64[0]);
		$(".synthesizer textarea").value = atob(base64[1]);
	}

	Demo.Shader.init();
	Demo.Synthesizer.init();

}(window.Demo || (window.Demo = {}), window));