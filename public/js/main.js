const socket = new io();

socket.on('message', message => {
    console.log(message);
});

const notifyBlur = () => {
    socket.emit('blurEvent', 'user inactive');    
}

// Set the name of the hidden property and the change event for visibility depending on browser
// Uses HTML5 visibility API
let hidden, visibilityChange;

if (typeof document.hidden !== "undefined") { // Opera 12.10 and Firefox 18 and later support
    hidden = "hidden";
    visibilityChange = "visibilitychange";
} else if (typeof document.msHidden !== "undefined") {
    hidden = "msHidden";
    visibilityChange = "msvisibilitychange";
} else if (typeof document.webkitHidden !== "undefined") {
    hidden = "webkitHidden";
    visibilityChange = "webkitvisibilitychange";
}

const handleVisibilityChange = () => {
    if (document[hidden]) {
        notifyBlur();
    }
}

// visibility change event
document.addEventListener(visibilityChange, handleVisibilityChange, false);