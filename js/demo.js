;(function(Demo, window, undefined) {

	Demo.base64 = window.location.hash.substr(1).split(";");

	Demo.Shader.init();
	Demo.DSP.init();

}(window.Demo || (window.Demo = {}), window));