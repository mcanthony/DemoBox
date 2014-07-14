;(function(Demo, window, undefined) {

	window.$ = function(str) {
		var list = document.querySelectorAll(str);
		if (list.length == 1) { list = list[0]; }

		return list.length==0?null:list;
	}

	NodeList.prototype.on = HTMLCollection.prototype.on = function(type, fn) {
		[].forEach.call(this, function(v, i) {
			v.addEventListener(type, fn);
		});
	};

	NodeList.prototype.removeClass = HTMLCollection.prototype.removeClass = function(name) {
		[].forEach.call(this, function(v, i) {
			v.className = v.className.replace(new RegExp(name,"g"), "");
		});
	};

	NodeList.prototype.addClass = HTMLCollection.prototype.addClass = function(name) {
		[].forEach.call(this, function(v, i) {
			v.className += " " + name;
		});
	};

	NodeList.prototype.css = HTMLCollection.prototype.css = function(prop, val) {
		[].forEach.call(this, function(v, i) {
			v.style[prop] = val;
		});
	};

	HTMLElement.prototype.removeClass = function(name) {
		this.className += " " + name;
	};

	HTMLElement.prototype.removeClass = function(name) {
		this.className = this.className.replace(new RegExp(name,"g"), "");
	};

}(window.Demo || (window.Demo = {}), window));