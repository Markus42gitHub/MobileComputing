var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");
let f = new Field(canvas.width, canvas.height);
window.setInterval(() => { f.timeStep(); f.getRenderObjects().map((el) => { el.render(ctx); }); }, 100);

window.ondevicemotion = function (event) {
    var ax = event.accelerationIncludingGravity.x;
    var ay = event.accelerationIncludingGravity.y;
    if (ax && ay) {
        f.setAcc(-ax, ay);
    }
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
        x: mouseEvent.clientX - rect.left,
        y: mouseEvent.clientY - rect.top
    };
}