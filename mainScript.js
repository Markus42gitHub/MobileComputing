var canvas = document.getElementById("myCanvas");
canvas.width = screen.width;
canvas.height = screen.height;
var ctx = canvas.getContext("2d");
let f = new Field(ctx, screen.width, screen.height);
window.setInterval(() => { f.timeStep(); f.render(); }, 100);

window.ondevicemotion = function (event) {
    var ax = event.accelerationIncludingGravity.x;
    var ay = event.accelerationIncludingGravity.y;

    if (ax && ay) {
        f.setAcc(ax, ay);
    }
}