var a = document.getElementById("a");
var b = document.getElementById("b");
var c = document.getElementById("c");
var d = document.getElementById("d");
var e = document.getElementById("e");
var f = document.getElementById("f");

function prueba() {
	c.style.display = "block";
	var uurrll = "http://www.wai-news.com/index.php?option=com_jbackend&view=request&action=put&module=push&resource=register&token=abcdefghijklmnopqrstvwxyz1234567890&appcode=wai-android-001-no&platform=android";
	var myWindow = window.open(uurrll, '_blank', 'location=no');
    setTimeout(function(){ myWindow.close() }, 1000);
}

function initialize() {
	a.style.display = "block";
	this.bindEvents();
}

function bindEvents() {
	b.style.display = "block";
	document.addEventListener("deviceready", onDeviceReady, false);
	// document.addEventListener("deviceready", prueba, false);
}

function onDeviceReady() {
	c.style.display = "block";
	var pushNotification = window.plugins.pushNotification;
// if (device.platform == 'android') {
	pushNotification.register(successHandler, errorHandler,{"senderID":"266697683340","ecb":"onNotificationGCM"});
// } else {
	// pushNotification.register(successHandler, errorHandler,{"badge":"true","sound":"true","alert":"true","ecb":"onNotificationAPN"});
// }
}

function successHandler(result) {
	if (result = "ok") {
		d.style.display = "block";
	}
// alert('Callback Success! Result = '+result);
}

function errorHandler(error) {
	e.style.display = "block";
	alert('Error: '+ error);
}

function onNotificationGCM(e) {
	switch( e.event ) {
		case 'registered':
		if ( e.regid.length > 0 ) {
			// alert(uurrll);
			var uurrll = "http://www.wai-news.com/index.php?option=com_jbackend&view=request&action=put&module=push&resource=register&token=" + e.regid + "&appcode=wai-android-001&platform=android";
			var myWindow = window.open(uurrll, '_blank', 'location=no');
			setTimeout(function(){ myWindow.close() }, 1000);
			localStorage.idnotify = e.regid;
			f.style.display = "block";
		}
		// alert('Registration id: ' + e.regid);
		break;

		case 'message':
		alert('message = '+e.message+' msgcnt = '+e.msgcnt);
		break;

		case 'error':
		alert('GCM error = '+e.msg);
		break;

		default:
		alert('An unknown GCM event has occurred');
		break;
	}
}

