!function(a,b){"use strict";b.$=function(a){var b=document.querySelectorAll(a);return 1==b.length&&(b=b[0]),0===b.length?null:b},b.$_GET=function(){var a,b,c,d={},e=location.search.substr(1).split("&");for(b=0,c=e.length;c>b;b++)a=e[b].split("="),d[a[0]]=a[1];return d}(),NodeList.prototype.on=HTMLCollection.prototype.on=function(a,b){[].forEach.call(this,function(c){c.addEventListener(a,b)})},NodeList.prototype.removeClass=HTMLCollection.prototype.removeClass=function(a){[].forEach.call(this,function(b){b.className=b.className.replace(new RegExp(a,"g"),"")})},NodeList.prototype.addClass=HTMLCollection.prototype.addClass=function(a){[].forEach.call(this,function(b){b.className+=" "+a})},NodeList.prototype.css=HTMLCollection.prototype.css=function(a,b){[].forEach.call(this,function(c){c.style[a]=b})},HTMLElement.prototype.removeClass=function(a){this.className+=" "+a},HTMLElement.prototype.removeClass=function(a){this.className=this.className.replace(new RegExp(a,"g"),"")},Object.getOwnPropertyNames(Math).forEach(function(a){b[a]=Math[a]})}(window.Demo||(window.Demo={}),window),function(a,b){"use strict";var c=null,d="attribute vec2 aPos;void main(){gl_Position=vec4(aPos.x,aPos.y,0.0,1.0);}",e="precision mediump float;uniform vec2 iResolution;uniform float iGlobalTime;uniform sampler2D iDSP;uniform float iSync;\n",f={"Choose Example":"LyoqCiAqIEZyYWdtZW50LVNoYWRlciAoT3BlbkdMIEVTIDIuMCkKICogIAogKiB2ZWMyICAgICAgaVJlc29sdXRpb24gLy8gY2FudmFzIHJlc29sdXRpb24gaW4gcGl4ZWxzCiAqIGZsb2F0ICAgICBpR2xvYmFsVGltZSAvLyBwbGF5YmFjayB0aW1lIGluIHNlY29uZHMKICogZmxvYXQgICAgIGlTeW5jICAgICAgIC8vIEN1cnJlbnQgRFNQIHBsYXliYWNrIHRpbWUgaW4gc2Vjb25kcwogKiBzYW1wbGVyMkQgaURTUCAgICAgICAgLy8gQ29udGFpbnMgZnJlcXVlbmN5IGFuZCB3YXZlIGRhdGEKICovCgp2b2lkIG1haW4oKQp7Cgl2ZWMyIHV2ID0gZ2xfRnJhZ0Nvb3JkLnh5IC8gaVJlc29sdXRpb24ueHk7CglnbF9GcmFnQ29sb3IgPSB2ZWM0KHV2LHNpbihpR2xvYmFsVGltZSksMS4wKTsKfQ==","iDSP Usage":"dm9pZCBtYWluKCkKewoJdmVjMiB1diA9IGdsX0ZyYWdDb29yZC54eSAvIGlSZXNvbHV0aW9uLnh5OwoJZ2xfRnJhZ0NvbG9yID0gdmVjNCh2ZWMzKHRleHR1cmUyRChpRFNQLHZlYzIodXYueCwwKSkueCksMS4wKTsKfQ==","2D Voroni":"Y29uc3QgaW50IE4gPSAyMDA7CnZlYzIgcG9pbnRzW05dOwoKdmVjMiBub2lzZSh2ZWMyIGNvKXsKICAgIHJldHVybiB2ZWMyKAoJCWZyYWN0KHNpbihkb3QoY28ueHkgLHZlYzIoMTIuOTg5OCw3OC4yMzMpKSkgKiA0Mzc1OC41NDUzKSwKCQlmcmFjdChjb3MoZG90KGNvLnl4ICx2ZWMyKDEyLjk4OTgsNDM3NTguNTQ1MykpKSAqIDc4LjIzMykKCSk7Cn0KCnZvaWQgZ2VuZXJhdGVQb2ludHMoKQp7CQoJZmxvYXQgbiA9IDAuMDsKCQoJZm9yKGludCBpID0gMDsgaSA8IE47IGkrKykKCXsKCQlwb2ludHNbaV0gPSBub2lzZSh2ZWMyKG4pKTsJCQoJCW4gKz0gMS4wL2Zsb2F0KE4pOwoJfQp9CgpmbG9hdCB2b3JvbmkodmVjMiB1dikKewoJZmxvYXQgZGlzdCA9IDEuMDsKCQoJZm9yKGludCBpID0gMDsgaSA8IE47IGkrKykKCXsgZGlzdCA9IG1pbihkaXN0LCBsZW5ndGgodXYtcG9pbnRzW2ldKSk7IH0KCglyZXR1cm4gMS4wIC0gZGlzdCoxMC4wOwp9Cgp2b2lkIG1haW4oKQp7CQoJZ2VuZXJhdGVQb2ludHMoKTsKCQoJdmVjMiB1diA9IGdsX0ZyYWdDb29yZC54eSAvIGlSZXNvbHV0aW9uLnh5OwoJdmVjMyBjb2wgPSB2ZWMzKHZvcm9uaSh1dikpOwoJCglnbF9GcmFnQ29sb3IgPSB2ZWM0KGNvbCwxLjApOwp9","2D Perlin":"I2RlZmluZSBOIDIwCiNkZWZpbmUgVSAxLjAvZmxvYXQoTikKCQp2ZWMyIG5vaXNlKHZlYzIgY28pewogICAgcmV0dXJuICh2ZWMyKAoJCWZyYWN0KHNpbihkb3QoY28ueHkgLHZlYzIoMTIuOTg5OCw3OC4yMzMpKSkgKiA0Mzc1OC41NDUzKSwKCQlmcmFjdChjb3MoZG90KGNvLnl4ICx2ZWMyKDEyLjk4OTgsNDM3NTguNTQ1MykpKSAqIDc4LjIzMykKCSktMC41KSoyLjA7Cn0KCmZsb2F0IGYoZmxvYXQgdCkgeyByZXR1cm4gNi4wKnQqdCp0KnQqdC0xNS4wKnQqdCp0KnQrMTAuMCp0KnQqdDsgfQoKZmxvYXQgcGVybGluKHZlYzIgcCkKewoJZmxvYXQgaSA9IGZsb29yKHAueCk7CglmbG9hdCBqID0gZmxvb3IocC55KTsKCQoJZmxvYXQgdSA9IHAueCAtIGk7CglmbG9hdCB2ID0gcC55IC0gajsKCQoJdmVjMiBnMDAgPSBub2lzZSh2ZWMyKGkgICAgLCBqICAgICkpOwoJdmVjMiBnMDEgPSBub2lzZSh2ZWMyKGkgICAgLCBqKzEuMCkpOwoJdmVjMiBnMTAgPSBub2lzZSh2ZWMyKGkrMS4wLCBqICAgICkpOwoJdmVjMiBnMTEgPSBub2lzZSh2ZWMyKGkrMS4wLCBqKzEuMCkpOwoJCglmbG9hdCBxMDAgPSBnMDAueCoodSAgICApICsgZzAwLnkqKHYgICAgKTsKCWZsb2F0IHEwMSA9IGcwMS54Kih1ICAgICkgKyBnMDEueSoodi0xLjApOwoJZmxvYXQgcTEwID0gZzEwLngqKHUtMS4wKSArIGcxMC55Kih2ICAgICk7CglmbG9hdCBxMTEgPSBnMTEueCoodS0xLjApICsgZzExLnkqKHYtMS4wKTsKCQoJZmxvYXQgcXgwID0gcTAwKigxLjAtZih1KSkgKyBxMTAqZih1KTsKCWZsb2F0IHF4MSA9IHEwMSooMS4wLWYodSkpICsgcTExKmYodSk7CglmbG9hdCBxeHkgPSBxeDAqKDEuMC1mKHYpKSArIHF4MSpmKHYpOwoKCXJldHVybiBxeHkrMC41Owp9Cgp2b2lkIG1haW4oKQp7Cgl2ZWMzIGNvbCA9IHZlYzMocGVybGluKGdsX0ZyYWdDb29yZC54eS9VLWlHbG9iYWxUaW1lKjUuMCkpOwoJZ2xfRnJhZ0NvbG9yID0gdmVjNChjb2wsMS4wKTsKfQ==","2D Fractals":"I2RlZmluZSBOIDEwMC4wIC8vIEl0ZXJhdGlvbnMKI2RlZmluZSBaICAgMi4wIC8vIFpvb20KI2RlZmluZSBNIGZhbHNlIC8vIE1hbmRlbGJyb3QKCnZvaWQgbWFpbigpCnsKCXZlYzMgZCA9IHZlYzMoMSk7IHZlYzIgYyA9IHZlYzIoLTAuNzksMC4yKTsKCXZlYzIgeiA9ICgyLjAgKiBnbF9GcmFnQ29vcmQueHkgLSBpUmVzb2x1dGlvbi54eSkgLyBpUmVzb2x1dGlvbi54eCAqIFo7CglpZiAoTSkgeyBjID0gejsgeiA9IHZlYzIoMCk7IH0KCglmb3IoZmxvYXQgaT0wLjA7aTxOO2krPTEuMCkKCXsKCQl6ID0gdmVjMih6Lngqei54LXoueSp6LnksMi4wKnoueCp6LnkpK2M7CgkJaWYgKGxlbmd0aCh6KT4yLjApIHsgZCA9IHZlYzMoaS9OKTsgYnJlYWs7IH0KCX0KCQoJZ2xfRnJhZ0NvbG9yID0gdmVjNCgzLjAqZCp2ZWMzKGdsX0ZyYWdDb29yZC54eS9pUmVzb2x1dGlvbi54eSwxKSt2ZWMzKDAuMDcpLDEuMCk7Cn0=","3D Raymarching":"I2RlZmluZSBTVEVQUyAxNgojZGVmaW5lIFBSRUNJU0lPTiAwLjAwMQojZGVmaW5lIERFUFRIIDUuMAoKdmVjMyBleWUgPSB2ZWMzKDAsMC41LC0xKTsKdmVjMyBsaWdodCA9IHZlYzMoMCwxLC0xKTsKCmZsb2F0IGJveCwgZ3JvdW5kOwpmbG9hdCB0ID0gaUdsb2JhbFRpbWU7CgpmbG9hdCB1ZEJveCh2ZWMzIHAsdmVjMyBiLGZsb2F0IHIpe3JldHVybiBsZW5ndGgobWF4KGFicyhwKS1iLDAuMCkpLXI7fQptYXQzIHJvdFkoZmxvYXQgYSl7ZmxvYXQgcz1zaW4oYSk7ZmxvYXQgYz1jb3MoYSk7cmV0dXJuIG1hdDMoYywwLC1zLDAsMSwwLHMsMCxjKTt9CgpmbG9hdCBzY2VuZSh2ZWMzIHApCnsJCglncm91bmQgPSBwLnkrMC41OwoJYm94ID0gdWRCb3gocCpyb3RZKHAueSo1LjApKnJvdFkodCksdmVjMygwLjEsMC4yLDAuMSksMC4wMyk7CgkKCWZsb2F0IGQgPSAxZTEwOwoJCglkID0gbWluKGQsIGdyb3VuZCk7CglkID0gbWluKGQsIGJveCk7CgkKCXJldHVybiBkOwp9Cgp2ZWMzIGdldE5vcm1hbCh2ZWMzIHApCnsKCXZlYzIgZSA9IHZlYzIoUFJFQ0lTSU9OLDApOwoJdmVjMyBuID0gbm9ybWFsaXplKHZlYzMoCgkJc2NlbmUocCtlLnh5eSkgLSBzY2VuZShwLWUueHl5KSwKCQlzY2VuZShwK2UueXh5KSAtIHNjZW5lKHAtZS55eHkpLAoJCXNjZW5lKHArZS55eXgpIC0gc2NlbmUocC1lLnl5eCkKCSkpOwoJCglyZXR1cm4gbjsKfQoKdmVjMyBwcm9jZXNzQ29sb3IodmVjMyBwKQp7CglmbG9hdCBkID0gMWUxMDsKCQoJdmVjMyBuID0gZ2V0Tm9ybWFsKHApOwoJdmVjMyBsID0gbm9ybWFsaXplKGxpZ2h0LXApOwoJdmVjMyBjb2w7CgkKCWZsb2F0IGRpc3QgPSBsZW5ndGgobGlnaHQtcCk7CglmbG9hdCBkaWZmID0gbWF4KGRvdChuLGwpLDAuMCk7CglmbG9hdCBzcGVjID0gcG93KGRpZmYsMTAwLjApOwoJCglpZiAoZ3JvdW5kPGQpe2NvbD12ZWMzKGRpZmYqMC41KTtkPWdyb3VuZDt9CglpZiAoYm94PGQpe2NvbD1uK2RpZmYrc3BlYzt9CgkKCWNvbCAqPSBtaW4oMS4wLDEuMC9kaXN0KTsKCQoJcmV0dXJuIGNvbDsKfQoKdmVjMyBsb29rQXQodmVjMyBvLCB2ZWMzIHQpCnsKCXZlYzIgdXYgPSAoMi4wICogZ2xfRnJhZ0Nvb3JkLnh5IC0gaVJlc29sdXRpb24ueHkpIC8gaVJlc29sdXRpb24ueHg7Cgl2ZWMzIGRpciA9IG5vcm1hbGl6ZSh0LW8pLCB1cCA9IHZlYzMoMCwxLDApLCByaWdodCA9IGNyb3NzKHVwLGRpcik7Cgl1cCA9IGNyb3NzKGRpcixyaWdodCk7CgkKCXJldHVybiBub3JtYWxpemUocmlnaHQqdXYueCArIHVwKnV2LnkgKyBkaXIpOwp9Cgp2ZWMzIG1hcmNoKHZlYzMgcm8sIHZlYzMgcmQpCnsKCXZlYzMgcDsgZmxvYXQgdD0wLjAsIGQ7CgkKCWZvciAoaW50IGk9MDtpPFNURVBTO2krKykKCXsKCQlkPXNjZW5lKHJvK3JkKnQpOwoJCWlmKGQ8UFJFQ0lTSU9OfHx0PkRFUFRIKXticmVhazt9CgkJdCs9ZDsKCX0KCQoJcmV0dXJuKHJvK3JkKnQpOwp9Cgp2b2lkIG1haW4oKQp7CQoJdmVjMyBwID0gbWFyY2goZXllLGxvb2tBdChleWUsdmVjMygwKSkpOwoJdmVjMyBjb2wgPSBwcm9jZXNzQ29sb3IocCk7CgoJZ2xfRnJhZ0NvbG9yID0gdmVjNChjb2wsMS4wKTsKfQ==","3D Hypercube":"I2RlZmluZSBTVEVQUyAzMgojZGVmaW5lIFBSRUNJU0lPTiAwLjAxCiNkZWZpbmUgREVQVEggMTAuMAoKdmVjMyBleWUgPSB2ZWMzKDAsMCwtMi41KTsKdmVjMiB1djsgYm9vbCBoaXQgPSBmYWxzZTsKCmZsb2F0IGxpbmVzLCBsaW5lV2lkdGggPSAwLjAyNTsKZmxvYXQgdCA9IG1vZChpR2xvYmFsVGltZSwxLjApOwpmbG9hdCBzID0gKHNpbihpR2xvYmFsVGltZSowLjUpKzEuMCkvMi4wKjAuMTUrMC4xNTsKCQkKLy8gaXEncyBtYWdpYyBkaXN0YW5jZSBmdW5jdGlvbgpmbG9hdCBsaW5lKHZlYzMgcCx2ZWMzIGEsdmVjMyBiKXt2ZWMzIHBhPXAtYSxiYT1iLWE7ZmxvYXQgaD1jbGFtcChkb3QocGEsYmEpL2RvdChiYSxiYSksMC4wLDEuMCk7cmV0dXJuIGxlbmd0aChwYS1iYSpoKS1saW5lV2lkdGg7fQoKLy8gUm90YXRpb24KbWF0MyByb3RaKGZsb2F0IGEpe2Zsb2F0IHM9c2luKGEpO2Zsb2F0IGM9Y29zKGEpO3JldHVybiBtYXQzKGMsLXMsMCxzLGMsMCwwLDAsMSk7fQptYXQzIHJvdFgoZmxvYXQgYSl7ZmxvYXQgcz1zaW4oYSk7ZmxvYXQgYz1jb3MoYSk7cmV0dXJuIG1hdDMoMSwwLDAsMCxjLHMsMCwtcyxjKTt9Cm1hdDMgcm90WShmbG9hdCBhKXtmbG9hdCBzPXNpbihhKTtmbG9hdCBjPWNvcyhhKTtyZXR1cm4gbWF0MyhjLDAsLXMsMCwxLDAscywwLGMpO30KCi8vIE1hcmNoaW5nCmZsb2F0IHNjZW5lKHZlYzMpOwp2ZWMzIGdldE5vcm1hbCh2ZWMzIHApe3ZlYzIgZT12ZWMyKFBSRUNJU0lPTiwwKTtyZXR1cm4obm9ybWFsaXplKHZlYzMoc2NlbmUocCtlLnh5eSktc2NlbmUocC1lLnh5eSksc2NlbmUocCtlLnl4eSktc2NlbmUocC1lLnl4eSksc2NlbmUocCtlLnl5eCktc2NlbmUocC1lLnl5eCkpKSk7fQp2ZWMzIG1hcmNoKHZlYzMgcm8sdmVjMyByZCl7ZmxvYXQgdD0wLjAsZDtoaXQ9ZmFsc2U7Zm9yKGludCBpPTA7aTxTVEVQUztpKyspe2Q9c2NlbmUocm8rcmQqdCk7aWYoZDxQUkVDSVNJT04pe2hpdD10cnVlO2JyZWFrO31pZih0PkRFUFRIKXticmVhazt9dCs9ZDt9cmV0dXJuKHJvK3JkKnQpO30KdmVjMyBsb29rQXQodmVjMyBvLHZlYzMgdCl7dmVjMiB1dj0oMi4wKmdsX0ZyYWdDb29yZC54eS1pUmVzb2x1dGlvbi54eSkvaVJlc29sdXRpb24ueHg7dmVjMyBkPW5vcm1hbGl6ZSh0LW8pLHU9dmVjMygwLDEsMCkscj1jcm9zcyh1LGQpO3JldHVybihub3JtYWxpemUocip1di54K2Nyb3NzKGQscikqdXYueStkKSk7fQoKLy8gVmVydGljZXMKY29uc3QgdmVjMyBsYmYgPSB2ZWMzKC0wLjUsLTAuNSwtMC41KTsKY29uc3QgdmVjMyByYmYgPSB2ZWMzKCAwLjUsLTAuNSwtMC41KTsKY29uc3QgdmVjMyBsYmIgPSB2ZWMzKC0wLjUsLTAuNSwgMC41KTsKY29uc3QgdmVjMyByYmIgPSB2ZWMzKCAwLjUsLTAuNSwgMC41KTsKCmNvbnN0IHZlYzMgbHRmID0gdmVjMygtMC41LCAwLjUsLTAuNSk7CmNvbnN0IHZlYzMgcnRmID0gdmVjMyggMC41LCAwLjUsLTAuNSk7CmNvbnN0IHZlYzMgbHRiID0gdmVjMygtMC41LCAwLjUsIDAuNSk7CmNvbnN0IHZlYzMgcnRiID0gdmVjMyggMC41LCAwLjUsIDAuNSk7Cgp2ZWMzIGxiZmkgPSB2ZWMzKC0wLjUrcywtMC41K3MsLTAuNStzKTsKdmVjMyByYmZpID0gdmVjMyggMC41LXMsLTAuNStzLC0wLjUrcyk7CnZlYzMgbGJiaSA9IHZlYzMoLTAuNStzLC0wLjUrcywgMC41LXMpOwp2ZWMzIHJiYmkgPSB2ZWMzKCAwLjUtcywtMC41K3MsIDAuNS1zKTsKCnZlYzMgbHRmaSA9IHZlYzMoLTAuNStzLCAwLjUtcywtMC41K3MpOwp2ZWMzIHJ0ZmkgPSB2ZWMzKCAwLjUtcywgMC41LXMsLTAuNStzKTsKdmVjMyBsdGJpID0gdmVjMygtMC41K3MsIDAuNS1zLCAwLjUtcyk7CnZlYzMgcnRiaSA9IHZlYzMoIDAuNS1zLCAwLjUtcywgMC41LXMpOwoKdmVjMyBsYmZfbGJmaSA9IG1peChsYmYsbGJmaSx0KTsKdmVjMyBsdGZfbHRmaSA9IG1peChsdGYsbHRmaSx0KTsKdmVjMyBsYmJfbGJiaSA9IG1peChsYmIsbGJiaSx0KTsKdmVjMyBsdGJfbHRiaSA9IG1peChsdGIsbHRiaSx0KTsKCnZlYzMgcmJiX2xiYiA9IG1peChyYmIsbGJiLHQpOwp2ZWMzIHJiZl9sYmYgPSBtaXgocmJmLGxiZix0KTsKdmVjMyBydGZfbHRmID0gbWl4KHJ0ZixsdGYsdCk7CnZlYzMgcnRiX2x0YiA9IG1peChydGIsbHRiLHQpOwoKdmVjMyBsYmZpX3JiZmkgPSBtaXgobGJmaSxyYmZpLHQpOwp2ZWMzIGxiYmlfcmJiaSA9IG1peChsYmJpLHJiYmksdCk7CnZlYzMgbHRmaV9ydGZpID0gbWl4KGx0ZmkscnRmaSx0KTsKdmVjMyBsdGJpX3J0YmkgPSBtaXgobHRiaSxydGJpLHQpOwoKdmVjMyByYmJpX3JiYiA9IG1peChyYmJpLHJiYix0KTsKdmVjMyByYmZpX3JiZiA9IG1peChyYmZpLHJiZix0KTsKdmVjMyBydGZpX3J0ZiA9IG1peChydGZpLHJ0Zix0KTsKdmVjMyBydGJpX3J0YiA9IG1peChydGJpLHJ0Yix0KTsKCmZsb2F0IHNjZW5lKHZlYzMgcCkKewoJcCAqPSByb3RYKDAuNzg1KTsgbGluZXMgPSAxZTEwOwoKCS8vIG91dHNpZGUKCWxpbmVzID0gbWluKGxpbmVzLGxpbmUocCxsYmZfbGJmaSxyYmZfbGJmKSk7CglsaW5lcyA9IG1pbihsaW5lcyxsaW5lKHAsbGJiX2xiYmkscmJiX2xiYikpOwoJbGluZXMgPSBtaW4obGluZXMsbGluZShwLGx0Zl9sdGZpLHJ0Zl9sdGYpKTsKCWxpbmVzID0gbWluKGxpbmVzLGxpbmUocCxsdGJfbHRiaSxydGJfbHRiKSk7CgoJbGluZXMgPSBtaW4obGluZXMsbGluZShwLGxiZl9sYmZpLGxiYl9sYmJpKSk7CglsaW5lcyA9IG1pbihsaW5lcyxsaW5lKHAsbHRmX2x0ZmksbHRiX2x0YmkpKTsKCWxpbmVzID0gbWluKGxpbmVzLGxpbmUocCxsYmZfbGJmaSxsdGZfbHRmaSkpOwoJbGluZXMgPSBtaW4obGluZXMsbGluZShwLGxiYl9sYmJpLGx0Yl9sdGJpKSk7CgoJbGluZXMgPSBtaW4obGluZXMsbGluZShwLHJiZl9sYmYscmJiX2xiYikpOwoJbGluZXMgPSBtaW4obGluZXMsbGluZShwLHJ0Zl9sdGYscnRiX2x0YikpOwoJbGluZXMgPSBtaW4obGluZXMsbGluZShwLHJiZl9sYmYscnRmX2x0ZikpOwoJbGluZXMgPSBtaW4obGluZXMsbGluZShwLHJiYl9sYmIscnRiX2x0YikpOwoKICAgIC8vIGluc2lkZQoJbGluZXMgPSBtaW4obGluZXMsbGluZShwLGxiZmlfcmJmaSxsYmJpX3JiYmkpKTsKCWxpbmVzID0gbWluKGxpbmVzLGxpbmUocCxsdGZpX3J0ZmksbHRiaV9ydGJpKSk7CglsaW5lcyA9IG1pbihsaW5lcyxsaW5lKHAsbGJmaV9yYmZpLGx0ZmlfcnRmaSkpOwoJbGluZXMgPSBtaW4obGluZXMsbGluZShwLGxiYmlfcmJiaSxsdGJpX3J0YmkpKTsKCglsaW5lcyA9IG1pbihsaW5lcyxsaW5lKHAsbGJiaV9yYmJpLHJiYmlfcmJiKSk7CglsaW5lcyA9IG1pbihsaW5lcyxsaW5lKHAsbGJmaV9yYmZpLHJiZmlfcmJmKSk7CglsaW5lcyA9IG1pbihsaW5lcyxsaW5lKHAsbHRmaV9ydGZpLHJ0ZmlfcnRmKSk7CglsaW5lcyA9IG1pbihsaW5lcyxsaW5lKHAsbHRiaV9ydGJpLHJ0YmlfcnRiKSk7CgoJbGluZXMgPSBtaW4obGluZXMsbGluZShwLHJiZmlfcmJmLHJ0ZmlfcnRmKSk7CglsaW5lcyA9IG1pbihsaW5lcyxsaW5lKHAscmJiaV9yYmIscnRiaV9ydGIpKTsKCWxpbmVzID0gbWluKGxpbmVzLGxpbmUocCxyYmZpX3JiZixyYmJpX3JiYikpOwoJbGluZXMgPSBtaW4obGluZXMsbGluZShwLHJ0ZmlfcnRmLHJ0YmlfcnRiKSk7CgogICAgLy8gY29ubmVjdGlvbnMKCWxpbmVzID0gbWluKGxpbmVzLGxpbmUocCxydGJpX3J0YixydGJfbHRiKSk7CglsaW5lcyA9IG1pbihsaW5lcyxsaW5lKHAscmJmaV9yYmYscmJmX2xiZikpOwoJbGluZXMgPSBtaW4obGluZXMsbGluZShwLHJiYmlfcmJiLHJiYl9sYmIpKTsKCWxpbmVzID0gbWluKGxpbmVzLGxpbmUocCxydGZpX3J0ZixydGZfbHRmKSk7CgkKCWxpbmVzID0gbWluKGxpbmVzLGxpbmUocCxsdGZpX3J0ZmksbHRmX2x0ZmkpKTsKCWxpbmVzID0gbWluKGxpbmVzLGxpbmUocCxsdGJpX3J0YmksbHRiX2x0YmkpKTsKCWxpbmVzID0gbWluKGxpbmVzLGxpbmUocCxsYmZpX3JiZmksbGJmX2xiZmkpKTsKCWxpbmVzID0gbWluKGxpbmVzLGxpbmUocCxsYmJpX3JiYmksbGJiX2xiYmkpKTsKCQoJcmV0dXJuIGxpbmVzOwp9Cgp2ZWMzIHByb2Nlc3NDb2xvcih2ZWMzIHApCnsJCgl2ZWMzIG4gPSBnZXROb3JtYWwocCk7Cgl2ZWMzIGwgPSBub3JtYWxpemUoZXllLXApOwoJCglmbG9hdCBkID0gMWUxMDsKCWZsb2F0IGRpZmYgPSBtYXgoZG90KG4sbCksMC4wKTsKCWZsb2F0IHNwZWMgPSBwb3coZGlmZiwxLjApOwoKCXJldHVybiB2ZWMzKDEwMCwwLDEwKSpkaWZmKm1heCgwLjUtc3BlYywwLjAxKTsKfQoKdm9pZCBtYWluKCkKewkKCWV5ZSAqPSByb3RYKGlHbG9iYWxUaW1lKSpyb3RaKGlHbG9iYWxUaW1lKTsKCXV2ID0gKDIuMCAqIGdsX0ZyYWdDb29yZC54eSAtIGlSZXNvbHV0aW9uLnh5KSAvIGlSZXNvbHV0aW9uLnh4OwoJCgl2ZWMzIHAgPSBtYXJjaChleWUsbG9va0F0KGV5ZSx2ZWMzKDApKSk7Cgl2ZWMzIGNvbCA9IHByb2Nlc3NDb2xvcihwKTsKCQoJaWYgKGhpdCA9PSBmYWxzZSkgeyBjb2wgPSB2ZWMzKDEuMC1sZW5ndGgodXYpKnZlYzMoMS4yLDEuMiwxKSowLjUpOyB9CgoJZ2xfRnJhZ0NvbG9yID0gdmVjNChjb2wsMS4wKTsKfQ=="},g=$(".shader canvas"),h=$(".shader td:first-child"),i=$(".shader .code-view"),j=($("#shader-editor"),$(".shader .play-pause")),k=$(".shader .reset"),l=$(".shader .run"),m=$(".shader .time"),n=$(".shader .fps"),o=$(".shader .examples"),p=$(".shader .fullscreen"),q=a.Shader={time:0,pause:!1,frameNumber:0,playTime:0,pauseTime:0,fpsStartTime:0,getContext:function(a){var b=null,c=["webgl","experimental-webgl","webkit-3d","moz-webgl"],d={alpha:!1,depth:!1,antialias:!1,stencil:!1,premultipliedAlpha:!1,preserveDrawingBuffer:!1};return c.some(function(c){try{b=a.getContext(c,d)}catch(e){}return b?!0:void 0}),b},init:function(a){c=q.getContext(g),q.example=f[a]?a:"Choose Example",o.value=q.example,q.setupEditor(),q.gl=c,q.pause=!0,q.compile(),q.setupCanvas(),l.addEventListener("click",q.compile,!1),j.addEventListener("click",q.togglePlayback,!1),k.addEventListener("click",q.reset,!1),p.addEventListener("click",q.toggleFullscreen,!1),o.addEventListener("change",q.loadExample,!1),b.addEventListener("resize",q.setupCanvas,!1)},compile:function(f){b.cancelAnimationFrame(q.animationRequest),i.className=i.className.replace("error","");var g=q.Editor.getValue();b.cancelAnimationFrame(q.animationRequest);var h=c.createShader(c.VERTEX_SHADER),j=c.createShader(c.FRAGMENT_SHADER),k=c.createProgram();c.shaderSource(h,d),c.shaderSource(j,e+g),c.compileShader(h),c.compileShader(j),c.attachShader(k,h),c.attachShader(k,j),c.linkProgram(k),c.useProgram(k),c.deleteShader(h),c.deleteShader(j),c.deleteProgram(k),q.bfr=c.createBuffer(),q.aPos=c.getAttribLocation(k,"aPos"),q.iGlobalTime=c.getUniformLocation(k,"iGlobalTime"),q.iResolution=c.getUniformLocation(k,"iResolution"),q.iDSP=c.getUniformLocation(k,"iDSP"),q.iSync=c.getUniformLocation(k,"iSync"),c.bindBuffer(c.ARRAY_BUFFER,q.bfr),c.bufferData(c.ARRAY_BUFFER,new Float32Array([-1,-1,1,-1,-1,1,1,-1,1,1,-1,1]),c.STATIC_DRAW),c.enableVertexAttribArray(q.bfr),c.bindTexture(c.TEXTURE_2D,q.frequencyTexture=c.createTexture()),c.texParameteri(c.TEXTURE_2D,c.TEXTURE_MAG_FILTER,c.LINEAR),c.texParameteri(c.TEXTURE_2D,c.TEXTURE_MIN_FILTER,c.LINEAR),c.texParameteri(c.TEXTURE_2D,c.TEXTURE_WRAP_S,c.CLAMP_TO_EDGE),c.texParameteri(c.TEXTURE_2D,c.TEXTURE_WRAP_T,c.CLAMP_TO_EDGE),c.texImage2D(c.TEXTURE_2D,0,c.LUMINANCE,512,2,0,c.LUMINANCE,c.UNSIGNED_BYTE,null),c.uniform2f(q.iResolution,c.canvas.width,c.canvas.height),c.viewport(0,0,c.canvas.width,c.canvas.height),f&&(b.location.hash=btoa(g)+";"+btoa(a.DSP.Editor.getValue()));var l=c.getError();l&&l!=c.INVALID_VALUE?q.error():q.render()},setupEditor:function(){q.Editor=ace.edit("shader-editor"),q.Editor.setTheme("ace/theme/monokai"),q.Editor.getSession().setMode("ace/mode/glsl"),q.Editor.setShowPrintMargin(!1),q.Editor.commands.addCommand({name:"compile",bindKey:{win:"Ctrl-Enter",mac:"Command-Enter"},exec:q.compile}),q.Editor.setValue(!a.base64[0]||$_GET.shaderExample?atob(f[q.example]):atob(a.base64[0])),q.Editor.gotoLine(0)},setupCanvas:function(){c.canvas.width=q.isFullscreen?b.innerWidth:h.offsetWidth,c.canvas.height=q.isFullscreen?b.innerHeight:h.offsetHeight,c.uniform2f(q.iResolution,c.canvas.width,c.canvas.height),c.viewport(0,0,c.canvas.width,c.canvas.height),q.render()},render:function(){q.animationRequest=!q.pause&&b.requestAnimationFrame(q.render),q.time=((new Date).getTime()-q.playTime)/1e3,c.uniform1f(q.iGlobalTime,q.time),c.vertexAttribPointer(q.aPos,2,c.FLOAT,!1,0,0),c.drawArrays(c.TRIANGLES,0,6),q.fps=q.getFPS()},getFPS:function(){var a=((new Date).getTime()-q.fpsStartTime)/1e3;return a>1&&(q.fpsStartTime=(new Date).getTime(),q.frameNumber=0),Math.min(Math.floor(++q.frameNumber/a),60)},togglePlayback:function(a){q.pause="boolean"==typeof a?!a:!q.pause,q.pause?(q.pauseTime=(new Date).getTime(),b.clearInterval(q.updateTimer)):(q.playTime+=(new Date).getTime()-q.pauseTime,q.updateTimer=b.setInterval(q.updateInfo,100),q.render()),j.setAttribute("data-status",q.pause?"0":"1"),j.style.backgroundPosition=q.pause?"0px 0px":"-20px 0px"},reset:function(){m.innerHTML="0.00",q.playTime=q.pause?q.pauseTime=0:(new Date).getTime()},error:function(){i.className+=" error"},updateInfo:function(){m.innerHTML=q.time.toFixed(2),n.innerHTML=(q.fps<9?"0"+q.fps:q.fps)+" FPS"},toggleFullscreen:function(){q.isFullscreen=document.fullscreen||document.mozFullScreen||document.webkitIsFullScreen,q.isFullscreen||(g.requestFullscreen?g.requestFullscreen():g.mozRequestFullScreen?g.mozRequestFullScreen():g.webkitRequestFullscreen&&g.webkitRequestFullscreen()),q.toggleFullscreen.listening||(q.toggleFullscreen.listening=!0,g.addEventListener("fullscreenchange",q.toggleFullscreen,!1),g.addEventListener("mozfullscreenchange",q.toggleFullscreen,!1),g.addEventListener("webkitfullscreenchange",q.toggleFullscreen,!1)),g.style.borderRadius=q.isFullscreen?"0px":"5px"},loadExample:function(a){var b="string"==typeof a?a:o.value;f[b]||(b="Choose Example"),q.Editor.setValue(atob(f[b])),q.Editor.gotoLine(0),q.togglePlayback(!1),q.playTime=q.pauseTime=0,m.innerHTML="0.00",q.compile()}}}(window.Demo||(window.Demo={}),window),function(a,b){"use strict";navigator.getUserMedia=navigator.getUserMedia||navigator.webkitGetUserMedia||navigator.mozGetUserMedia,b.AudioContext=b.AudioContext||b.webkitAudioContext||b.mozAudioContext,b.f=function(){};var c,d,e,g,h,i=["Math","r"].concat(Object.getOwnPropertyNames(Math)),j={"Choose Example":"LyoqCiAqIERTUCAoSmF2YVNjcmlwdCkKICogCiAqIGZ1bmN0aW9uIGYgLy8gc2FtcGxlIGZ1bmN0aW9uIChjYWxsZWQgYXV0b21hdGljbHkpCiAqIGludCAgICAgIHQgLy8gY3VycmVudCBzYW1wbGUgcGFzc2VkIHRvIGYoKQogKiBpbnQgICAgICByIC8vIHNhbXBsZSByYXRlIGluIEhlcnR6CiAqLwoKZnVuY3Rpb24gZih0KSB7IHJldHVybiBNYXRoLnNpbigyICogTWF0aC5QSSAqIDQ0MCAqIHQpOyB9",Chiptune:"dmFyIGJlYXQgICA9IDEvNDsKdmFyIHN0ZXAgICA9IDEvci9iZWF0Owp2YXIgbm90ZXMgID0gIkNjRGRFRmZHZ0FhSCIuc3BsaXQoIiIpOwoKdmFyIG1lbG9keSA9ICJBREZBREZBQy1HRkdBRENFRCIuc3BsaXQoIiIpOwp2YXIgYmVhdCAgID0gWzIsOCwxLDJdOwoKdmFyIGIgPSBiZWF0WzBdLCB0dCA9IGJlYXQuaSA9IG1lbG9keS5pID0gMCwgbjsKCmZ1bmN0aW9uIGYodCkgewogICAgaWYgKHQ8MC4wMSkgeyB0dCA9IDA7IGJlYXQuaSA9IDA7IG1lbG9keS5pID0gMDsgfQogICAgdHQgKz0gc3RlcDsKICAgIAogICAgbiA9IHRvbmUobm90ZXMuaW5kZXhPZihtZWxvZHlbbWVsb2R5LmklbWVsb2R5Lmxlbmd0aF0pLGIpOwogICAgYiA9IGJlYXRbYmVhdC5pJWJlYXQubGVuZ3RoXTsKICAgIAogICAgaWYgKHR0PjEvYikgeyB0dCA9IDA7IGJlYXQuaSsrOyBtZWxvZHkuaSsrOyAgfQoJcmV0dXJuICFuPzA6c3F1YXJlV2F2ZSgwLjIqbip0LDEwKSowLjM7Cn0KCmZ1bmN0aW9uIHNxdWFyZVdhdmUoeCxrKSB7Zm9yKHZhciBpPTEsbj0wO2k8aztpKyspe24rPU1hdGguc2luKDIqTWF0aC5QSSooMippLTEpKngpLygyKmktMSl9cmV0dXJuIDQvTWF0aC5QSSpufQpmdW5jdGlvbiB0b25lKG4sb2N0YXZlKSB7IHJldHVybiBuPT0tMT8wOk1hdGgucG93KE1hdGgucG93KDIsMS8xMiksbikgKiA0NDAgKiBvY3RhdmU7IH0="},k=2048,l=800,m=5,n="#0F9",o=0,p=null,q=null,r=b.localStorage.getItem("warned"),s=$(".dsp canvas").getContext("2d"),t=(document.createElement,new b.AudioContext),u=t.createAnalyser();u.fftSize=1024;var v=new Uint8Array(u.frequencyBinCount),w=t.createScriptProcessor(k,2,2),x=t.createGain();x.gain.value=b.localStorage.getItem("gain")||.02;var y=$("#dsp-editor"),z=$("#gain"),A=$(".dsp td:first-child"),B=$(".dsp .code-view"),C=$(".dsp .play-pause"),D=$(".dsp .reset"),E=$(".dsp .run"),F=$(".dsp .time"),G=$(".dsp .mic"),H=$(".dsp .examples");z.value=x.gain.value;var I=a.DSP={time:0,playing:!1,diagram:"wave",init:function(a){I.example=j[a]?a:"Choose Example",H.value=I.example,I.setupEditor(),p=t.sampleRate,q=k/(p*k),I.parseCode(),I.setupCanvas(),w.onaudioprocess=I.process,w.connect(x),x.connect(u),E.addEventListener("click",I.parseCode,!1),C.addEventListener("click",I.togglePlayback,!1),D.addEventListener("click",I.reset,!1),G.addEventListener("click",I.toggleMic,!1),z.addEventListener("change",I.changeGain,!1),H.addEventListener("change",I.loadExample,!1),b.addEventListener("resize",I.setupCanvas,!1),$(".diagram-controls span").on("click",I.selectDiagram)},setupEditor:function(){I.Editor=ace.edit("dsp-editor"),I.Editor.setTheme("ace/theme/monokai"),I.Editor.getSession().setMode("ace/mode/javascript"),I.Editor.setShowPrintMargin(!1),I.Editor.commands.addCommand({name:"compile",bindKey:{win:"Ctrl-Enter",mac:"Command-Enter"},exec:I.parseCode}),I.Editor.setValue(!a.base64[1]||$_GET.dspExample?atob(j[I.example]):atob(a.base64[1])),I.Editor.gotoLine(0)},setupCanvas:function(){c=s.canvas.width=A.offsetWidth,e=c>>1,d=s.canvas.height=A.offsetHeight,g=d>>1,s.fillStyle="#111",s.strokeStyle=n,s.lineWidth=m,I.previewDiagram()},parseCode:function(c){b.onerror=I.error;var d=I.Editor.getValue();B.className=B.className.replace("error","");var e=$("#dsp-script");e&&e.remove(),e=document.createElement("script"),e.id="dsp-script",e.innerHTML="try{window.f=function(r){"+I.XSSPreventer()+d+"\n;return f}("+p+")}catch(e){DSP.error(e)}",c&&(b.location.hash=btoa(a.Shader.Editor.getValue())+";"+btoa(d)),document.body.appendChild(e),b.setTimeout(function(){b.onerror=null},100)},process:function(b){if(I.playing){var c,d,e,g,h=b.outputBuffer.getChannelData(0),i=b.outputBuffer.getChannelData(1);if(I.micStream)for(c=b.inputBuffer.getChannelData(0),d=b.inputBuffer.getChannelData(1),e=0,g=h.length;g>e;e++)h[e]=i[e]=0;else for(e=0,g=h.length;g>e;e++)h[e]=i[e]=f(I.time+=q);a.Shader.gl.uniform1f(a.Shader.iSync,I.time),"wave"==I.diagram?I.displayWave():"spectrum"==I.diagram?I.displaySpectrum():"spectrogram"==I.diagram&&I.displaySpectrogram(),I.previewingDiagram&&I.previewDiagram(!0),I.updateDataTexture()}},previewDiagram:function(a){return a===!0?(I.playState||u.disconnect(),I.playing=I.playState,delete I.previewingDiagram,void(x.gain.value=I.gainVal)):void(I.previewingDiagram||(I.playState=I.playing,I.playing=!0,I.previewingDiagram=!0,I.gainVal=x.gain.value,x.gain.value=0,u.connect(t.destination)))},selectDiagram:function(a){I.diagram=a.target.getAttribute("data-type"),a.target.parentElement.children.addClass("disabled"),a.target.removeClass("disabled"),"spectrogram"==I.diagram&&(o=0,s.fillStyle="#111",s.fillRect(0,0,c,d))},displayWave:function(){u.getByteTimeDomainData(v);var a,b,e,f=v.length;for(s.fillStyle="#111",s.fillRect(0,0,c,d),s.fillStyle="#222",s.fillRect(0,g,c,2),s.beginPath(),a=0;f>a;a++)b=a/f*c,e=g-v[a]/255*l+l/2,0===a&&s.moveTo(b,e),s.lineTo(b,e);s.stroke()},displaySpectrum:function(){u.getByteFrequencyData(v);var a,b=v.length,e=c/b;for(s.fillStyle="#111",s.fillRect(0,0,c,d),s.fillStyle=n,s.beginPath(),a=0;b>a;a++)s.rect(a*e,d-40,2*e,-v[a]);s.fill()},displaySpectrogram:function(){u.getByteFrequencyData(v);var a,b=v.length,e=d/b;for(a=0;b>a;a++)s.fillStyle="#111",s.fillRect(o%c,d-e*a*.95-40,1,1),s.fillStyle="rgba(0,255,153,"+v[a]/255+")",s.fillRect(o%c,d-e*a*.95-40,1,1);o++},updateDataTexture:function(){u.getByteFrequencyData(v),a.Shader.gl.texSubImage2D(a.Shader.gl.TEXTURE_2D,0,0,0,512,1,a.Shader.gl.LUMINANCE,a.Shader.gl.UNSIGNED_BYTE,v),u.getByteTimeDomainData(v),a.Shader.gl.texSubImage2D(a.Shader.gl.TEXTURE_2D,0,0,1,512,1,a.Shader.gl.LUMINANCE,a.Shader.gl.UNSIGNED_BYTE,v)},toggleMic:function(){var a=-1==G.className.indexOf("disabled");a?(I.micStream.stop(),I.micStream=!1,u.connect(t.destination),G.className+=" disabled",y.className=y.className.replace("disabled","")):navigator.getUserMedia({audio:!0},function(a){I.micStream=a,a=t.createMediaStreamSource(a),a.connect(w),a.connect(x),u.disconnect(),G.className=G.className.replace("disabled",""),y.className+=" disabled"},function(){alert("Access denied")})},XSSPreventer:function(){var a,c=[];for(a in b)-1==i.indexOf(a)&&c.push(a);return c.length?"var "+c.join(",")+";":""},togglePlayback:function(a){if(!r){if(!confirm("The playback volume currently varies greatly from system to system. Please turn your speakers down before continuing."))return;r=!0,b.localStorage.setItem("warned","true")}I.playing="object"==typeof a?!I.playing:a,I.playing?(h=b.setInterval(I.updateInfo,100),u.connect(t.destination)):(b.clearInterval(h),u.disconnect()),C.setAttribute("data-status",I.playing?"1":"0"),C.style.backgroundPosition=I.playing?"-20px 0px":"0px 0px"},reset:function(){F.innerHTML="0.00",I.time=0},error:function(){B.className+=" error"},updateInfo:function(){F.innerHTML=(I.time*(1/q)/p).toFixed(2)},changeGain:function(a){var c=a.target.value;x.gain.value=c,b.localStorage.setItem("gain",c)},loadExample:function(a){var b="string"==typeof a?a:H.value;j[b]||(b="Choose Example"),I.Editor.setValue(atob(j[b])),I.Editor.gotoLine(0),I.time=0,I.parseCode(),I.previewDiagram()}}}(window.Demo||(window.Demo={}),window),function(a,b){"use strict";a.base64=b.location.search?"":b.location.hash.substr(1).split(";"),a.Shader.init(decodeURIComponent($_GET.shaderExample)),a.DSP.init(decodeURIComponent($_GET.dspExample))}(window.Demo||(window.Demo={}),window);