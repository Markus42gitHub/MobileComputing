class Boundary extends RenderObject {
    constructor(pos_x, pos_y, width, height) {
        super();
        this.pos_x = pos_x;
        this.pos_y = pos_y;
        this.width = width;
        this.height = height;
    }

    getRenderObjects() {
        return [this];
    }

    render(ctx) {
        ctx.beginPath();
        ctx.rect(this.pos_x, this.pos_y, this.width, this.height);
        ctx.fillStyle = "#000000";
        ctx.fill();
        ctx.closePath();
    }

    collide_x(x, y) {
        return ((this.pos_x - x) <= this.width && (this.pos_x - x) >= 0);
    }
    collide_y(x, y) {
        return ((this.pos_y - y) <= this.height && (this.pos_y - y) >= 0);
    }
}