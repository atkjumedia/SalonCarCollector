
var texts= {
	"conerr": {"de-CH": "Bitte überprüfen Sie die Internetverbindung!",
			 "fr-CH": "Merci de vérifier votre connexion Internet!",
			 "it-CH": "Controllare la connessione Internet!"},
}

var app = {
    // Application Constructor
	lang: "",
	percent: -1,
	firstTime: true,
	progressToaster: 0,
    $this:null,

    initialize: function() {
        $this = this;
		this.lang = navigator.language.slice(0,2);
	
		if (this.lang == "de" || this.lang == "it" || this.lang == "fr")
			this.lang = this.lang + "-CH";
		else 
			this.lang = "fr-CH";
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
        document.addEventListener("online", this.onOnline, false);
	},

    onDeviceReady: function() {
		 if (navigator.connection.type == Connection.NONE) {
              navigator.notification.alert(texts.connerr[$this.lang]);
            } else {
               $this.onOnline();
        }
    },
    onOnline : function() {
        navigator.splashscreen.hide();
        //document.location="http://ch-co2tieferlegen.preview.kju.at/co2tl_app/index.html?disableauth=1";
        var assets = window.location.toString().split('/').slice(0,-2).join('/');
        document.getElementById('url').value = "http://192.168.1.42:59595/co2tl_app/index.html?assets=" + encodeURIComponent(assets);
        document.getElementById('go').onclick=function() {
         document.location = document.getElementById('url').value
        }
    }

}


app.initialize();




