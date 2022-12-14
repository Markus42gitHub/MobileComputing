class Ball extends RenderObject {

    constructor(pos_x, pos_y) {
        super();
        this.pos = [pos_x, pos_y];
        this.vel = [0, 0];
        this.acc = [1, 1];
        this.r = 10;
    }

    timeStep(delta_t, objects) {
        this.vel = [this.vel[0] + this.acc[0] * delta_t, this.vel[1] + this.acc[1] * delta_t];
        this.vel[0] = 0.99 *this.vel[0];
        this.vel[1] = 0.99 *this.vel[1];
        if (objects.some((el) => { return (this != el) && el.collide_x(this.pos[0] + this.vel[0] * delta_t * 10, this.pos[1] + this.vel[1] * delta_t * 10) })) {
            this.vel[0] = - 0.5 *this.vel[0];
            
        } else if (objects.some((el) => { return (this != el) && el.collide_y(this.pos[0] + this.vel[0] * delta_t * 10, this.pos[1] + this.vel[1] * delta_t * 10) })) {
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

    collide_x(x, y) {
       return (Math.sqrt((this.pos[0] - x) ** 2 + (this.pos[1] - y) ** 2)) < this.r;
    }

    collide_y(x, y) {
       return (Math.sqrt((this.pos[0] - x) ** 2 + (this.pos[1] - y) ** 2)) < this.r;
    }
}