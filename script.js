function my$(id) {
    return document.getElementById(id);
}
var contain = my$('contain');
var photoFrame = my$('contain').children[0];
var ul = my$('contain').children[1];
var span = document.getElementsByTagName('span');
var current = ul.offsetLeft;
var ulNew = my$('contain').children[4];
var width = ul.children[0].children[0].width;
var pic = 0;
// 给每张图片设置index值
for(var j=0;j<ul.children.length;j++) {
    ul.children[j].setAttribute('index',j);
}
// 鼠标悬停修改pic值,无效，当for执行完完毕，才开始将消息队列的onmouseover推入栈中
// for(var i=0;i<ul.children.length;i++) {
//     ul.children[i].onmouseover = function() {
//         pic = this.getAttribute('index');
//     }
// }
// 点击左侧按钮
span[0].onclick = function() {
    debugger;
    if(pic==0) {
        pic = 5;
        ul.style.left = -pic*width + 'px';
    }
    pic--;
    animate(ul,-pic*width);
    debugger;
    for(var i=0;i<ulNew.children.length;i++) {
        ulNew.children[i].removeAttribute('class','current');
    }
    debugger;
    ulNew.children[pic].setAttribute('class','current');
}
    
// 点击右侧按钮
span[1].onclick = clickRight;

function clickRight() {
    debugger;
    if(pic==5) {
        // 去除5
        pic = 0;
        ul.style.left = -pic*width;
        // ulNew.children[ulNew.children.length-1].removeAttribute('class','current');

    }
        pic++;
        debugger;
        animate(ul,-pic*width);
        debugger;
        if(pic == ulNew.children.length-1) {
            ulNew.children[ulNew.children.length-2].removeAttribute('class');
            ulNew.children[0].setAttribute('class','current');
        } else {
            debugger;
            for(var i=0;i<ulNew.children.length;i++) {
            ulNew.children[i].removeAttribute('class','current');
            }
            debugger;
            ulNew.children[pic].setAttribute('class','current');
        }
}
// 在最后li处添加第一项
ul.appendChild(ul.children[0].cloneNode(true));

// 为每处的li添加index
for(var i=0;i<ul.children.length;i++) {
    list = document.createElement('li');
    ulNew.appendChild(list);
    ulNew.children[i].setAttribute('index',i);

}

// 参数element,target
function animate(element,target) {
    clearInterval(element.timerId);
    element.timerId = setInterval(function() {
        var current = element.offsetLeft;
        var step = 20;
        step = (current-target)>0?-step :step; 
        current+=step;
        if(Math.abs(current-target)>step) {
            element.style.left = current + 'px'; 
        } else {
            clearInterval(element.timerId);
            element.style.left = target + 'px';
        }
    },50)
}
debugger;
// 伪数组转换，分别添加事件绑定
var dotArray = Array.from(ulNew.children);
dotArray.forEach((element,pic) => {
    element.onclick = function(e) {
        for(var j=0; j<ulNew.children.length;j++) {
            ulNew.children[j].removeAttribute('class');
        }
        this.setAttribute('class','current');
        animate(ul,-pic*width);
    }
}) 
// dotArray.forEach((element,pic) => {
//     element.onmouseover = function(e) {
//         animate(ul,-pic*width);
//     }
// }) 
// for(var n=0;n<ulNew.children.length;n++) {
//     ulNew.children[n].onmouseover = function() {
//         animate(ul,-n*width);
//     }
// }

// 自动播放,intervalTIme需要一致
var intervalTime = setInterval(
    clickRight
,2000);


contain.onmouseover = function() {
    for(var i=0;i<span.length;i++) {
        span[i].style.display = 'block';
    }
    clearInterval(intervalTime);
}
contain.onmouseout = function() {
    for(var i=0;i<span.length;i++) {
        span[i].style.display = 'none';
    }
    intervalTime = setInterval(clickRight,2000);
}
// contain.onmouseover = function() {
//     clearInterval(timerId);
//     for(var i=0;i<span.length;i++) {
//         span[i].style.display = 'block';
//     }
// }
// contain.onmouseout = function() {
//     setInterval(clickRight,2000);
//     for(var i=0;i<span.length;i++) {
//         span[i].style.display = 'none';
//     }
// }


