//定义food类
class Food {
    //定义一个属性表示食物所对应的元素
    element: HTMLElement;
    constructor() {
        //获取页面中的food元素，并将其赋值给element
        this.element = document.getElementById('food')!;
    }

    //定义一个获取食物X轴坐标的方法
    get X() {
        return this.element.offsetLeft;
    }
    //定义一个获取食物Y轴坐标的方法
    get Y() {
        return this.element.offsetTop;
    }
    //改变食物的位置
    change() {
        //生成一个随机的位置
        //最小是0，最大是290
        //蛇一次移动10px，要求位置坐标是10的倍数
        //Math.random()的范围（0，1）,开区间
        //规避蛇头的位置
        let top = Math.round(Math.random() * 29) * 10;
        let left = Math.round(Math.random() * 29) * 10;
        while (top === this.Y && left === this.Y) {
            top = Math.round(Math.random() * 29) * 10;
            left = Math.round(Math.random() * 29) * 10;
        }
        this.element.style.left = left + 'px';
        this.element.style.top = top + 'px';
    }
}

export default Food