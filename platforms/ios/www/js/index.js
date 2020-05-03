
var app = {
    // Application Constructor
    initialize: function () {

        // DeviceReady method
        document.addEventListener('deviceready', this.loadToDoList.bind(this), false);

        //when user moves to other app
        document.addEventListener('pause', this.loadToDoList.bind(this), false);

        // when user reopens the app method
        document.addEventListener('resume', this.loadToDoList.bind(this), false);

    },


    loadToDoList: function () {


    },


};

app.initialize();