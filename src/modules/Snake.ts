class Snake {
    //获取蛇的元素
    head: HTMLElement;
    //蛇的身体，包括蛇头
    bodies: HTMLCollection;

    element: HTMLElement;
    constructor() {
        this.element = document.getElementById('snake')!;
        this.head = document.querySelector('#snake>div')!;
        this.bodies = this.element.getElementsByTagName('div')!;
    }

    //获取蛇的坐标(蛇头)
    get X() {
        return this.head.offsetLeft;
    }
    get Y() {
        return this.head.offsetTop;
    }

    set X(value) {
        if (this.X === value) {
            return;
        }

        // X值的合法范围是0-290
        if (value < 0 || value > 290) {
            //蛇撞墙了
            throw new Error('蛇撞墙了')
        }


        //修改X时，是修改水平坐标，也就是蛇在左右移动，不允许掉头
        if (this.bodies[1] && (this.bodies[1] as HTMLElement).offsetLeft === value) {
            // console.log("掉头了")
            //如果发生了掉头，让蛇向反方向继续移动
            if (value > this.X) {
                //新的value大于旧的X，蛇向右走,此时发生掉头，由于不允许掉头，所以向左走
                value = this.X - 10;
            } else {
                value = this.X + 10
            }
        }


        this.moveBody();
        this.head.style.left = value + 'px';
        this.checkHeadBody();
    }
    set Y(value) {
        if (this.Y === value) {
            return;
        }
        if (value < 0 || value > 290) {
            //蛇撞墙了
            throw new Error('蛇撞墙了')
        }

        //修改Y时，是修改垂直坐标，也就是蛇在上下移动，不允许掉头
        if (this.bodies[1] && (this.bodies[1] as HTMLElement).offsetTop === value) {
            // console.log("掉头了")
            if (value > this.Y) {
                value = this.Y - 10;
            } else {
                value = this.Y + 10;
            }
        }
        this.moveBody();
        this.head.style.top = value + 'px';
        this.checkHeadBody();
    }

    //蛇吃东西增加身体
    addBody() {
        this.element.insertAdjacentHTML('beforeend', "<div></div>")
    }
    moveBody() {
        /*
            将后面的身体设置为前面的身体(也就是将前面的身体的位置坐标赋值给后面的身体)

        */
        //遍历获取所有的身体
        for (let i = this.bodies.length - 1; i > 0; i--) {
            let X = (this.bodies[i - 1] as HTMLElement).offsetLeft;
            let Y = (this.bodies[i - 1] as HTMLElement).offsetTop;

            //将值设置到当前身体上
            (this.bodies[i] as HTMLElement).style.left = X + 'px';
            (this.bodies[i] as HTMLElement).style.top = Y + 'px';
        }
    }
    //检查蛇头是否撞到身体的方法
    checkHeadBody() {
        //检查头和身体是否相撞，获取所有的身体，检查其是否和蛇头的坐标发生重叠
        for (let i = 1; i < this.bodies.length; i++) {
            let bd = this.bodies[i] as HTMLElement;
            if (this.X === bd.offsetLeft && this.Y === bd.offsetTop) {
                //进入判断说明撞到了身体
                throw new Error("撞到自己了")
            }
        }

    }
}

export default Snake