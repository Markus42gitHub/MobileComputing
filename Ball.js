class Ball extends RenderObject {

    constructor(pos_x, pos_y, wb, accx, accy, width, height) {
        super();
        this.pos = [pos_x, pos_y];
        this.vel = [0, 0];
        this.acc = [accx, accy];
        this.r = wb * 2;
        this.width = width; 
        this.height = height;
    }

    timeStep(delta_t, objects) {
        this.vel = [this.vel[0] + this.acc[0] * delta_t, this.vel[1] + this.acc[1] * delta_t];
        this.vel[0] = 0.9 *this.vel[0];
        this.vel[1] = 0.9 *this.vel[1];
        if (objects.some((el) => { return (this != el) && el.collide_x(this.pos[0] + this.vel[0] * delta_t * 10, this.pos[1] + this.vel[1] * delta_t * 10, this.r) })) {
            this.vel[0] = - 0.5 *this.vel[0];
        } else if (objects.some((el) => { return (this != el) && el.collide_y(this.pos[0] + this.vel[0] * delta_t * 10, this.pos[1] + this.vel[1] * delta_t * 10, this.r) })) {
            this.vel[1] = -0.5 * this.vel[1];
        }
        this.pos = [this.pos[0] + this.vel[0] * delta_t * 10, this.pos[1] + this.vel[1] * delta_t * 10];
    }

    setAcc(acc_x, acc_y) {
        this.acc = [acc_x, acc_y];
    }

    render(ctx) {
        ctx.beginPath();
        ctx.arc(this.pos[0], this.pos[1], this.r, 0, Math.PI * 2);
        ctx.fillStyle = "#00FF00";
        ctx.fill();
        ctx.closePath();
    }

    getRenderObjects() {
        return [this];
    }

    collide_x(x, y, r) {
       return (Math.sqrt((this.pos[0] - x) ** 2 + (this.pos[1] - y) ** 2)) < this.r + r;
    }

    collide_y(x, y, r) {
       return (Math.sqrt((this.pos[0] - x) ** 2 + (this.pos[1] - y) ** 2)) < this.r + r;
    }

    adjust(width, height) {
        this.x = Math.min(Math.max(this.r, this.x), width - this.r);
        this.y = Math.min(Math.max(this.r, this.y), height - this.r);
    }
}