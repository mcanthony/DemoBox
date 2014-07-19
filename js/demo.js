;(function(Demo, window, undefined) {

	Demo.base64 = window.location.search ? "" : window.location.hash.substr(1).split(";");

	Demo.Shader.init(decodeURIComponent($_GET.shaderExample));
	Demo.DSP.init(decodeURIComponent($_GET.dspExample));

}(window.Demo || (window.Demo = {}), window));