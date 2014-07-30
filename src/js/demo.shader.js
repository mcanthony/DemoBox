;(function(Demo, window, undefined) {

	"use strict";

	var gl = null;
	var vsc = "attribute vec2 aPos;void main(){gl_Position=vec4(aPos.x,aPos.y,0.0,1.0);}";
	var fss = "precision mediump float;uniform vec2 iResolution;uniform float iGlobalTime;uniform sampler2D iDSP;uniform float iSync;\n"

	var examples = {
		"Choose Example": "LyoqCiAqIEZyYWdtZW50LVNoYWRlciAoT3BlbkdMIEVTIDIuMCkKICogIAogKiB2ZWMyICAgICAgaVJlc29sdXRpb24gLy8gY2FudmFzIHJlc29sdXRpb24gaW4gcGl4ZWxzCiAqIGZsb2F0ICAgICBpR2xvYmFsVGltZSAvLyBwbGF5YmFjayB0aW1lIGluIHNlY29uZHMKICogZmxvYXQgICAgIGlTeW5jICAgICAgIC8vIEN1cnJlbnQgRFNQIHBsYXliYWNrIHRpbWUgaW4gc2Vjb25kcwogKiBzYW1wbGVyMkQgaURTUCAgICAgICAgLy8gQ29udGFpbnMgZnJlcXVlbmN5IGFuZCB3YXZlIGRhdGEKICovCgp2b2lkIG1haW4oKQp7Cgl2ZWMyIHV2ID0gZ2xfRnJhZ0Nvb3JkLnh5IC8gaVJlc29sdXRpb24ueHk7CglnbF9GcmFnQ29sb3IgPSB2ZWM0KHV2LHNpbihpR2xvYmFsVGltZSksMS4wKTsKfQ==",
		"iDSP Usage": "dm9pZCBtYWluKCkKewoJdmVjMiB1diA9IGdsX0ZyYWdDb29yZC54eSAvIGlSZXNvbHV0aW9uLnh5OwoJZ2xfRnJhZ0NvbG9yID0gdmVjNCh2ZWMzKHRleHR1cmUyRChpRFNQLHZlYzIodXYueCwwKSkueCksMS4wKTsKfQ==",
		"2D Voronoi": "Y29uc3QgaW50IE4gPSAyMDA7CnZlYzIgcG9pbnRzW05dOwoKdmVjMiBub2lzZSh2ZWMyIGNvKXsKICAgIHJldHVybiB2ZWMyKAoJCWZyYWN0KHNpbihkb3QoY28ueHkgLHZlYzIoMTIuOTg5OCw3OC4yMzMpKSkgKiA0Mzc1OC41NDUzKSwKCQlmcmFjdChjb3MoZG90KGNvLnl4ICx2ZWMyKDEyLjk4OTgsNDM3NTguNTQ1MykpKSAqIDc4LjIzMykKCSk7Cn0KCnZvaWQgZ2VuZXJhdGVQb2ludHMoKQp7CQoJZmxvYXQgbiA9IDAuMDsKCQoJZm9yKGludCBpID0gMDsgaSA8IE47IGkrKykKCXsKCQlwb2ludHNbaV0gPSBub2lzZSh2ZWMyKG4pKTsJCQoJCW4gKz0gMS4wL2Zsb2F0KE4pOwoJfQp9CgpmbG9hdCB2b3Jvbm9pKHZlYzIgdXYpCnsKCWZsb2F0IGRpc3QgPSAxLjA7CgkKCWZvcihpbnQgaSA9IDA7IGkgPCBOOyBpKyspCgl7IGRpc3QgPSBtaW4oZGlzdCwgbGVuZ3RoKHV2LXBvaW50c1tpXSkpOyB9CgoJcmV0dXJuIDEuMCAtIGRpc3QqMTAuMDsKfQoKdm9pZCBtYWluKCkKewkKCWdlbmVyYXRlUG9pbnRzKCk7CgkKCXZlYzIgdXYgPSBnbF9GcmFnQ29vcmQueHkgLyBpUmVzb2x1dGlvbi54eTsKCXZlYzMgY29sID0gdmVjMyh2b3Jvbm9pKHV2KSk7CgkKCWdsX0ZyYWdDb2xvciA9IHZlYzQoY29sLDEuMCk7Cn0=",
		"2D Perlin": "I2RlZmluZSBOIDIwCiNkZWZpbmUgVSAxLjAvZmxvYXQoTikKCQp2ZWMyIG5vaXNlKHZlYzIgY28pewogICAgcmV0dXJuICh2ZWMyKAoJCWZyYWN0KHNpbihkb3QoY28ueHkgLHZlYzIoMTIuOTg5OCw3OC4yMzMpKSkgKiA0Mzc1OC41NDUzKSwKCQlmcmFjdChjb3MoZG90KGNvLnl4ICx2ZWMyKDEyLjk4OTgsNDM3NTguNTQ1MykpKSAqIDc4LjIzMykKCSktMC41KSoyLjA7Cn0KCmZsb2F0IGYoZmxvYXQgdCkgeyByZXR1cm4gNi4wKnQqdCp0KnQqdC0xNS4wKnQqdCp0KnQrMTAuMCp0KnQqdDsgfQoKZmxvYXQgcGVybGluKHZlYzIgcCkKewoJZmxvYXQgaSA9IGZsb29yKHAueCk7CglmbG9hdCBqID0gZmxvb3IocC55KTsKCQoJZmxvYXQgdSA9IHAueCAtIGk7CglmbG9hdCB2ID0gcC55IC0gajsKCQoJdmVjMiBnMDAgPSBub2lzZSh2ZWMyKGkgICAgLCBqICAgICkpOwoJdmVjMiBnMDEgPSBub2lzZSh2ZWMyKGkgICAgLCBqKzEuMCkpOwoJdmVjMiBnMTAgPSBub2lzZSh2ZWMyKGkrMS4wLCBqICAgICkpOwoJdmVjMiBnMTEgPSBub2lzZSh2ZWMyKGkrMS4wLCBqKzEuMCkpOwoJCglmbG9hdCBxMDAgPSBnMDAueCoodSAgICApICsgZzAwLnkqKHYgICAgKTsKCWZsb2F0IHEwMSA9IGcwMS54Kih1ICAgICkgKyBnMDEueSoodi0xLjApOwoJZmxvYXQgcTEwID0gZzEwLngqKHUtMS4wKSArIGcxMC55Kih2ICAgICk7CglmbG9hdCBxMTEgPSBnMTEueCoodS0xLjApICsgZzExLnkqKHYtMS4wKTsKCQoJZmxvYXQgcXgwID0gcTAwKigxLjAtZih1KSkgKyBxMTAqZih1KTsKCWZsb2F0IHF4MSA9IHEwMSooMS4wLWYodSkpICsgcTExKmYodSk7CglmbG9hdCBxeHkgPSBxeDAqKDEuMC1mKHYpKSArIHF4MSpmKHYpOwoKCXJldHVybiBxeHkrMC41Owp9Cgp2b2lkIG1haW4oKQp7Cgl2ZWMzIGNvbCA9IHZlYzMocGVybGluKGdsX0ZyYWdDb29yZC54eS9VLWlHbG9iYWxUaW1lKjUuMCkpOwoJZ2xfRnJhZ0NvbG9yID0gdmVjNChjb2wsMS4wKTsKfQ==",
		"2D Fractals": "I2RlZmluZSBOIDEwMC4wIC8vIEl0ZXJhdGlvbnMKI2RlZmluZSBaICAgMi4wIC8vIFpvb20KI2RlZmluZSBNIGZhbHNlIC8vIE1hbmRlbGJyb3QKCnZvaWQgbWFpbigpCnsKCXZlYzMgZCA9IHZlYzMoMSk7IHZlYzIgYyA9IHZlYzIoLTAuNzksMC4yKTsKCXZlYzIgeiA9ICgyLjAgKiBnbF9GcmFnQ29vcmQueHkgLSBpUmVzb2x1dGlvbi54eSkgLyBpUmVzb2x1dGlvbi54eCAqIFo7CglpZiAoTSkgeyBjID0gejsgeiA9IHZlYzIoMCk7IH0KCglmb3IoZmxvYXQgaT0wLjA7aTxOO2krPTEuMCkKCXsKCQl6ID0gdmVjMih6Lngqei54LXoueSp6LnksMi4wKnoueCp6LnkpK2M7CgkJaWYgKGxlbmd0aCh6KT4yLjApIHsgZCA9IHZlYzMoaS9OKTsgYnJlYWs7IH0KCX0KCQoJZ2xfRnJhZ0NvbG9yID0gdmVjNCgzLjAqZCp2ZWMzKGdsX0ZyYWdDb29yZC54eS9pUmVzb2x1dGlvbi54eSwxKSt2ZWMzKDAuMDcpLDEuMCk7Cn0=",
		"3D Raymarching": "I2RlZmluZSBTVEVQUyAxNgojZGVmaW5lIFBSRUNJU0lPTiAwLjAwMQojZGVmaW5lIERFUFRIIDUuMAoKdmVjMyBleWUgPSB2ZWMzKDAsMC41LC0xKTsKdmVjMyBsaWdodCA9IHZlYzMoMCwxLC0xKTsKCmZsb2F0IGJveCwgZ3JvdW5kOwpmbG9hdCB0ID0gaUdsb2JhbFRpbWU7CgpmbG9hdCB1ZEJveCh2ZWMzIHAsdmVjMyBiLGZsb2F0IHIpe3JldHVybiBsZW5ndGgobWF4KGFicyhwKS1iLDAuMCkpLXI7fQptYXQzIHJvdFkoZmxvYXQgYSl7ZmxvYXQgcz1zaW4oYSk7ZmxvYXQgYz1jb3MoYSk7cmV0dXJuIG1hdDMoYywwLC1zLDAsMSwwLHMsMCxjKTt9CgpmbG9hdCBzY2VuZSh2ZWMzIHApCnsJCglncm91bmQgPSBwLnkrMC41OwoJYm94ID0gdWRCb3gocCpyb3RZKHAueSo1LjApKnJvdFkodCksdmVjMygwLjEsMC4yLDAuMSksMC4wMyk7CgkKCWZsb2F0IGQgPSAxZTEwOwoJCglkID0gbWluKGQsIGdyb3VuZCk7CglkID0gbWluKGQsIGJveCk7CgkKCXJldHVybiBkOwp9Cgp2ZWMzIGdldE5vcm1hbCh2ZWMzIHApCnsKCXZlYzIgZSA9IHZlYzIoUFJFQ0lTSU9OLDApOwoJdmVjMyBuID0gbm9ybWFsaXplKHZlYzMoCgkJc2NlbmUocCtlLnh5eSkgLSBzY2VuZShwLWUueHl5KSwKCQlzY2VuZShwK2UueXh5KSAtIHNjZW5lKHAtZS55eHkpLAoJCXNjZW5lKHArZS55eXgpIC0gc2NlbmUocC1lLnl5eCkKCSkpOwoJCglyZXR1cm4gbjsKfQoKdmVjMyBwcm9jZXNzQ29sb3IodmVjMyBwKQp7CglmbG9hdCBkID0gMWUxMDsKCQoJdmVjMyBuID0gZ2V0Tm9ybWFsKHApOwoJdmVjMyBsID0gbm9ybWFsaXplKGxpZ2h0LXApOwoJdmVjMyBjb2w7CgkKCWZsb2F0IGRpc3QgPSBsZW5ndGgobGlnaHQtcCk7CglmbG9hdCBkaWZmID0gbWF4KGRvdChuLGwpLDAuMCk7CglmbG9hdCBzcGVjID0gcG93KGRpZmYsMTAwLjApOwoJCglpZiAoZ3JvdW5kPGQpe2NvbD12ZWMzKGRpZmYqMC41KTtkPWdyb3VuZDt9CglpZiAoYm94PGQpe2NvbD1uK2RpZmYrc3BlYzt9CgkKCWNvbCAqPSBtaW4oMS4wLDEuMC9kaXN0KTsKCQoJcmV0dXJuIGNvbDsKfQoKdmVjMyBsb29rQXQodmVjMyBvLCB2ZWMzIHQpCnsKCXZlYzIgdXYgPSAoMi4wICogZ2xfRnJhZ0Nvb3JkLnh5IC0gaVJlc29sdXRpb24ueHkpIC8gaVJlc29sdXRpb24ueHg7Cgl2ZWMzIGRpciA9IG5vcm1hbGl6ZSh0LW8pLCB1cCA9IHZlYzMoMCwxLDApLCByaWdodCA9IGNyb3NzKHVwLGRpcik7Cgl1cCA9IGNyb3NzKGRpcixyaWdodCk7CgkKCXJldHVybiBub3JtYWxpemUocmlnaHQqdXYueCArIHVwKnV2LnkgKyBkaXIpOwp9Cgp2ZWMzIG1hcmNoKHZlYzMgcm8sIHZlYzMgcmQpCnsKCXZlYzMgcDsgZmxvYXQgdD0wLjAsIGQ7CgkKCWZvciAoaW50IGk9MDtpPFNURVBTO2krKykKCXsKCQlkPXNjZW5lKHJvK3JkKnQpOwoJCWlmKGQ8UFJFQ0lTSU9OfHx0PkRFUFRIKXticmVhazt9CgkJdCs9ZDsKCX0KCQoJcmV0dXJuKHJvK3JkKnQpOwp9Cgp2b2lkIG1haW4oKQp7CQoJdmVjMyBwID0gbWFyY2goZXllLGxvb2tBdChleWUsdmVjMygwKSkpOwoJdmVjMyBjb2wgPSBwcm9jZXNzQ29sb3IocCk7CgoJZ2xfRnJhZ0NvbG9yID0gdmVjNChjb2wsMS4wKTsKfQ==",
		"3D Hypercube": "I2RlZmluZSBTVEVQUyAzMgojZGVmaW5lIFBSRUNJU0lPTiAwLjAxCiNkZWZpbmUgREVQVEggMTAuMAoKdmVjMyBleWUgPSB2ZWMzKDAsMCwtMi41KTsKdmVjMiB1djsgYm9vbCBoaXQgPSBmYWxzZTsKCmZsb2F0IGxpbmVzLCBsaW5lV2lkdGggPSAwLjAyNTsKZmxvYXQgdCA9IG1vZChpR2xvYmFsVGltZSwxLjApOwpmbG9hdCBzID0gKHNpbihpR2xvYmFsVGltZSowLjUpKzEuMCkvMi4wKjAuMTUrMC4xNTsKCQkKLy8gaXEncyBtYWdpYyBkaXN0YW5jZSBmdW5jdGlvbgpmbG9hdCBsaW5lKHZlYzMgcCx2ZWMzIGEsdmVjMyBiKXt2ZWMzIHBhPXAtYSxiYT1iLWE7ZmxvYXQgaD1jbGFtcChkb3QocGEsYmEpL2RvdChiYSxiYSksMC4wLDEuMCk7cmV0dXJuIGxlbmd0aChwYS1iYSpoKS1saW5lV2lkdGg7fQoKLy8gUm90YXRpb24KbWF0MyByb3RaKGZsb2F0IGEpe2Zsb2F0IHM9c2luKGEpO2Zsb2F0IGM9Y29zKGEpO3JldHVybiBtYXQzKGMsLXMsMCxzLGMsMCwwLDAsMSk7fQptYXQzIHJvdFgoZmxvYXQgYSl7ZmxvYXQgcz1zaW4oYSk7ZmxvYXQgYz1jb3MoYSk7cmV0dXJuIG1hdDMoMSwwLDAsMCxjLHMsMCwtcyxjKTt9Cm1hdDMgcm90WShmbG9hdCBhKXtmbG9hdCBzPXNpbihhKTtmbG9hdCBjPWNvcyhhKTtyZXR1cm4gbWF0MyhjLDAsLXMsMCwxLDAscywwLGMpO30KCi8vIE1hcmNoaW5nCmZsb2F0IHNjZW5lKHZlYzMpOwp2ZWMzIGdldE5vcm1hbCh2ZWMzIHApe3ZlYzIgZT12ZWMyKFBSRUNJU0lPTiwwKTtyZXR1cm4obm9ybWFsaXplKHZlYzMoc2NlbmUocCtlLnh5eSktc2NlbmUocC1lLnh5eSksc2NlbmUocCtlLnl4eSktc2NlbmUocC1lLnl4eSksc2NlbmUocCtlLnl5eCktc2NlbmUocC1lLnl5eCkpKSk7fQp2ZWMzIG1hcmNoKHZlYzMgcm8sdmVjMyByZCl7ZmxvYXQgdD0wLjAsZDtoaXQ9ZmFsc2U7Zm9yKGludCBpPTA7aTxTVEVQUztpKyspe2Q9c2NlbmUocm8rcmQqdCk7aWYoZDxQUkVDSVNJT04pe2hpdD10cnVlO2JyZWFrO31pZih0PkRFUFRIKXticmVhazt9dCs9ZDt9cmV0dXJuKHJvK3JkKnQpO30KdmVjMyBsb29rQXQodmVjMyBvLHZlYzMgdCl7dmVjMiB1dj0oMi4wKmdsX0ZyYWdDb29yZC54eS1pUmVzb2x1dGlvbi54eSkvaVJlc29sdXRpb24ueHg7dmVjMyBkPW5vcm1hbGl6ZSh0LW8pLHU9dmVjMygwLDEsMCkscj1jcm9zcyh1LGQpO3JldHVybihub3JtYWxpemUocip1di54K2Nyb3NzKGQscikqdXYueStkKSk7fQoKLy8gVmVydGljZXMKY29uc3QgdmVjMyBsYmYgPSB2ZWMzKC0wLjUsLTAuNSwtMC41KTsKY29uc3QgdmVjMyByYmYgPSB2ZWMzKCAwLjUsLTAuNSwtMC41KTsKY29uc3QgdmVjMyBsYmIgPSB2ZWMzKC0wLjUsLTAuNSwgMC41KTsKY29uc3QgdmVjMyByYmIgPSB2ZWMzKCAwLjUsLTAuNSwgMC41KTsKCmNvbnN0IHZlYzMgbHRmID0gdmVjMygtMC41LCAwLjUsLTAuNSk7CmNvbnN0IHZlYzMgcnRmID0gdmVjMyggMC41LCAwLjUsLTAuNSk7CmNvbnN0IHZlYzMgbHRiID0gdmVjMygtMC41LCAwLjUsIDAuNSk7CmNvbnN0IHZlYzMgcnRiID0gdmVjMyggMC41LCAwLjUsIDAuNSk7Cgp2ZWMzIGxiZmkgPSB2ZWMzKC0wLjUrcywtMC41K3MsLTAuNStzKTsKdmVjMyByYmZpID0gdmVjMyggMC41LXMsLTAuNStzLC0wLjUrcyk7CnZlYzMgbGJiaSA9IHZlYzMoLTAuNStzLC0wLjUrcywgMC41LXMpOwp2ZWMzIHJiYmkgPSB2ZWMzKCAwLjUtcywtMC41K3MsIDAuNS1zKTsKCnZlYzMgbHRmaSA9IHZlYzMoLTAuNStzLCAwLjUtcywtMC41K3MpOwp2ZWMzIHJ0ZmkgPSB2ZWMzKCAwLjUtcywgMC41LXMsLTAuNStzKTsKdmVjMyBsdGJpID0gdmVjMygtMC41K3MsIDAuNS1zLCAwLjUtcyk7CnZlYzMgcnRiaSA9IHZlYzMoIDAuNS1zLCAwLjUtcywgMC41LXMpOwoKdmVjMyBsYmZfbGJmaSA9IG1peChsYmYsbGJmaSx0KTsKdmVjMyBsdGZfbHRmaSA9IG1peChsdGYsbHRmaSx0KTsKdmVjMyBsYmJfbGJiaSA9IG1peChsYmIsbGJiaSx0KTsKdmVjMyBsdGJfbHRiaSA9IG1peChsdGIsbHRiaSx0KTsKCnZlYzMgcmJiX2xiYiA9IG1peChyYmIsbGJiLHQpOwp2ZWMzIHJiZl9sYmYgPSBtaXgocmJmLGxiZix0KTsKdmVjMyBydGZfbHRmID0gbWl4KHJ0ZixsdGYsdCk7CnZlYzMgcnRiX2x0YiA9IG1peChydGIsbHRiLHQpOwoKdmVjMyBsYmZpX3JiZmkgPSBtaXgobGJmaSxyYmZpLHQpOwp2ZWMzIGxiYmlfcmJiaSA9IG1peChsYmJpLHJiYmksdCk7CnZlYzMgbHRmaV9ydGZpID0gbWl4KGx0ZmkscnRmaSx0KTsKdmVjMyBsdGJpX3J0YmkgPSBtaXgobHRiaSxydGJpLHQpOwoKdmVjMyByYmJpX3JiYiA9IG1peChyYmJpLHJiYix0KTsKdmVjMyByYmZpX3JiZiA9IG1peChyYmZpLHJiZix0KTsKdmVjMyBydGZpX3J0ZiA9IG1peChydGZpLHJ0Zix0KTsKdmVjMyBydGJpX3J0YiA9IG1peChydGJpLHJ0Yix0KTsKCmZsb2F0IHNjZW5lKHZlYzMgcCkKewoJcCAqPSByb3RYKDAuNzg1KTsgbGluZXMgPSAxZTEwOwoKCS8vIG91dHNpZGUKCWxpbmVzID0gbWluKGxpbmVzLGxpbmUocCxsYmZfbGJmaSxyYmZfbGJmKSk7CglsaW5lcyA9IG1pbihsaW5lcyxsaW5lKHAsbGJiX2xiYmkscmJiX2xiYikpOwoJbGluZXMgPSBtaW4obGluZXMsbGluZShwLGx0Zl9sdGZpLHJ0Zl9sdGYpKTsKCWxpbmVzID0gbWluKGxpbmVzLGxpbmUocCxsdGJfbHRiaSxydGJfbHRiKSk7CgoJbGluZXMgPSBtaW4obGluZXMsbGluZShwLGxiZl9sYmZpLGxiYl9sYmJpKSk7CglsaW5lcyA9IG1pbihsaW5lcyxsaW5lKHAsbHRmX2x0ZmksbHRiX2x0YmkpKTsKCWxpbmVzID0gbWluKGxpbmVzLGxpbmUocCxsYmZfbGJmaSxsdGZfbHRmaSkpOwoJbGluZXMgPSBtaW4obGluZXMsbGluZShwLGxiYl9sYmJpLGx0Yl9sdGJpKSk7CgoJbGluZXMgPSBtaW4obGluZXMsbGluZShwLHJiZl9sYmYscmJiX2xiYikpOwoJbGluZXMgPSBtaW4obGluZXMsbGluZShwLHJ0Zl9sdGYscnRiX2x0YikpOwoJbGluZXMgPSBtaW4obGluZXMsbGluZShwLHJiZl9sYmYscnRmX2x0ZikpOwoJbGluZXMgPSBtaW4obGluZXMsbGluZShwLHJiYl9sYmIscnRiX2x0YikpOwoKICAgIC8vIGluc2lkZQoJbGluZXMgPSBtaW4obGluZXMsbGluZShwLGxiZmlfcmJmaSxsYmJpX3JiYmkpKTsKCWxpbmVzID0gbWluKGxpbmVzLGxpbmUocCxsdGZpX3J0ZmksbHRiaV9ydGJpKSk7CglsaW5lcyA9IG1pbihsaW5lcyxsaW5lKHAsbGJmaV9yYmZpLGx0ZmlfcnRmaSkpOwoJbGluZXMgPSBtaW4obGluZXMsbGluZShwLGxiYmlfcmJiaSxsdGJpX3J0YmkpKTsKCglsaW5lcyA9IG1pbihsaW5lcyxsaW5lKHAsbGJiaV9yYmJpLHJiYmlfcmJiKSk7CglsaW5lcyA9IG1pbihsaW5lcyxsaW5lKHAsbGJmaV9yYmZpLHJiZmlfcmJmKSk7CglsaW5lcyA9IG1pbihsaW5lcyxsaW5lKHAsbHRmaV9ydGZpLHJ0ZmlfcnRmKSk7CglsaW5lcyA9IG1pbihsaW5lcyxsaW5lKHAsbHRiaV9ydGJpLHJ0YmlfcnRiKSk7CgoJbGluZXMgPSBtaW4obGluZXMsbGluZShwLHJiZmlfcmJmLHJ0ZmlfcnRmKSk7CglsaW5lcyA9IG1pbihsaW5lcyxsaW5lKHAscmJiaV9yYmIscnRiaV9ydGIpKTsKCWxpbmVzID0gbWluKGxpbmVzLGxpbmUocCxyYmZpX3JiZixyYmJpX3JiYikpOwoJbGluZXMgPSBtaW4obGluZXMsbGluZShwLHJ0ZmlfcnRmLHJ0YmlfcnRiKSk7CgogICAgLy8gY29ubmVjdGlvbnMKCWxpbmVzID0gbWluKGxpbmVzLGxpbmUocCxydGJpX3J0YixydGJfbHRiKSk7CglsaW5lcyA9IG1pbihsaW5lcyxsaW5lKHAscmJmaV9yYmYscmJmX2xiZikpOwoJbGluZXMgPSBtaW4obGluZXMsbGluZShwLHJiYmlfcmJiLHJiYl9sYmIpKTsKCWxpbmVzID0gbWluKGxpbmVzLGxpbmUocCxydGZpX3J0ZixydGZfbHRmKSk7CgkKCWxpbmVzID0gbWluKGxpbmVzLGxpbmUocCxsdGZpX3J0ZmksbHRmX2x0ZmkpKTsKCWxpbmVzID0gbWluKGxpbmVzLGxpbmUocCxsdGJpX3J0YmksbHRiX2x0YmkpKTsKCWxpbmVzID0gbWluKGxpbmVzLGxpbmUocCxsYmZpX3JiZmksbGJmX2xiZmkpKTsKCWxpbmVzID0gbWluKGxpbmVzLGxpbmUocCxsYmJpX3JiYmksbGJiX2xiYmkpKTsKCQoJcmV0dXJuIGxpbmVzOwp9Cgp2ZWMzIHByb2Nlc3NDb2xvcih2ZWMzIHApCnsJCgl2ZWMzIG4gPSBnZXROb3JtYWwocCk7Cgl2ZWMzIGwgPSBub3JtYWxpemUoZXllLXApOwoJCglmbG9hdCBkID0gMWUxMDsKCWZsb2F0IGRpZmYgPSBtYXgoZG90KG4sbCksMC4wKTsKCWZsb2F0IHNwZWMgPSBwb3coZGlmZiwxLjApOwoKCXJldHVybiB2ZWMzKDEwMCwwLDEwKSpkaWZmKm1heCgwLjUtc3BlYywwLjAxKTsKfQoKdm9pZCBtYWluKCkKewkKCWV5ZSAqPSByb3RYKGlHbG9iYWxUaW1lKSpyb3RaKGlHbG9iYWxUaW1lKTsKCXV2ID0gKDIuMCAqIGdsX0ZyYWdDb29yZC54eSAtIGlSZXNvbHV0aW9uLnh5KSAvIGlSZXNvbHV0aW9uLnh4OwoJCgl2ZWMzIHAgPSBtYXJjaChleWUsbG9va0F0KGV5ZSx2ZWMzKDApKSk7Cgl2ZWMzIGNvbCA9IHByb2Nlc3NDb2xvcihwKTsKCQoJaWYgKGhpdCA9PSBmYWxzZSkgeyBjb2wgPSB2ZWMzKDEuMC1sZW5ndGgodXYpKnZlYzMoMS4yLDEuMiwxKSowLjUpOyB9CgoJZ2xfRnJhZ0NvbG9yID0gdmVjNChjb2wsMS4wKTsKfQ=="
	};

	// HTML-Elements
	var $canvas     = $(".shader canvas");
	var $view       = $(".shader td:first-child");
	var $codeView   = $(".shader .code-view");
	var $code       = $("#shader-editor");
	var $play       = $(".shader .play-pause");
	var $reset      = $(".shader .reset");
	var $run        = $(".shader .run");
	var $time       = $(".shader .time");
	var $fps        = $(".shader .fps");
	var $examples   = $(".shader .examples");
	var $fullscreen = $(".shader .fullscreen");

	var Shader = Demo.Shader = {

		time: 0,
		pause: false,
		frameNumber: 0,
		playTime: 0,
		pauseTime: 0,
		fpsStartTime: 0,

		/* ========================= */
		/* ====== GET CONTEXT ====== */
		/* ========================= */

		getContext: function(canvas) {

			var ctx = null;
			var contextIds = ["webgl", "experimental-webgl", "webkit-3d", "moz-webgl"];
			var attributes = { alpha: false, depth: false, antialias: false, stencil: false, premultipliedAlpha: false, preserveDrawingBuffer: false };

			contextIds.some(function(v) {
				try { ctx = canvas.getContext(v, attributes); } catch(e){}
				if (ctx) { return true; }
			});

			return ctx;
		},

		/* ================== */
		/* ====== INIT ====== */
		/* ================== */

		init: function(example) {

			gl = Shader.getContext($canvas);

			Shader.example = examples[example] ? example : "Choose Example";
			$examples.value = Shader.example;

			// Setup Ace-Editor
			Shader.setupEditor();

			// Reference gl context
			Shader.gl = gl;

			// Setup view, compile and run
			Shader.pause = true;
			Shader.compile();
			Shader.setupCanvas();

			// Register event-listeners
			$run.addEventListener("click", Shader.compile, false);
			$play.addEventListener("click", Shader.togglePlayback, false);
			$reset.addEventListener("click", Shader.reset, false);
			$fullscreen.addEventListener("click", Shader.toggleFullscreen, false);
			$examples.addEventListener("change", Shader.loadExample, false);
			window.addEventListener("resize", Shader.setupCanvas, false);
		},

		/* ===================== */
		/* ====== COMPILE ====== */
		/* ===================== */

		compile: function(e) {

			// Stop rendering
			window.cancelAnimationFrame(Shader.animationRequest);

			// Remove error class
			$codeView.className = $codeView.className.replace("error", "");

			// Get glsl code
			var codeValue = Shader.Editor.getValue();

			// Stop rendering while compiling
			window.cancelAnimationFrame(Shader.animationRequest);

			var vs = gl.createShader(gl.VERTEX_SHADER);
			var fs = gl.createShader(gl.FRAGMENT_SHADER);
			var program = gl.createProgram();

			gl.shaderSource(vs, vsc);
			gl.shaderSource(fs, fss + codeValue);

			gl.compileShader(vs);
			gl.compileShader(fs);

			gl.attachShader(program, vs);
			gl.attachShader(program, fs);

			gl.linkProgram(program);
			gl.useProgram(program);

			gl.deleteShader(vs);
			gl.deleteShader(fs);
			gl.deleteProgram(program);

			Shader.bfr = gl.createBuffer();
			Shader.aPos = gl.getAttribLocation(program, "aPos");

			// Setup uniforms
			Shader.iGlobalTime = gl.getUniformLocation(program, "iGlobalTime");
			Shader.iResolution = gl.getUniformLocation(program, "iResolution");
			Shader.iDSP  = gl.getUniformLocation(program, "iDSP");
			Shader.iSync       = gl.getUniformLocation(program, "iSync");

			// Setup rectangle vertices
			gl.bindBuffer(gl.ARRAY_BUFFER, Shader.bfr);
			gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1.0,-1.0,1.0,-1.0,-1.0,1.0,1.0,-1.0,1.0,1.0,-1.0,1.0]), gl.STATIC_DRAW);
			gl.enableVertexAttribArray(Shader.bfr);

			// Setup iDSP texture
			gl.bindTexture(gl.TEXTURE_2D, Shader.frequencyTexture = gl.createTexture());
			gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
			gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
			gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S,     gl.CLAMP_TO_EDGE);
			gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T,     gl.CLAMP_TO_EDGE);
			gl.texImage2D(gl.TEXTURE_2D, 0, gl.LUMINANCE, 512, 2, 0, gl.LUMINANCE, gl.UNSIGNED_BYTE, null);

			// Setup viewport
			gl.uniform2f(Shader.iResolution, gl.canvas.width, gl.canvas.height);
			gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);

			// Update the URL hash if the code was parsed due to a user event
			if (e) { window.location.hash = btoa(codeValue) + ";" + btoa(Demo.DSP.Editor.getValue()); }

			var err = gl.getError();

			// Check for errors, else start rendering
			if (err&&err!=gl.INVALID_VALUE) { Shader.error(); }
			else { Shader.render(); }
		},

		/* ========================== */
		/* ====== SETUP EDITOR ====== */
		/* ========================== */

		setupEditor: function() {

			Shader.Editor = ace.edit("shader-editor");
			Shader.Editor.setTheme("ace/theme/monokai");
			Shader.Editor.getSession().setMode("ace/mode/glsl");
			Shader.Editor.setShowPrintMargin(false);

			Shader.Editor.commands.addCommand({
				name: 'compile',
				bindKey: {win: 'Ctrl-Enter',  mac: 'Command-Enter'},
				exec: Shader.compile
			});

			// Use default code example if there's no base64 URL hash
			if (!Demo.base64[0]||$_GET.shaderExample) { Shader.Editor.setValue(atob(examples[Shader.example])); }
			else { Shader.Editor.setValue(atob(Demo.base64[0])); }

			Shader.Editor.gotoLine(0);
		},

		/* ========================== */
		/* ====== SETUP CANVAS ====== */
		/* ========================== */

		setupCanvas: function() {

			// Update with and height
			gl.canvas.width = Shader.isFullscreen ? window.innerWidth : $view.offsetWidth;
			gl.canvas.height = Shader.isFullscreen ? window.innerHeight : $view.offsetHeight;

			// Update uniform and viewport
			gl.uniform2f(Shader.iResolution, gl.canvas.width, gl.canvas.height);
			gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);

			Shader.render();
		},

		/* ==================== */
		/* ====== RENDER ====== */
		/* ==================== */

		render: function() {

			Shader.animationRequest = !Shader.pause && window.requestAnimationFrame(Shader.render);
			Shader.time = (new Date().getTime() - Shader.playTime) / 1000;

			gl.uniform1f(Shader.iGlobalTime, Shader.time);
			gl.vertexAttribPointer(Shader.aPos, 2, gl.FLOAT, false, 0, 0);
			gl.drawArrays(gl.TRIANGLES, 0, 6);

			Shader.fps = Shader.getFPS();
		},

		/* ===================== */
		/* ====== GET FPS ====== */
		/* ===================== */

		getFPS: function() {

			var interval = (new Date().getTime()-Shader.fpsStartTime)/1000;

			if (interval>1) {
				Shader.fpsStartTime = new Date().getTime();
				Shader.frameNumber = 0;
			}

			return Math.min(Math.floor(++Shader.frameNumber/interval),60);
		},

		/* ============================= */
		/* ====== TOGGLE PLAYBACK ====== */
		/* ============================= */

		togglePlayback: function(e) {

			if (typeof e == "boolean") { Shader.pause = !e; }
			else { Shader.pause = !Shader.pause; }

			if (!Shader.pause) {
				Shader.playTime += new Date().getTime() - Shader.pauseTime;
				Shader.updateTimer = window.setInterval(Shader.updateInfo, 100);
				Shader.render();
			} else {
				Shader.pauseTime = new Date().getTime();
				window.clearInterval(Shader.updateTimer);
			}

			$play.setAttribute("data-status", Shader.pause ? "0" : "1");
			$play.style.backgroundPosition = Shader.pause ? "0px 0px" : "-20px 0px";
		},

		/* =================== */
		/* ====== RESET ====== */
		/* =================== */

		reset: function() {
			$time.innerHTML = "0.00";
			if (Shader.pause){ Shader.playTime = Shader.pauseTime = 0; }
			else { Shader.playTime = new Date().getTime(); }
		},

		/* =================== */
		/* ====== ERROR ====== */
		/* =================== */

		error: function(e) {
			$codeView.className += " error";
		},

		/* ========================= */
		/* ====== UPDATE INFO ====== */
		/* ========================= */

		updateInfo: function() {
			$time.innerHTML = Shader.time.toFixed(2);
			$fps.innerHTML = (Shader.fps<9?"0"+Shader.fps:Shader.fps) + " FPS";
		},

		/* =============================== */
		/* ====== TOGGLE FULLSCREEN ====== */
		/* =============================== */

		toggleFullscreen: function(e) {

			Shader.isFullscreen = document.fullscreen || document.mozFullScreen || document.webkitIsFullScreen;

			if (!Shader.isFullscreen) {
				if ($canvas.requestFullscreen) { $canvas.requestFullscreen(); }
				else if ($canvas.mozRequestFullScreen) { $canvas.mozRequestFullScreen(); }
				else if ($canvas.webkitRequestFullscreen) { $canvas.webkitRequestFullscreen(); }
			}

			if (!Shader.toggleFullscreen.listening) {
				Shader.toggleFullscreen.listening = true;
				$canvas.addEventListener("fullscreenchange", Shader.toggleFullscreen, false);
				$canvas.addEventListener("mozfullscreenchange", Shader.toggleFullscreen, false);
				$canvas.addEventListener("webkitfullscreenchange", Shader.toggleFullscreen, false);
			}

			$canvas.style.borderRadius = Shader.isFullscreen ? "0px" : "5px";
		},

		/* ========================== */
		/* ====== LOAD EXAMPLE ====== */
		/* ========================== */

		loadExample: function(str) {
			var which = typeof str == "string" ? str : $examples.value;
			if (!examples[which]) { which = "Choose Example"; }

			Shader.Editor.setValue(atob(examples[which]));
			Shader.Editor.gotoLine(0);

			Shader.togglePlayback(false);
			Shader.playTime = Shader.pauseTime = 0;
			$time.innerHTML = "0.00";
			
			Shader.compile();
		}
	};

}(window.Demo || (window.Demo = {}), window));