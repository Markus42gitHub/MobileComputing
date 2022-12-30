class Field extends RenderObject {

    constructor(width, height) {
        super();
        this.accx = 0;
        this.accy = 0;
        this.wb = 0.01 * width;
        this.width = width;
        this.height = height;
        this.ballList = [new Ball(width / 2, height / 2, this.wb, this.accx, this.accy)];
        this.boundaryList = [new Boundary(0, 0, width, this.wb), new Boundary(0, 0, this.wb, height), new Boundary(0, height - this.wb, width, this.wb), new Boundary(width - this.wb, 0, this.wb, height)];
        this.objects = this.ballList.concat(this.boundaryList);

    }

    render(ctx) {
        ctx.beginPath();
        ctx.rect(0, 0, this.width, this.height);
        ctx.fillStyle = "#F0F0F0";
        ctx.fill();
        ctx.closePath();
    }

    getRenderObjects() {
        let res = [this];
        for (let i = 0; i < this.objects.length; i++) {
            res = res.concat(this.objects[i].getRenderObjects());
        }
        return res;
    }

    timeStep() {
        for (let i = 0; i < this.ballList.length; i++) {
            this.ballList[i].timeStep(0.1, this.objects);
            this.ballList[i].adjust(this.width, this.height);
        }
    }

    setAcc(acc_x, acc_y) {
        this.accx = acc_x;
        this.accy = acc_y;
        for (let i = 0; i < this.ballList.length; i++) {
            this.ballList[i].setAcc(acc_x, acc_y);
        }
    }

    addBall(x, y) {
        this.ballList.push(new Ball(x, y, this.wb, this.accx, this.accy));
        this.objects = this.ballList.concat(this.boundaryList);
    }
}