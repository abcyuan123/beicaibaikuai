// var btn = document.querySelector("button");
// var main = document.querySelector('.main');
// var colors = ['#008c8c','black','yellow','pink']
// var speed = 5,
//     num = 0,
//     timer = null,
//     flag = true;

// btn.onclick = function(){
//     this.style.display = "none"
//     move();
// };




// //创建方块
// function createDiv(){
//     var row = document.createElement('div');
//     row.className = 'row';

//     var index = Math.floor(Math.random()*4);//随机出一个索引值


//     //创建四个div
//     for(var i = 0;i < 4; i++){
//         var div = document.createElement('div');

//         //添加颜色
//         if(i == index){
//             div.style.background = colors[i];
//         }
//         row.appendChild(div);
//     }
//     //添加行
//     // console.log(main.children);
//     // if(main.children.length == 0){
//     //     main.appendChild(row);
//     // }else{
//     //     main.insertBefore(row,main.children[0]);
//     // }
//     main.insertBefore(row,main.children[0]);
// }

// function move(){
//     clearInterval(timer);
//     timer = setInterval(function(){
//         main.style.top = parseInt(main.offsetTop) + speed + "px";



//         //创建一行
//         if(parseInt(main.offsetTop)>=0){
//             createDiv();
//             main.style.top = '-150px';
//         }

//         var len = main.children.length;
//         if(len == 6){
//             for(var i = 0;i<4;i++){
//                 if(main.children[len-1].children[i].classList.contains('i')){
//                     alert("游戏结束：你的得分是"+num);
//                     clearInterval(timer);
//                 }
//             }
//             main.removeChild(main.children[len-1]);
//         }

//     },20);
//     bindEvent();
// }

// //给方块添加点击事件
// function bindEvent(){
//     main.onclick = function(ev){
//         if(!flag){
//            return; 
//         }
//         var target = ev.target;//真正的事件源对象

//         if(target.className == 'i'){
//             target.style.background = "#bbb";
//             target.classList.remove('i')

//             num++;
//         }else{
//             alert("游戏结束：你的得分是"+num);
//             clearInterval(timer);
//             flag = false;
//         }


//         if(num%10 == 0){
//             speed++;
//         }
//     }
// }


var main = document.getElementById('main')

var go = document.getElementById('go')

var count = document.getElementById('count');

cols = ['#1AAB8A', '#E15650', '#121B39', '#80A84E'];

function CDiv(classname) {

    var Div = document.createElement('div')

    index = Math.floor(Math.random() * 4)

    Div.className = classname

    for (var i = 0; i < 4; i++) {

        var iDiv = document.createElement('div')

        Div.appendChild(iDiv)

    }

    if (main.children.length == 0) {

        main.appendChild(Div);

    } else {

        main.insertBefore(Div, main.children[0]);

    }

    Div.children[index].style.backgroundColor = cols[index];

    Div.children[index].className = "i";

}


function move(obj) {

    //默认速度与计分

    var speed = 5, num = 0;

    obj.timer = setInterval(function () {

        //速度

        var step = parseInt(getComputedStyle(obj, null)['top']) + speed;

        obj.style.top = step + 'px'

        if (parseInt(getComputedStyle(obj, null)['top']) >= 0) {

            CDiv('row');

            obj.style.top = -150 + 'px';

        }

        if (obj.children.length == 6) {

            for (var i = 0; i < 4; i++) {

                if (obj.children[obj.children.length - 1].children[i].className == 'i') {

                    //游戏结束

                    obj.style.top = '-150px';

                    count.innerHTML = '游戏结束,最高得分: ' + num;

                    //关闭定时器

                    clearInterval(obj.timer);

                    //显示开始游戏

                    go.children[0].innerHTML = '游戏结束';

                    go.style.display = "block";

                }

            }

            obj.removeChild(obj.children[obj.children.length - 1]);

        }

        //点击与计分

        obj.onmousedown = function (event) {

            //点击的不是白盒子

            // 兼容IE

            event = event || window.event;

            if ((event.target ? event.target : event.srcElement).className == 'i') {

                //点击后的盒子颜色

                (event.target ? event.target : event.srcElement).style.backgroundColor = "#bbb";

                //清除盒子标记

                (event.target ? event.target : event.srcElement).className = '';

                //计分

                num++;

                //显示得分

                count.innerHTML = '当前得分: ' + num;

            }

            else {

                //游戏结束

                obj.style.top = 0;

                count.innerHTML = '游戏结束,最高得分: ' + num;

                //关闭定时器

                clearInterval(obj.timer);

                //显示开始游戏

                go.children[0].innerHTML = '游戏结束';

                go.style.display = "block";

            }

            //盒子加速

            if (num % 10 == 0) {

                speed++;

            }

        }

        //松开触发停止

        obj.onmouseup = function (event) {

        }

    }, 20)

}

go.children[0].onclick = function () {

    if (main.children.length) {

        //暴力清楚main里面所有盒子

        main.innerHTML = '';

    }

    //清空计分

    count.innerHTML = '游戏开始';

    //隐藏开始盒子

    this.parentNode.style.display = "none";

    move(main);

}

