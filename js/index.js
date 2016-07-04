/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        app.receivedEvent('deviceready');
    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {
        try {
            alert(idnotify);
            alert('idnotify non');
          var idnotify = localStorage.idnotify;
          if (idnotify == null || idnotify == "" || idnotify == undefined){
              var pushNotification = window.plugins.pushNotification;
              alert(pushNotification);
              alert("Register called Android");
              pushNotification.register(this.successHandler,this.errorHandler,{"senderID":"508191947380","ecb":"app.onNotificationGCM"});
          }
        }catch(err) {
            alert(err);
        }
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);
    },
    errorHandler: function(e) {
    },
    onNotificationGCM: function(e) {
        try {
        alert(e);
        switch( e.event ) {
            case 'registered':
            try {
            alert(e);
            if ( e.regid.length > 0 ) {

                    localStorage.idnotify = e.regid;
                    var notification = localStorage.notify;
                    if (notification == null || notification == "" || notification == 'si' || notification == undefined){
                      var request = new XMLHttpRequest();
                      request.open("GET", "http://www.wai-news.com/index.php?option=com_jbackend&view=request&action=put&module=push&resource=register&token=" + e.regid + "&appcode=nms.wai.001&platform=android",
                      true);
                      request.send();
                    }

            }
            }catch(err) {
                    alert(err);
                }
            break;
            case 'message':
            var pushNotification = window.plugins.pushNotification;
            try {
                var title = '';
                var idioma = localStorage.idioma;
                if (idioma == 'es'){
                    title = 'Notificación';
                } else if (idioma == 'pt'){
                    title = 'Notificação';
                } else {
                    title = 'Notification';
                }
                navigator.notification.alert(e.payload.message, null, e.payload.title != '' ? e.payload.title : title, 'OK');
                if (e.payload.sound) {
                    var snd = new Media(e.payload.sound);
                    snd.play();
                }
                if (e.payload.badge){
                    pushNotification.setApplicationIconBadgeNumber(this.successBadge, this.errorHandler, e.payload.badge);
                }

            }catch(err) {
                alert(err);
            }
            break;
            case 'error':
            alert('GCM error = '+e.msg);
            break;
            default:
            alert('An unknown GCM event has occurred');
            break;
        }
        }catch(err) {
                    alert(err);
                }
    }
};
