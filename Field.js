class Field extends RenderObject {

    constructor(width, height) {
        super();
        this.width = width;
        this.height = height;
        this.ballList = [new Ball(10 + width/2, 10 + height /2)];
        this.ballList[0].acc = [1, 1];
        this.boundaryList = [new Boundary(0, 0, width, 30),new Boundary(0, 0, 30, height), new Boundary(0, height - 30, width, 30), new Boundary(width - 30, 0, 30, height)];
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
        }
    }

    setAcc(acc_x, acc_y) {
        for (let i = 0; i < this.ballList.length; i++) {
            this.ballList[i].setAcc(acc_x, acc_y);
        }
    }

    addBall(x, y) {
        this.ballList.push(new Ball(x,y,));
        this.objects = this.ballList.concat(this.boundaryList);
    }
}