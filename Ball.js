class Ball extends RenderObject {

    constructor(ctx, pos_x, pos_y) {
        super(ctx);
        this.pos = [pos_x, pos_y];
        this.vel = [0, 0];
        this.acc = [1, 1];
        this.r = 10;
    }

    timeStep(delta_t) {
        this.vel = [this.vel[0] + this.acc[0] * delta_t, this.vel[1] + this.acc[1] * delta_t];
        this.pos = [this.pos[0] + this.vel[0] * delta_t, this.pos[1] + this.vel[1] * delta_t];
    }

    setAcc(acc_x, acc_y) {
        this.acc = [acc_x, acc_y];
    }

    render() {
        console.log(`${this.pos}`);
        console.log(`${this.pos[0]}`);
        console.log(`${this.pos[1]}`);
        this.ctx.beginPath();
        this.ctx.arc(this.pos[0], this.pos[1], this.r, 0, Math.PI * 2);
        this.ctx.fillStyle = "#00FF00";
        this.ctx.fill();
        this.ctx.closePath();
    }
}