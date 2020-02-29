
(function() {
    let border = 10;
    let borderOffset = 2 * border;
    let borderColor = 'rgb(255,0,63)';
    let mouseDown = false;
    let backgroundColor = 'rgb(0,206,255)';
    let brushColor = 'rgb(255,255,255)';
    let brushWidth = 10;

    let canvasDiv = document.getElementById('canvasDiv');    
    canvasDiv.style.border = `${border}px solid ${borderColor}`;

    let canvas = this.__canvas = new fabric.Canvas('canvas', {isDrawingMode: true});
    // canvas.freeDrawingCursor = 'pointer';    

    resizeCanvas();

    window.addEventListener('resize', resizeCanvas);   
    
    canvas.on('mouse:out', () => {
        canvas.isDrawingMode = false;
    });

    canvas.on('mouse:over', () => {
        canvas.isDrawingMode = true;
    });

    canvas.on('mouse:down', () => {
        mouseDown = true;
    });

    canvas.on('mouse:up', () => {
        mouseDown = false;
    });

    canvas.on('mouse:move', (options) => {
        let coords = canvas.getPointer(options.e);
        let x = coords.x;
        let y = coords.y;
        if(mouseDown && (0 <= x && x <= canvas.width) && (0 <= y && y <= canvas.height)) {
            console.log((new Date()).getTime());
            console.log(coords);
        }    
    });      

    function resizeCanvas() {        
        canvas.setDimensions({
            'width': document.body.offsetWidth - borderOffset,
            'height': document.body.offsetHeight - borderOffset
        });        
        clearCanvas();
    }
    
    function clearCanvas() {
        canvas.clear();
        canvas.setBackgroundColor(backgroundColor, canvas.renderAll.bind(canvas));
        canvas.freeDrawingBrush.color = brushColor;
        canvas.freeDrawingBrush.width = brushWidth;
    }
})();

