
class Gesture {
    constructor(name, subject, strokes, device) {
        this.name = name;
        this.subject = subject;
        this.date = this.currentDateTime(); // format: DDMMYYYY-HHMMSS
        this.strokes = strokes;
        this.device = device;
    }

    currentDateTime() {
        let today = new Date();
        let date = String(today.getDate()).padStart(2, '0') + String(today.getMonth() + 1).padStart(2, '0') + String(today.getFullYear());
        let time = String(today.getHours()).padStart(2, '0') + String(today.getMinutes()).padStart(2, '0') + String(today.getSeconds()).padStart(2, '0');
        return `${date}-${time}`;
    }    
}

class Device {
    constructor(window_height, window_width){
        this.os_browser_info = navigator.appVersion;
        this.resolution_height = screen.height;
        this.resolution_width = screen.width;
        this.window_height = window_height;
        this.window_width = window_width;
        this.pixel_ratio = devicePixelRatio;
    }    
}

class Point {
    constructor(strokeId, t, x, y, z=null, w=null, alpha=null, beta=null, gamma=null){
        this.strokeId = strokeId;
        this.t = t;        
        this.x = x;
        this.y = y;        
        this.z = z;
        this.w = w;
        this.alpha = alpha;
        this.beta = beta;
        this.gamma = gamma;
    }
}



//     name: String,
//     subject: Number,
//     date: String,   DDMMYYYY-HHMMSS
//     strokes: [[{
//         x: Number,
//         y: Number,
//         z: Number,
//         w: Number,
//         alpha: Number,
//         beta: Number,
//         gamma: Number,
//         t: Number,
//         strokeId: Number
//     }]],
//     device: {
//         os_browser_info: String,
//         resolution_height: Number,
//         resolution_width: Number,
//         window_height: Number,
//         window_width: Number,
//         pixel_ratio: Number,
//         mouse: { type: Boolean, default: false },
//         pen: { type: Boolean, default: false },
//         finger: { type: Boolean, default: false },
//         acceleration: { type: Boolean, default: false },
//         webcam: { type: Boolean, default: false }
//     }    
// };