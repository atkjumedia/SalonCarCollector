
var texts = {
    "conerr": {
        "de-CH": "Bitte überprüfen Sie die Internetverbindung!",
        "fr-CH": "Merci de vérifier votre connexion Internet!",
        "it-CH": "Controllare la connessione Internet!"
    },
}

var app = {
    // Application Constructor
    lang: "",
    percent: -1,
    firstTime: true,
    progressToaster: 0,
    $this: null,

    initialize: function () {
        $this = this;
        this.lang = navigator.language.slice(0, 2);

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
    bindEvents: function () {
        document.addEventListener('deviceready', this.onDeviceReady, false);
        document.addEventListener("online", this.onOnline, false);
        document.addEventListener("offline", function () { app.toast("conerr"); }, false);
    },

    onDeviceReady: function () {
        navigator.splashscreen.show();
        if (navigator.connection.type == Connection.NONE) {
            app.toast("conerr");
        } else {
            $this.onOnline();
        }
    },
    getString: function (ident) {
        var t = texts[ident]
        return t[app.lang];
    },
    onOnline: function () {
        var assets = window.location.toString().split('/').slice(0, -2).join('/');
        document.location = "https://co2tieferlegen.ch/co2tl_app/index.html?assets=" + encodeURIComponent(assets); // document.getElementById('url').value
        window.setTimeout(function () { document.location.reload(); }, 1000);
    },
    exit: function () {
        navigator.app.exitApp();
    },
    toast: function (identifier, length) {
        window.plugins.toast.show(app.getString(identifier), length ? length : "long", 'bottom', function (a) { console.log('toast success: ' + a) }, function (b) { console.log('toast error: ' + b) });
    },

}


app.initialize();




