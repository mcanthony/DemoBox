;(function(Demo, window, undefined) {

	"use strict";

	window.$ = function(str)
	{
		var list = document.querySelectorAll(str);
		if (list.length == 1) { list = list[0]; }
		return list.length === 0 ? null : list;
	};

	window.$_GET = (function()
	{
		var $_GET = {},
		    params = location.search.substr(1).split("&"),
		    pair, i, l;

		for (i = 0, l = params.length; i < l; i++)
		{
			pair = params[i].split("=");
			$_GET[pair[0]] = pair[1];
		}

		return $_GET;

	}());

	NodeList.prototype.on = HTMLCollection.prototype.on = function(type, fn)
	{
		[].forEach.call(this, function(v, i) {
			v.addEventListener(type, fn);
		});
	};

	NodeList.prototype.removeClass = HTMLCollection.prototype.removeClass = function(name)
	{
		[].forEach.call(this, function(v, i) {
			v.className = v.className.replace(new RegExp(name,"g"), "");
		});
	};

	NodeList.prototype.addClass = HTMLCollection.prototype.addClass = function(name)
	{
		[].forEach.call(this, function(v, i) {
			v.className += " " + name;
		});
	};

	NodeList.prototype.css = HTMLCollection.prototype.css = function(prop, val)
	{
		[].forEach.call(this, function(v, i) {
			v.style[prop] = val;
		});
	};

	HTMLElement.prototype.removeClass = function(name)
	{
		this.className += " " + name;
	};

	HTMLElement.prototype.removeClass = function(name)
	{
		this.className = this.className.replace(new RegExp(name,"g"), "");
	};

	Object.getOwnPropertyNames(Math).forEach(function(v)
	{
		window[v] = Math[v];
	});

}(window.Demo || (window.Demo = {}), window));