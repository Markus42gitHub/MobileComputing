class Field extends RenderObject {

    constructor(ctx, width, height) {
        super(ctx);
        this.width = width;
        this.height = height;
        this.ballList = [new Ball(ctx, 10, 10), new Ball(ctx, 30, 30)];
        this.ballList[0].acc = [1, 1];
    }

    render() {
        this.ctx.beginPath();
        this.ctx.rect(0, 0, this.width, this.height);
        this.ctx.fillStyle = "#F0F0F0";
        this.ctx.fill();
        this.ctx.closePath();
        for (let i = 0; i < this.ballList.length; i++) {
            this.ballList[i].render();
        }
    }

    timeStep() {
        for (let i = 0; i < this.ballList.length; i++) {
            this.ballList[i].timeStep(0.1)
        }
    }

    setAcc(acc_x, acc_y) {
        for (let i = 0; i < this.ballList.length; i++) {
            this.ballList[i].setAcc(acc_x, acc_y);
        }
    }
}