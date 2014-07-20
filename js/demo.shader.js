;(function(Demo, window, undefined) {

	var gl = null;
	var vsc = "attribute vec2 aPos;void main(){gl_Position=vec4(aPos.x,aPos.y,0.0,1.0);}";
	var fss = "precision mediump float;uniform vec2 iResolution;uniform float iGlobalTime;uniform sampler2D iFrequency;uniform float iSync;\n"

	var examples = {
		"Choose Example": "LyoqCiAqIEZyYWdtZW50LVNoYWRlciAoT3BlbkdMIEVTIDIuMCkKICogIAogKiB2ZWMyICAgICAgaVJlc29sdXRpb24gLy8gY2FudmFzIHJlc29sdXRpb24gaW4gcGl4ZWxzCiAqIGZsb2F0ICAgICBpR2xvYmFsVGltZSAvLyBwbGF5YmFjayB0aW1lIGluIHNlY29uZHMKICogZmxvYXQgICAgIGlTeW5jICAgICAgIC8vIEN1cnJlbnQgRFNQIHBsYXliYWNrIHRpbWUgaW4gc2Vjb25kcwogKiBzYW1wbGVyMkQgaURTUCAgICAgICAgLy8gQ29udGFpbnMgZnJlcXVlbmN5IGFuZCB3YXZlIGRhdGEKICovCgp2b2lkIG1haW4oKQp7Cgl2ZWMyIHV2ID0gZ2xfRnJhZ0Nvb3JkLnh5IC8gaVJlc29sdXRpb24ueHk7CglnbF9GcmFnQ29sb3IgPSB2ZWM0KHV2LHNpbihpR2xvYmFsVGltZSksMS4wKTsKfQ==",
		"iDSP Usage": "dm9pZCBtYWluKCkKewoJdmVjMiB1diA9IGdsX0ZyYWdDb29yZC54eSAvIGlSZXNvbHV0aW9uLnh5OwoJZ2xfRnJhZ0NvbG9yID0gdmVjNCh2ZWMzKHRleHR1cmUyRChpRnJlcXVlbmN5LHZlYzIodXYueCwwKSkueCksMS4wKTsKfQ==",
		"2D Voroni": "Y29uc3QgaW50IE4gPSAyMDA7CnZlYzIgcG9pbnRzW05dOwoKdmVjMiBub2lzZSh2ZWMyIGNvKXsKICAgIHJldHVybiB2ZWMyKAoJCWZyYWN0KHNpbihkb3QoY28ueHkgLHZlYzIoMTIuOTg5OCw3OC4yMzMpKSkgKiA0Mzc1OC41NDUzKSwKCQlmcmFjdChjb3MoZG90KGNvLnl4ICx2ZWMyKDEyLjk4OTgsNDM3NTguNTQ1MykpKSAqIDc4LjIzMykKCSk7Cn0KCnZvaWQgZ2VuZXJhdGVQb2ludHMoKQp7CQoJZmxvYXQgbiA9IDAuMDsKCQoJZm9yKGludCBpID0gMDsgaSA8IE47IGkrKykKCXsKCQlwb2ludHNbaV0gPSBub2lzZSh2ZWMyKG4pKTsJCQoJCW4gKz0gMS4wL2Zsb2F0KE4pOwoJfQp9CgpmbG9hdCB2b3JvbmkodmVjMiB1dikKewoJZmxvYXQgZGlzdCA9IDEuMDsKCQoJZm9yKGludCBpID0gMDsgaSA8IE47IGkrKykKCXsgZGlzdCA9IG1pbihkaXN0LCBsZW5ndGgodXYtcG9pbnRzW2ldKSk7IH0KCglyZXR1cm4gMS4wIC0gZGlzdCoxMC4wOwp9Cgp2b2lkIG1haW4oKQp7CQoJZ2VuZXJhdGVQb2ludHMoKTsKCQoJdmVjMiB1diA9IGdsX0ZyYWdDb29yZC54eSAvIGlSZXNvbHV0aW9uLnh5OwoJdmVjMyBjb2wgPSB2ZWMzKHZvcm9uaSh1dikpOwoJCglnbF9GcmFnQ29sb3IgPSB2ZWM0KGNvbCwxLjApOwp9",
		"2D Perlin": "I2RlZmluZSBOIDIwCiNkZWZpbmUgVSAxLjAvZmxvYXQoTikKCQp2ZWMyIG5vaXNlKHZlYzIgY28pewogICAgcmV0dXJuICh2ZWMyKAoJCWZyYWN0KHNpbihkb3QoY28ueHkgLHZlYzIoMTIuOTg5OCw3OC4yMzMpKSkgKiA0Mzc1OC41NDUzKSwKCQlmcmFjdChjb3MoZG90KGNvLnl4ICx2ZWMyKDEyLjk4OTgsNDM3NTguNTQ1MykpKSAqIDc4LjIzMykKCSktMC41KSoyLjA7Cn0KCmZsb2F0IGYoZmxvYXQgdCkgeyByZXR1cm4gNi4wKnQqdCp0KnQqdC0xNS4wKnQqdCp0KnQrMTAuMCp0KnQqdDsgfQoKZmxvYXQgcGVybGluKHZlYzIgcCkKewoJZmxvYXQgaSA9IGZsb29yKHAueCk7CglmbG9hdCBqID0gZmxvb3IocC55KTsKCQoJZmxvYXQgdSA9IHAueCAtIGk7CglmbG9hdCB2ID0gcC55IC0gajsKCQoJdmVjMiBnMDAgPSBub2lzZSh2ZWMyKGkgICAgLCBqICAgICkpOwoJdmVjMiBnMDEgPSBub2lzZSh2ZWMyKGkgICAgLCBqKzEuMCkpOwoJdmVjMiBnMTAgPSBub2lzZSh2ZWMyKGkrMS4wLCBqICAgICkpOwoJdmVjMiBnMTEgPSBub2lzZSh2ZWMyKGkrMS4wLCBqKzEuMCkpOwoJCglmbG9hdCBxMDAgPSBnMDAueCoodSAgICApICsgZzAwLnkqKHYgICAgKTsKCWZsb2F0IHEwMSA9IGcwMS54Kih1ICAgICkgKyBnMDEueSoodi0xLjApOwoJZmxvYXQgcTEwID0gZzEwLngqKHUtMS4wKSArIGcxMC55Kih2ICAgICk7CglmbG9hdCBxMTEgPSBnMTEueCoodS0xLjApICsgZzExLnkqKHYtMS4wKTsKCQoJZmxvYXQgcXgwID0gcTAwKigxLjAtZih1KSkgKyBxMTAqZih1KTsKCWZsb2F0IHF4MSA9IHEwMSooMS4wLWYodSkpICsgcTExKmYodSk7CglmbG9hdCBxeHkgPSBxeDAqKDEuMC1mKHYpKSArIHF4MSpmKHYpOwoKCXJldHVybiBxeHkrMC41Owp9Cgp2b2lkIG1haW4oKQp7Cgl2ZWMzIGNvbCA9IHZlYzMocGVybGluKGdsX0ZyYWdDb29yZC54eS9VLWlHbG9iYWxUaW1lKjUuMCkpOwoJZ2xfRnJhZ0NvbG9yID0gdmVjNChjb2wsMS4wKTsKfQ==",
		"2D Fractals": "I2RlZmluZSBOIDEwMC4wIC8vIEl0ZXJhdGlvbnMKI2RlZmluZSBaICAgMi4wIC8vIFpvb20KI2RlZmluZSBNIGZhbHNlIC8vIE1hbmRlbGJyb3QKCnZvaWQgbWFpbigpCnsKCXZlYzMgZCA9IHZlYzMoMSk7IHZlYzIgYyA9IHZlYzIoLTAuNzksMC4yKTsKCXZlYzIgeiA9ICgyLjAgKiBnbF9GcmFnQ29vcmQueHkgLSBpUmVzb2x1dGlvbi54eSkgLyBpUmVzb2x1dGlvbi54eCAqIFo7CglpZiAoTSkgeyBjID0gejsgeiA9IHZlYzIoMCk7IH0KCglmb3IoZmxvYXQgaT0wLjA7aTxOO2krPTEuMCkKCXsKCQl6ID0gdmVjMih6Lngqei54LXoueSp6LnksMi4wKnoueCp6LnkpK2M7CgkJaWYgKGxlbmd0aCh6KT4yLjApIHsgZCA9IHZlYzMoaS9OKTsgYnJlYWs7IH0KCX0KCQoJZ2xfRnJhZ0NvbG9yID0gdmVjNCgzLjAqZCp2ZWMzKGdsX0ZyYWdDb29yZC54eS9pUmVzb2x1dGlvbi54eSwxKSt2ZWMzKDAuMDcpLDEuMCk7Cn0=",
		"3D Raymarching": "I2RlZmluZSBTVEVQUyAxNgojZGVmaW5lIFBSRUNJU0lPTiAwLjAwMQojZGVmaW5lIERFUFRIIDUuMAoKdmVjMyBleWUgPSB2ZWMzKDAsMC41LC0xKTsKdmVjMyBsaWdodCA9IHZlYzMoMCwxLC0xKTsKCmZsb2F0IGJveCwgZ3JvdW5kOwpmbG9hdCB0ID0gaUdsb2JhbFRpbWU7CgpmbG9hdCB1ZEJveCh2ZWMzIHAsdmVjMyBiLGZsb2F0IHIpe3JldHVybiBsZW5ndGgobWF4KGFicyhwKS1iLDAuMCkpLXI7fQptYXQzIHJvdFkoZmxvYXQgYSl7ZmxvYXQgcz1zaW4oYSk7ZmxvYXQgYz1jb3MoYSk7cmV0dXJuIG1hdDMoYywwLC1zLDAsMSwwLHMsMCxjKTt9CgpmbG9hdCBzY2VuZSh2ZWMzIHApCnsJCglncm91bmQgPSBwLnkrMC41OwoJYm94ID0gdWRCb3gocCpyb3RZKHAueSo1LjApKnJvdFkodCksdmVjMygwLjEsMC4yLDAuMSksMC4wMyk7CgkKCWZsb2F0IGQgPSAxZTEwOwoJCglkID0gbWluKGQsIGdyb3VuZCk7CglkID0gbWluKGQsIGJveCk7CgkKCXJldHVybiBkOwp9Cgp2ZWMzIGdldE5vcm1hbCh2ZWMzIHApCnsKCXZlYzIgZSA9IHZlYzIoUFJFQ0lTSU9OLDApOwoJdmVjMyBuID0gbm9ybWFsaXplKHZlYzMoCgkJc2NlbmUocCtlLnh5eSkgLSBzY2VuZShwLWUueHl5KSwKCQlzY2VuZShwK2UueXh5KSAtIHNjZW5lKHAtZS55eHkpLAoJCXNjZW5lKHArZS55eXgpIC0gc2NlbmUocC1lLnl5eCkKCSkpOwoJCglyZXR1cm4gbjsKfQoKdmVjMyBwcm9jZXNzQ29sb3IodmVjMyBwKQp7CglmbG9hdCBkID0gMWUxMDsKCQoJdmVjMyBuID0gZ2V0Tm9ybWFsKHApOwoJdmVjMyBsID0gbm9ybWFsaXplKGxpZ2h0LXApOwoJdmVjMyBjb2w7CgkKCWZsb2F0IGRpc3QgPSBsZW5ndGgobGlnaHQtcCk7CglmbG9hdCBkaWZmID0gbWF4KGRvdChuLGwpLDAuMCk7CglmbG9hdCBzcGVjID0gcG93KGRpZmYsMTAwLjApOwoJCglpZiAoZ3JvdW5kPGQpe2NvbD12ZWMzKGRpZmYqMC41KTtkPWdyb3VuZDt9CglpZiAoYm94PGQpe2NvbD1uK2RpZmYrc3BlYzt9CgkKCWNvbCAqPSBtaW4oMS4wLDEuMC9kaXN0KTsKCQoJcmV0dXJuIGNvbDsKfQoKdmVjMyBsb29rQXQodmVjMyBvLCB2ZWMzIHQpCnsKCXZlYzIgdXYgPSAoMi4wICogZ2xfRnJhZ0Nvb3JkLnh5IC0gaVJlc29sdXRpb24ueHkpIC8gaVJlc29sdXRpb24ueHg7Cgl2ZWMzIGRpciA9IG5vcm1hbGl6ZSh0LW8pLCB1cCA9IHZlYzMoMCwxLDApLCByaWdodCA9IGNyb3NzKHVwLGRpcik7Cgl1cCA9IGNyb3NzKGRpcixyaWdodCk7CgkKCXJldHVybiBub3JtYWxpemUocmlnaHQqdXYueCArIHVwKnV2LnkgKyBkaXIpOwp9Cgp2ZWMzIG1hcmNoKHZlYzMgcm8sIHZlYzMgcmQpCnsKCXZlYzMgcDsgZmxvYXQgdD0wLjAsIGQ7CgkKCWZvciAoaW50IGk9MDtpPFNURVBTO2krKykKCXsKCQlkPXNjZW5lKHJvK3JkKnQpOwoJCWlmKGQ8UFJFQ0lTSU9OfHx0PkRFUFRIKXticmVhazt9CgkJdCs9ZDsKCX0KCQoJcmV0dXJuKHJvK3JkKnQpOwp9Cgp2b2lkIG1haW4oKQp7CQoJdmVjMyBwID0gbWFyY2goZXllLGxvb2tBdChleWUsdmVjMygwKSkpOwoJdmVjMyBjb2wgPSBwcm9jZXNzQ29sb3IocCk7CgoJZ2xfRnJhZ0NvbG9yID0gdmVjNChjb2wsMS4wKTsKfQ==",
		"3D Text": "I2RlZmluZSBTVEVQUyAxNgojZGVmaW5lIFBSRUNJU0lPTiAwLjAxCiNkZWZpbmUgREVQVEggNS4wCgp2ZWMzIGV5ZSA9IHZlYzMoMCwwLjUsLTEpKjMuMDsKdmVjMyBsaWdodCA9IHZlYzMoMCwxLC0xKTsKCmNvbnN0IGZsb2F0IGxpbmVXaWR0aCA9IDAuMDI7CmNvbnN0IGZsb2F0IGJvcmRlciA9IDAuMDU7CmNvbnN0IGZsb2F0IHNjYWxlID0gMC4wNzsKCmZsb2F0IGJvdW5kaW5nLCBncm91bmQsIGxldHRlcnM7CmNvbnN0IGZsb2F0IGdyb3VuZFBvc2l0aW9uID0gLTAuNTsKY29uc3QgdmVjMyBib3VuZGluZ1NpemUgPSB2ZWMzKDEwMCw4LDEpKnNjYWxlOwoKZmxvYXQgdCA9IGlHbG9iYWxUaW1lOwpmbG9hdCBzY2VuZSh2ZWMzKTsKCi8vIFV0aWxpdGllcwpmbG9hdCB1ZEJveCh2ZWMzIHAsIHZlYzMgcykgeyByZXR1cm4gbGVuZ3RoKG1heChhYnMocCktcywwLjApKTsgfQptYXQzIHJvdFkoZmxvYXQgYSl7ZmxvYXQgcz1zaW4oYSk7ZmxvYXQgYz1jb3MoYSk7cmV0dXJuIG1hdDMoYywwLC1zLDAsMSwwLHMsMCxjKTt9CgovLyBMZXR0ZXIgY29kZSAoaHR0cHM6Ly9kbC5kcm9wYm94dXNlcmNvbnRlbnQuY29tL3UvMTQ2NDU2NjQvZmlsZXMvZ2xzbC10ZXh0LnR4dCkKZmxvYXQgbGluZSh2ZWMyIHAsdmVjMiBzLHZlYzIgZSl7cyo9c2NhbGU7ZSo9c2NhbGU7ZmxvYXQgbD1sZW5ndGgocy1lKTt2ZWMyIGQ9dmVjMihlLXMpL2w7cC09dmVjMihzLngsLXMueSk7cD12ZWMyKHAueCpkLngrcC55Ki1kLnkscC54KmQueStwLnkqZC54KTtyZXR1cm4gbGVuZ3RoKG1heChhYnMocC12ZWMyKGwvMi4wLDApKS12ZWMyKGwvMi4wLGxpbmVXaWR0aC8yLjApLDAuMCkpLWJvcmRlcjt9CmZsb2F0IEEodmVjMiBwKXtmbG9hdCBkPTEuMDtkPW1pbihkLGxpbmUocCx2ZWMyKDEsOCksdmVjMigxLDEuNSkpKTtkPW1pbihkLGxpbmUocCx2ZWMyKDEsMS41KSx2ZWMyKDUsMS41KSkpO2Q9bWluKGQsbGluZShwLHZlYzIoNSwxLjUpLHZlYzIoNSw1KSkpO2Q9bWluKGQsbGluZShwLHZlYzIoNSw1KSx2ZWMyKDEsNSkpKTtkPW1pbihkLGxpbmUocCx2ZWMyKDEsNSksdmVjMig1LDUpKSk7ZD1taW4oZCxsaW5lKHAsdmVjMig1LDUpLHZlYzIoNSw4KSkpO3JldHVybiBkO31mbG9hdCBCKHZlYzIgcCl7ZmxvYXQgZD0xLjA7ZD1taW4oZCxsaW5lKHAsdmVjMig0LDUpLHZlYzIoNCwxLjUpKSk7ZD1taW4oZCxsaW5lKHAsdmVjMig0LDEuNSksdmVjMigxLDEuNSkpKTtkPW1pbihkLGxpbmUocCx2ZWMyKDEsMS41KSx2ZWMyKDEsOCkpKTtkPW1pbihkLGxpbmUocCx2ZWMyKDEsOCksdmVjMig1LDgpKSk7ZD1taW4oZCxsaW5lKHAsdmVjMig1LDgpLHZlYzIoNSw1KSkpO2Q9bWluKGQsbGluZShwLHZlYzIoNSw1KSx2ZWMyKDEsNSkpKTtyZXR1cm4gZDt9ZmxvYXQgQyh2ZWMyIHApe2Zsb2F0IGQ9MS4wO2Q9bWluKGQsbGluZShwLHZlYzIoNSwxLjUpLHZlYzIoMSwxLjUpKSk7ZD1taW4oZCxsaW5lKHAsdmVjMigxLDEuNSksdmVjMigxLDgpKSk7ZD1taW4oZCxsaW5lKHAsdmVjMigxLDgpLHZlYzIoNSw4KSkpO3JldHVybiBkO31mbG9hdCBEKHZlYzIgcCl7ZmxvYXQgZD0xLjA7ZD1taW4oZCxsaW5lKHAsdmVjMigxLDgpLHZlYzIoNCw4KSkpO2Q9bWluKGQsbGluZShwLHZlYzIoNCw4KSx2ZWMyKDQuNSw3LjUpKSk7ZD1taW4oZCxsaW5lKHAsdmVjMig0LjUsNy41KSx2ZWMyKDUsNi4yNSkpKTtkPW1pbihkLGxpbmUocCx2ZWMyKDUsNi4yNSksdmVjMig1LDMuNzUpKSk7ZD1taW4oZCxsaW5lKHAsdmVjMig1LDMuNzUpLHZlYzIoNC41LDIpKSk7ZD1taW4oZCxsaW5lKHAsdmVjMig0LjUsMiksdmVjMig0LDEuNSkpKTtkPW1pbihkLGxpbmUocCx2ZWMyKDQsMS41KSx2ZWMyKDEsMS41KSkpO2Q9bWluKGQsbGluZShwLHZlYzIoMSwxLjUpLHZlYzIoMSw4KSkpO3JldHVybiBkO31mbG9hdCBFKHZlYzIgcCl7ZmxvYXQgZD0xLjA7ZD1taW4oZCxsaW5lKHAsdmVjMig1LDEuNSksdmVjMigxLDEuNSkpKTtkPW1pbihkLGxpbmUocCx2ZWMyKDEsMS41KSx2ZWMyKDEsNSkpKTtkPW1pbihkLGxpbmUocCx2ZWMyKDEsNSksdmVjMigzLDUpKSk7ZD1taW4oZCxsaW5lKHAsdmVjMigzLDUpLHZlYzIoMSw1KSkpO2Q9bWluKGQsbGluZShwLHZlYzIoMSw1KSx2ZWMyKDEsOCkpKTtkPW1pbihkLGxpbmUocCx2ZWMyKDEsOCksdmVjMig1LDgpKSk7cmV0dXJuIGQ7fWZsb2F0IEYodmVjMiBwKXtmbG9hdCBkPTEuMDtkPW1pbihkLGxpbmUocCx2ZWMyKDUsMS41KSx2ZWMyKDEsMS41KSkpO2Q9bWluKGQsbGluZShwLHZlYzIoMSwxLjUpLHZlYzIoMSw1KSkpO2Q9bWluKGQsbGluZShwLHZlYzIoMSw1KSx2ZWMyKDMsNSkpKTtkPW1pbihkLGxpbmUocCx2ZWMyKDMsNSksdmVjMigxLDUpKSk7ZD1taW4oZCxsaW5lKHAsdmVjMigxLDUpLHZlYzIoMSw4KSkpO3JldHVybiBkO31mbG9hdCBHKHZlYzIgcCl7ZmxvYXQgZD0xLjA7ZD1taW4oZCxsaW5lKHAsdmVjMig1LDIuNSksdmVjMig1LDEuNSkpKTtkPW1pbihkLGxpbmUocCx2ZWMyKDUsMS41KSx2ZWMyKDEsMS41KSkpO2Q9bWluKGQsbGluZShwLHZlYzIoMSwxLjUpLHZlYzIoMSw4KSkpO2Q9bWluKGQsbGluZShwLHZlYzIoMSw4KSx2ZWMyKDUsOCkpKTtkPW1pbihkLGxpbmUocCx2ZWMyKDUsOCksdmVjMig1LDUpKSk7ZD1taW4oZCxsaW5lKHAsdmVjMig1LDUpLHZlYzIoMy41LDUpKSk7cmV0dXJuIGQ7fWZsb2F0IEgodmVjMiBwKXtmbG9hdCBkPTEuMDtkPW1pbihkLGxpbmUocCx2ZWMyKDEsMS41KSx2ZWMyKDEsOCkpKTtkPW1pbihkLGxpbmUocCx2ZWMyKDEsOCksdmVjMigxLDUpKSk7ZD1taW4oZCxsaW5lKHAsdmVjMigxLDUpLHZlYzIoNSw1KSkpO2Q9bWluKGQsbGluZShwLHZlYzIoNSw1KSx2ZWMyKDUsMS41KSkpO2Q9bWluKGQsbGluZShwLHZlYzIoNSwxLjUpLHZlYzIoNSw4KSkpO3JldHVybiBkO31mbG9hdCBJKHZlYzIgcCl7ZmxvYXQgZD0xLjA7ZD1taW4oZCxsaW5lKHAsdmVjMigxLjUsMS41KSx2ZWMyKDQuNSwxLjUpKSk7ZD1taW4oZCxsaW5lKHAsdmVjMig0LjUsMS41KSx2ZWMyKDMsMS41KSkpO2Q9bWluKGQsbGluZShwLHZlYzIoMywxLjUpLHZlYzIoMyw4KSkpO2Q9bWluKGQsbGluZShwLHZlYzIoMyw4KSx2ZWMyKDEuNSw4KSkpO2Q9bWluKGQsbGluZShwLHZlYzIoMS41LDgpLHZlYzIoNC41LDgpKSk7cmV0dXJuIGQ7fWZsb2F0IEoodmVjMiBwKXtmbG9hdCBkPTEuMDtkPW1pbihkLGxpbmUocCx2ZWMyKDEuNSw4KSx2ZWMyKDMsOCkpKTtkPW1pbihkLGxpbmUocCx2ZWMyKDMsOCksdmVjMig0LDcpKSk7ZD1taW4oZCxsaW5lKHAsdmVjMig0LDcpLHZlYzIoNCwxLjUpKSk7ZD1taW4oZCxsaW5lKHAsdmVjMig0LDEuNSksdmVjMigxLjUsMS41KSkpO3JldHVybiBkO31mbG9hdCBLKHZlYzIgcCl7ZmxvYXQgZD0xLjA7ZD1taW4oZCxsaW5lKHAsdmVjMigxLDEuNSksdmVjMigxLDgpKSk7ZD1taW4oZCxsaW5lKHAsdmVjMigxLDgpLHZlYzIoMSw1KSkpO2Q9bWluKGQsbGluZShwLHZlYzIoMSw1KSx2ZWMyKDIuNSw1KSkpO2Q9bWluKGQsbGluZShwLHZlYzIoMi41LDUpLHZlYzIoNSwxLjUpKSk7ZD1taW4oZCxsaW5lKHAsdmVjMig1LDEuNSksdmVjMigyLjUsNSkpKTtkPW1pbihkLGxpbmUocCx2ZWMyKDIuNSw1KSx2ZWMyKDUsOCkpKTtyZXR1cm4gZDt9ZmxvYXQgTCh2ZWMyIHApe2Zsb2F0IGQ9MS4wO2Q9bWluKGQsbGluZShwLHZlYzIoMSwxLjUpLHZlYzIoMSw4KSkpO2Q9bWluKGQsbGluZShwLHZlYzIoMSw4KSx2ZWMyKDUsOCkpKTtyZXR1cm4gZDt9ZmxvYXQgTSh2ZWMyIHApe2Zsb2F0IGQ9MS4wO2Q9bWluKGQsbGluZShwLHZlYzIoMSw4KSx2ZWMyKDEsMS41KSkpO2Q9bWluKGQsbGluZShwLHZlYzIoMSwxLjUpLHZlYzIoMyw0KSkpO2Q9bWluKGQsbGluZShwLHZlYzIoMyw0KSx2ZWMyKDUsMS41KSkpO2Q9bWluKGQsbGluZShwLHZlYzIoNSwxLjUpLHZlYzIoNSw4KSkpO3JldHVybiBkO31mbG9hdCBOKHZlYzIgcCl7ZmxvYXQgZD0xLjA7ZD1taW4oZCxsaW5lKHAsdmVjMigxLDgpLHZlYzIoMSwxLjUpKSk7ZD1taW4oZCxsaW5lKHAsdmVjMigxLDEuNSksdmVjMig1LDgpKSk7ZD1taW4oZCxsaW5lKHAsdmVjMig1LDgpLHZlYzIoNSwxLjUpKSk7cmV0dXJuIGQ7fWZsb2F0IE8odmVjMiBwKXtmbG9hdCBkPTEuMDtkPW1pbihkLGxpbmUocCx2ZWMyKDUsMS41KSx2ZWMyKDEsMS41KSkpO2Q9bWluKGQsbGluZShwLHZlYzIoMSwxLjUpLHZlYzIoMSw4KSkpO2Q9bWluKGQsbGluZShwLHZlYzIoMSw4KSx2ZWMyKDUsOCkpKTtkPW1pbihkLGxpbmUocCx2ZWMyKDUsOCksdmVjMig1LDEuNSkpKTtyZXR1cm4gZDt9ZmxvYXQgUCh2ZWMyIHApe2Zsb2F0IGQ9MS4wO2Q9bWluKGQsbGluZShwLHZlYzIoMSw4KSx2ZWMyKDEsMS41KSkpO2Q9bWluKGQsbGluZShwLHZlYzIoMSwxLjUpLHZlYzIoNSwxLjUpKSk7ZD1taW4oZCxsaW5lKHAsdmVjMig1LDEuNSksdmVjMig1LDUpKSk7ZD1taW4oZCxsaW5lKHAsdmVjMig1LDUpLHZlYzIoMSw1KSkpO3JldHVybiBkO31mbG9hdCBRKHZlYzIgcCl7ZmxvYXQgZD0xLjA7ZD1taW4oZCxsaW5lKHAsdmVjMig1LDgpLHZlYzIoNSwxLjUpKSk7ZD1taW4oZCxsaW5lKHAsdmVjMig1LDEuNSksdmVjMigxLDEuNSkpKTtkPW1pbihkLGxpbmUocCx2ZWMyKDEsMS41KSx2ZWMyKDEsOCkpKTtkPW1pbihkLGxpbmUocCx2ZWMyKDEsOCksdmVjMig1LDgpKSk7ZD1taW4oZCxsaW5lKHAsdmVjMig1LDgpLHZlYzIoMy41LDYuNSkpKTtyZXR1cm4gZDt9ZmxvYXQgUih2ZWMyIHApe2Zsb2F0IGQ9MS4wO2Q9bWluKGQsbGluZShwLHZlYzIoMSw4KSx2ZWMyKDEsMS41KSkpO2Q9bWluKGQsbGluZShwLHZlYzIoMSwxLjUpLHZlYzIoNSwxLjUpKSk7ZD1taW4oZCxsaW5lKHAsdmVjMig1LDEuNSksdmVjMig1LDUpKSk7ZD1taW4oZCxsaW5lKHAsdmVjMig1LDUpLHZlYzIoMSw1KSkpO2Q9bWluKGQsbGluZShwLHZlYzIoMSw1KSx2ZWMyKDMuNSw1KSkpO2Q9bWluKGQsbGluZShwLHZlYzIoMy41LDUpLHZlYzIoNSw4KSkpO3JldHVybiBkO31mbG9hdCBTKHZlYzIgcCl7ZmxvYXQgZD0xLjA7ZD1taW4oZCxsaW5lKHAsdmVjMig1LDEuNSksdmVjMigxLDEuNSkpKTtkPW1pbihkLGxpbmUocCx2ZWMyKDEsMS41KSx2ZWMyKDEsNSkpKTtkPW1pbihkLGxpbmUocCx2ZWMyKDEsNSksdmVjMig1LDUpKSk7ZD1taW4oZCxsaW5lKHAsdmVjMig1LDUpLHZlYzIoNSw4KSkpO2Q9bWluKGQsbGluZShwLHZlYzIoNSw4KSx2ZWMyKDEsOCkpKTtyZXR1cm4gZDt9ZmxvYXQgVCh2ZWMyIHApe2Zsb2F0IGQ9MS4wO2Q9bWluKGQsbGluZShwLHZlYzIoMyw4KSx2ZWMyKDMsMS41KSkpO2Q9bWluKGQsbGluZShwLHZlYzIoMywxLjUpLHZlYzIoMSwxLjUpKSk7ZD1taW4oZCxsaW5lKHAsdmVjMigxLDEuNSksdmVjMig1LDEuNSkpKTtyZXR1cm4gZDt9ZmxvYXQgVSh2ZWMyIHApe2Zsb2F0IGQ9MS4wO2Q9bWluKGQsbGluZShwLHZlYzIoMSwxLjUpLHZlYzIoMSw4KSkpO2Q9bWluKGQsbGluZShwLHZlYzIoMSw4KSx2ZWMyKDUsOCkpKTtkPW1pbihkLGxpbmUocCx2ZWMyKDUsOCksdmVjMig1LDEuNSkpKTtyZXR1cm4gZDt9ZmxvYXQgVih2ZWMyIHApe2Zsb2F0IGQ9MS4wO2Q9bWluKGQsbGluZShwLHZlYzIoMSwxLjUpLHZlYzIoMyw4KSkpO2Q9bWluKGQsbGluZShwLHZlYzIoMyw4KSx2ZWMyKDUsMS41KSkpO3JldHVybiBkO31mbG9hdCBXKHZlYzIgcCl7ZmxvYXQgZD0xLjA7ZD1taW4oZCxsaW5lKHAsdmVjMigxLDEuNSksdmVjMigxLDgpKSk7ZD1taW4oZCxsaW5lKHAsdmVjMigxLDgpLHZlYzIoMyw2KSkpO2Q9bWluKGQsbGluZShwLHZlYzIoMyw2KSx2ZWMyKDUsOCkpKTtkPW1pbihkLGxpbmUocCx2ZWMyKDUsOCksdmVjMig1LDEuNSkpKTtyZXR1cm4gZDt9ZmxvYXQgWCh2ZWMyIHApe2Zsb2F0IGQ9MS4wO2Q9bWluKGQsbGluZShwLHZlYzIoMSwxLjUpLHZlYzIoNSw4KSkpO2Q9bWluKGQsbGluZShwLHZlYzIoNSw4KSx2ZWMyKDMsNC43NSkpKTtkPW1pbihkLGxpbmUocCx2ZWMyKDMsNC43NSksdmVjMig1LDEuNSkpKTtkPW1pbihkLGxpbmUocCx2ZWMyKDUsMS41KSx2ZWMyKDEsOCkpKTtyZXR1cm4gZDt9ZmxvYXQgWSh2ZWMyIHApe2Zsb2F0IGQ9MS4wO2Q9bWluKGQsbGluZShwLHZlYzIoMSwxLjUpLHZlYzIoMyw1KSkpO2Q9bWluKGQsbGluZShwLHZlYzIoMyw1KSx2ZWMyKDMsOCkpKTtkPW1pbihkLGxpbmUocCx2ZWMyKDMsOCksdmVjMigzLDUpKSk7ZD1taW4oZCxsaW5lKHAsdmVjMigzLDUpLHZlYzIoNSwxLjUpKSk7cmV0dXJuIGQ7fWZsb2F0IFoodmVjMiBwKXtmbG9hdCBkPTEuMDtkPW1pbihkLGxpbmUocCx2ZWMyKDEsMS41KSx2ZWMyKDUsMS41KSkpO2Q9bWluKGQsbGluZShwLHZlYzIoNSwxLjUpLHZlYzIoMyw1KSkpO2Q9bWluKGQsbGluZShwLHZlYzIoMyw1KSx2ZWMyKDEuNSw1KSkpO2Q9bWluKGQsbGluZShwLHZlYzIoMS41LDUpLHZlYzIoNC41LDUpKSk7ZD1taW4oZCxsaW5lKHAsdmVjMig0LjUsNSksdmVjMigzLDUpKSk7ZD1taW4oZCxsaW5lKHAsdmVjMigzLDUpLHZlYzIoMSw4KSkpO2Q9bWluKGQsbGluZShwLHZlYzIoMSw4KSx2ZWMyKDUsOCkpKTtyZXR1cm4gZDt9CgovLyBNYXJjaGluZwp2ZWMzIGdldE5vcm1hbCh2ZWMzIHApe3ZlYzIgZT12ZWMyKFBSRUNJU0lPTiwwKTtyZXR1cm4obm9ybWFsaXplKHZlYzMoc2NlbmUocCtlLnh5eSktc2NlbmUocC1lLnh5eSksc2NlbmUocCtlLnl4eSktc2NlbmUocC1lLnl4eSksc2NlbmUocCtlLnl5eCktc2NlbmUocC1lLnl5eCkpKSk7fQp2ZWMzIG1hcmNoKHZlYzMgcm8sdmVjMyByZCl7ZmxvYXQgdD0wLjAsZDtmb3IoaW50IGk9MDtpPFNURVBTO2krKyl7ZD1zY2VuZShybytyZCp0KTtpZihkPFBSRUNJU0lPTnx8dD5ERVBUSCl7YnJlYWs7fXQrPWQ7fXJldHVybihybytyZCp0KTt9CnZlYzMgbG9va0F0KHZlYzMgbyx2ZWMzIHQpe3ZlYzIgdXY9KDIuMCpnbF9GcmFnQ29vcmQueHktaVJlc29sdXRpb24ueHkpL2lSZXNvbHV0aW9uLnh4O3ZlYzMgZD1ub3JtYWxpemUodC1vKSx1PXZlYzMoMCwxLDApLHI9Y3Jvc3ModSxkKTtyZXR1cm4obm9ybWFsaXplKHIqdXYueCtjcm9zcyhkLHIpKnV2LnkrZCkpO30KCnZlYzMgcHJvY2Vzc0NvbG9yKHZlYzMgcCkKewoJZmxvYXQgZCA9IDFlMTA7CgkKCXZlYzMgbiA9IGdldE5vcm1hbChwKTsKCXZlYzMgbCA9IG5vcm1hbGl6ZShsaWdodC1wKTsKCXZlYzMgY29sOwoJCglmbG9hdCBkaXN0ID0gbGVuZ3RoKGxpZ2h0LXApOwoJZmxvYXQgZGlmZiA9IG1heChkb3Qobiwgbm9ybWFsaXplKGxpZ2h0LXApKSwwLjApOwoJZmxvYXQgc3BlYyA9IHBvdyhkaWZmLCAxMDAuMCk7CgkKCWlmIChncm91bmQ8ZCkgeyBjb2wgPSB2ZWMzKGRpZmYrc3BlYyowLjMpKnZlYzMoMC4zLDAuMywwLjYpOyBkID0gZ3JvdW5kOyB9CglpZiAobGV0dGVyczxkKSB7IGNvbCA9IHZlYzMoMCxwLnkqMC41KzAuNSwxKStkaWZmK3NwZWM7IH0KCQkKCWNvbCAqPSBtaW4oMS4wLCAxLjAvZGlzdCk7CgkKCXJldHVybiBjb2w7Cn0KCmZsb2F0IHNjZW5lKHZlYzMgcCkKewkKCXAueCAtPSAwLjU7CgkKCWdyb3VuZCAgID0gcC55LWdyb3VuZFBvc2l0aW9uOwoJYm91bmRpbmcgPSB1ZEJveChwLGJvdW5kaW5nU2l6ZSk7CiAJbGV0dGVycyAgPSAxZTEwOwoJCglmbG9hdCBkID0gMWUxMDsKCQoJbGV0dGVycyA9IG1pbihsZXR0ZXJzLEQocC54eS12ZWMyKC0yLjAsMC41KSkpOwoJbGV0dGVycyA9IG1pbihsZXR0ZXJzLEUocC54eS12ZWMyKC0xLjUsMC41KSkpOwoJbGV0dGVycyA9IG1pbihsZXR0ZXJzLE0ocC54eS12ZWMyKC0xLjAsMC41KSkpOwoJbGV0dGVycyA9IG1pbihsZXR0ZXJzLE8ocC54eS12ZWMyKC0wLjUsMC41KSkpOwoJbGV0dGVycyA9IG1pbihsZXR0ZXJzLEIocC54eS12ZWMyKCAwLjAsMC41KSkpOwoJbGV0dGVycyA9IG1pbihsZXR0ZXJzLE8ocC54eS12ZWMyKCAwLjUsMC41KSkpOwoJbGV0dGVycyA9IG1pbihsZXR0ZXJzLFgocC54eS12ZWMyKCAxLjAsMC41KSkpOwoJCglsZXR0ZXJzID0gbWF4KGJvdW5kaW5nLCBsZXR0ZXJzKTsKCQoJZCA9IG1pbihkLCBncm91bmQpOwoJZCA9IG1pbihkLCBsZXR0ZXJzKTsKCQoJcmV0dXJuIGQ7Cn0KCnZvaWQgbWFpbigpCnsJCglleWUgKj0gcm90WShzaW4odCkqMC41KTsKCWxpZ2h0LnggPSBzaW4odCk7CgoJdmVjMyBwID0gbWFyY2goZXllLGxvb2tBdChleWUsdmVjMygwKSkpOwoJdmVjMyBjb2wgPSBwcm9jZXNzQ29sb3IocCk7CgoJZ2xfRnJhZ0NvbG9yID0gdmVjNChjb2wsMS4wKTsKfQ=="
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
			Shader.canvasSetup();

			// Register event-listeners
			$run.addEventListener("click", Shader.compile, false);
			$play.addEventListener("click", Shader.togglePlayback, false);
			$reset.addEventListener("click", Shader.reset, false);
			$fullscreen.addEventListener("click", Shader.toggleFullscreen, false);
			$examples.addEventListener("change", Shader.loadExample, false);
			window.addEventListener("resize", Shader.canvasSetup, false);
		},

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
			Shader.iFrequency  = gl.getUniformLocation(program, "iFrequency");
			Shader.iSync       = gl.getUniformLocation(program, "iSync");

			// Setup rectangle vertices
			gl.bindBuffer(gl.ARRAY_BUFFER, Shader.bfr);
			gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1.0,-1.0,1.0,-1.0,-1.0,1.0,1.0,-1.0,1.0,1.0,-1.0,1.0]), gl.STATIC_DRAW);
			gl.enableVertexAttribArray(Shader.bfr);

			// Prefill iFrequency array
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

		render: function() {

			Shader.animationRequest = !Shader.pause && window.requestAnimationFrame(Shader.render);
			Shader.time = (new Date().getTime() - Shader.playTime) / 1000;

			gl.uniform1f(Shader.iGlobalTime, Shader.time);
			gl.vertexAttribPointer(Shader.aPos, 2, gl.FLOAT, false, 0, 0);
			gl.drawArrays(gl.TRIANGLES, 0, 6);

			Shader.fps = Shader.getFPS();
		},

		getFPS: function() {

			var interval = (new Date().getTime()-Shader.fpsStartTime)/1000;

			if (interval>1) {
				Shader.fpsStartTime = new Date().getTime();
				Shader.frameNumber = 0;
			}

			return Math.min(Math.floor(++Shader.frameNumber/interval),60);
		},

		canvasSetup: function() {

			// Update with and height
			gl.canvas.width = Shader.isFullscreen ? window.innerWidth : $view.offsetWidth;
			gl.canvas.height = Shader.isFullscreen ? window.innerHeight : $view.offsetHeight;

			// Update uniform and viewport
			gl.uniform2f(Shader.iResolution, gl.canvas.width, gl.canvas.height);
			gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);

			Shader.render();
		},

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

		reset: function() {
			$time.innerHTML = "0.00";
			if (Shader.pause){ Shader.playTime = Shader.pauseTime = 0; }
			else { Shader.playTime = new Date().getTime(); }
		},

		error: function(e) {
			$codeView.className += " error";
		},

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

		updateInfo: function() {
			$time.innerHTML = Shader.time.toFixed(2);
			$fps.innerHTML = (Shader.fps<9?"0"+Shader.fps:Shader.fps) + " FPS";
		},

		loadExample: function(str) {
			var which = typeof str == "string" ? str : $examples.value;
			if (!examples[which]) { which = "Choose Example"; }

			Shader.Editor.setValue(atob(examples[which]));
			Shader.Editor.gotoLine(0);

			Shader.togglePlayback(false);
			Shader.compile();
		},

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
		}
	};

}(window.Demo || (window.Demo = {}), window));