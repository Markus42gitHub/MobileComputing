var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");
let f = new Field(canvas.width, canvas.height);

function resiveCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = canvas.offsetHeight;
    f.resize(canvas.width, canvas.height);
}

function changeaccx() {
    var x = document.getElementById("accx").value;
    var y = document.getElementById("accy").value;
    f.setAcc(x, y);
    document.getElementById("accxresult").innerHTML = x;
}

function changeaccy() {
    var x = document.getElementById("accx").value;
    var y = document.getElementById("accy").value;
    f.setAcc(x, y);
    document.getElementById("accyresult").innerHTML = y;
}
window.setInterval(() => { f.timeStep(); f.getRenderObjects().map((el) => { el.render(ctx); }); }, 100);

window.ondevicemotion = function (event) {
    document.getElementById("accx").disabled = true;
    document.getElementById("accy").disabled = true;
    var ax = event.accelerationIncludingGravity.x;
    var ay = event.accelerationIncludingGravity.y;
    if (ax && ay) {
        f.setAcc(-ax, ay);
    }
    document.getElementById("accyresult").innerHTML = Math.round(ay);
    document.getElementById("accxresult").innerHTML = Math.round(ax);
}

canvas.addEventListener("mousedown", (e) => {
    let mousePos = getMousePos(canvas, e);
    console.log(mousePos);
    f.addBall(mousePos.x, mousePos.y);
}, false);

canvas.addEventListener("touchstart", function (e) {
    mousePos = getTouchPos(canvas, e);
    var touch = e.touches[0];
    var mouseEvent = new MouseEvent("mousedown", {
        clientX: touch.clientX,
        clientY: touch.clientY
    });
    canvas.dispatchEvent(mouseEvent);
}, false);

function getMousePos(canvasDom, mouseEvent) {
    var rect = canvasDom.getBoundingClientRect();
    return {
        x: mouseEvent.clientX,
        y: mouseEvent.clientY - (window.innerHeight - canvas.offsetHeight)
    };
}

new ResizeObserver(resiveCanvas).observe(canvas);