
(function() {
    let border = 5;
    let borderOffset = 2 * border;
    let mouseDown = false;
    let mouseMove = false;

    let canvasDiv = document.getElementById('canvasDiv');    
    canvasDiv.style.border = `${border}px solid rgb(248, 25, 174)`;

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
        if(mouseDown && (0 < x && x < canvas.width) && (0 < y && y < canvas.height)) {
            console.log((new Date()).getTime());
            console.log(coords);
        }    
    });      

    function resizeCanvas() {              
        
        canvas.setDimensions({
            'width': document.body.clientWidth - borderOffset,
            'height': document.body.clientHeight - borderOffset
        });

        canvas.clear();
        canvas.setBackgroundColor('rgba(113,233,248,1)', canvas.renderAll.bind(canvas));
        canvas.freeDrawingBrush.color = 'rgba(4,65,100,1)';
        canvas.freeDrawingBrush.width = 3;
    }    
})();

