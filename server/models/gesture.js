const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const gestureSchema = new Schema({
    name: String,
    subject: Number,
    date: String,
    strokes: [[{
        x: Number,
        y: Number,
        z: Number,
        w: Number,
        alpha: Number,
        beta: Number,
        gamma: Number,
        t: Number,
        strokeId: Number
    }]],
    device: {
        os_browser_info: String,
        resolution_height: Number,
        resolution_width: Number,
        window_height: Number,
        window_width: Number,
        pixel_ratio: Number,
        mouse: { type: Boolean, default: false },
        pen: { type: Boolean, default: false },
        finger: { type: Boolean, default: false },
        acceleration: { type: Boolean, default: false },
        webcam: { type: Boolean, default: false }
    }    
});

const Gesture = mongoose.model('gesture', gestureSchema);
module.exports = Gesture;

// examples
/*
    {
    "name": "circle",
    "subject": 0,
    "date": "07032020-134427",      DDMMYYYY-HHMMSS
    "strokes": [[{
        "x": 25,
        "y": 26,
        "z": null,
        "w": null,
        "alpha": null,
        "beta": null,
        "gamma": null,
        "t": 1583585307883,         exprimé en millisecondes (format utilisé par Date.now() ou performance.now() en JS)
        "strokeId": 0
    }]],
    "device": {
        "os_browser_info": "5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3987.132 Safari/537.36",
        "resolution_height": 760,
        "resolution_width": 360,
        "window_height": 631,
        "window_width": 360,
        "pixel_ratio": 3,
        "mouse": true,
        "pen": false,
        "finger": false,
        "acceleration": false,
        "webcam": false
    }
}

{
    "name": "i",
    "subject": 0,
    "date": "07032020-134427",
    "strokes": [
        [
            {
                "x": 25,
                "y": 26,
                "z": null,
                "w": null,
                "alpha": null,
                "beta": null,
                "gamma": null,
                "t": 1583585307883,
                "strokeId": 0
            },
            {
                "x": 35,
                "y": 39,
                "z": null,
                "w": null,
                "alpha": null,
                "beta": null,
                "gamma": null,
                "t": 1583585307885,
                "strokeId": 0
            }
        ],
        [
            {
                "x": 35,
                "y": 39,
                "z": null,
                "w": null,
                "alpha": null,
                "beta": null,
                "gamma": null,
                "t": 1583585307885,
                "strokeId": 1
            }
        ]
    ],
    "device": {
        "os_browser_info": "5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3987.132 Safari/537.36",
        "resolution_height": 760,
        "resolution_width": 360,
        "window_height": 631,
        "window_width": 360,
        "pixel_ratio": 3,
        "mouse": true,
        "pen": false,
        "finger": false,
        "acceleration": false,
        "webcam": false
    }
}
*/