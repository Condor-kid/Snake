//游戏控制器，控制其他的所有类
import Food from './Food'
import ScorePanel from './ScorePanel'
import Snake from './Snake'
class GameControl {
    //定义三个属性
    snake: Snake;
    food: Food;
    scorePanel: ScorePanel;


    //创建一个属性来存储蛇的移动方向
    direction: string = ''

    //创建一个属性用来记录游戏是否结束
    isLive: boolean = true;

    constructor() {
        this.snake = new Snake();
        this.food = new Food();
        this.scorePanel = new ScorePanel();

        this.init()
    }

    //初始化
    init() {
        //绑定键盘按键按下的事件
        document.addEventListener('keydown', this.keydownHandler.bind(this))
        this.run();
    }

    //创建键盘按下的响应函数
    keydownHandler(event: KeyboardEvent) {
        // console.log(event.key)
        //判断event.key,只能局限在上下左右四个string
        this.direction = event.key
    }
    /*
        ArrowLeft  Left
        ArrowDown  Down
        ArrowUp   Up
        ArrowRight  Right
    */

    //创建一个控制蛇移动的方法
    run() {
        /*
            根据direction来让蛇的位置改变
            向上 top减少
            向下 top增加
            向左 left减少
            向右 left增加

        */
        //获取蛇现在的坐标
        let X = this.snake.X;
        let Y = this.snake.Y;

        switch (this.direction) {
            case "ArrowUp":
            case "Up":
                Y -= 10;
                break;
            case "ArrowDown":
            case "Down":
                Y += 10;
                break;
            case "ArrowLeft":
            case "Left":
                X -= 10;
                break;
            case "ArrowRight":
            case "Right":
                X += 10;
                break;
        }


        this.checkEat(X, Y);
        //修改蛇的XY值
        try {
            this.snake.X = X;
            this.snake.Y = Y;
        } catch (e: any) {
            //进入到catch
            alert(e.message + " Game over~");
            this.isLive = false;
        }

        this.isLive && setTimeout(this.run.bind(this), 300 - (this.scorePanel.level - 1) * 30)

    }
    //定义一个方法，用来检查蛇是否吃到食物
    checkEat(X: number, Y: number) {
        if (X === this.food.X && Y === this.food.Y) {
            // console.log("eating")
            //食物的位置重置
            this.food.change();
            //加分
            this.scorePanel.addScore();
            //蛇加一节
            this.snake.addBody();
        }
    }
}
export default GameControl