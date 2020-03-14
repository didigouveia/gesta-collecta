
(function () { 
    
    // TODO: cleanup and better structure code
    // TODO: check CSS size on smaller screens

    // how to prevent Android browser to resize window when soft keyboard is on - Stackoverflow
    var meta = document.createElement('meta');
    meta.name = 'viewport';
    meta.content = 'width=device-width,height=' + window.innerHeight + ', initial-scale=1.0';
    document.getElementsByTagName('head')[0].appendChild(meta);
    /* ------------------------------------------------------------------------------------------------------------------------ */

    // canvas settings
    let border = 10;
    let borderOffset = 2 * border;
    let borderColor = 'rgb(255,0,63)';
    let backgroundColor = 'rgb(0,206,255)';
    let brushColor = 'rgb(255,255,255)';
    let brushWidth = 6;

    const canvasDiv = document.getElementById('canvasDiv');
    canvasDiv.style.border = `${border}px solid ${borderColor}`;
    const canvas = this.__canvas = new fabric.Canvas('canvas', { isDrawingMode: true });
    // canvas.freeDrawingCursor = 'pointer';
    const alertBox = document.getElementById('alertBox');

    let strokes;
    resizeCanvas();

    window.addEventListener('resize', resizeCanvas);

    canvas.on('mouse:out', () => {
        canvas.isDrawingMode = false;
    });

    canvas.on('mouse:over', () => {
        canvas.isDrawingMode = true;
    });

    let mouseDown = false;
    const menuBtnOverlay = document.getElementById('btnOverlay');
    let stroke;
    canvas.on('mouse:down', (options) => {
        stroke = [];
        let coords = canvas.getPointer(options.e);
        let x = coords.x;
        let y = coords.y;
        stroke.push(new Point(strokes.length, (new Date()).getTime(), x, y));
        mouseDown = true;
        menuBtnOverlay.classList.add('invisible');
        alertBox.classList.add('invisible');
    });

    canvas.on('mouse:move', (options) => {
        let coords = canvas.getPointer(options.e);
        let x = coords.x;
        let y = coords.y;
        if (mouseDown && (0 <= x && x <= canvas.width) && (0 <= y && y <= canvas.height)) {
            stroke.push(new Point(strokes.length, (new Date()).getTime(), x, y));
        }
    });

    canvas.on('mouse:up', () => {
        mouseDown = false;
        menuBtnOverlay.classList.remove('invisible');
        alertBox.classList.remove('invisible');
    });

    canvas.on('path:created', () => {
        strokes.push(stroke);
        alertBox.innerHTML = `Stroke #${strokes.length} created`;
    });

    // menu buttons controls
    const menuBtn = document.querySelector('.menu-btn');
    const menuOverlay = document.querySelector('.menuOverlay.invisible');
    const gestureName = document.getElementById('gestureName');
    const saveBtn = document.getElementById('saveBtn');
    const clearBtn = document.getElementById('clearBtn');

    let menuOpen = false;
    menuBtn.addEventListener('click', () => {
        if (!menuOpen) {
            window.removeEventListener('resize', resizeCanvas);
            menuBtn.classList.add('open');
            menuOpen = true;
            menuOverlay.classList.remove('invisible');

            gestureName.onkeyup = (e) => {
                if (e.keyCode == 13) {
                    saveBtn.click();
                }
            };

            // exits menu
            saveBtn.addEventListener('click', () => {
                if (strokes.length && gestureName.value) {
                    saveGesture(gestureName.value, 0).catch((error) => {
                        console.error(error);
                        saveFailed();
                    });

                    menuOpen = false;
                    menuBtn.classList.remove('open');
                    menuOverlay.classList.add('invisible');

                    gestureName.value = "";
                    window.addEventListener('resize', resizeCanvas);
                    resizeCanvas();
                }
            });

            // exits menu
            clearBtn.addEventListener('click', () => {
                resizeCanvas();
                window.addEventListener('resize', resizeCanvas);
                menuBtn.classList.remove('open');
                menuOpen = false;
                menuOverlay.classList.add('invisible');
                gestureName.value = "";
            });

        } else {
            window.addEventListener('resize', resizeCanvas);
            menuBtn.classList.remove('open');
            menuOpen = false;
            menuOverlay.classList.add('invisible');
        }
    });


    // helper functions 
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
        strokes = [];
        alertBox.innerHTML = "Draw something!";
    }

    localhost = location.hostname;
    // saves gesture to database
    async function saveGesture(name, subject) {
        newGesture = new Gesture(name, subject, strokes, getDeviceInfo());

        response = await fetch(`http://${localhost}:5050/gestures`, {
            method: 'POST',
            body: JSON.stringify(newGesture),
            headers: {
                'Content-Type': 'application/json'
            }
        }).catch((error) => {
            console.error(error);
            saveFailed();
        });

        apiRes = await response;
        if (400 <= apiRes.status && apiRes.status < 600) {
            apiResJson = await apiRes.json();
            console.error('API RESPONSE', apiResJson.details[0].message);
            saveFailed();
        } else {
            saveSuccessful();
        }
    }

    function getDeviceInfo() {
        device = new Device(canvas.getHeight(), canvas.getWidth());

        modalityElem = document.getElementById('modality');
        modality = modalityElem.querySelector(".active").id;

        device[modality] = true;
        return device;
    }

    function saveFailed() {
        alertBox.innerHTML = "Gesture saving failed..";
    }

    function saveSuccessful() {
        alertBox.innerHTML = "Gesture saved successfully!";
    }

})();

