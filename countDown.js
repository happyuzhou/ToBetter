var WINDOW_WIDTH = 1024;
var WINDOW_HEIGHT = 678;
var RADIUS = 8;
var MARGIN_LEFT = 30;
var MARGIN_TOP = 60;

var ENDTIME = new Date(2016, 7, 21, 11, 11, 11);
var currentTimeSeconds = 0;

var balls = [];
var COLOR = ['#3bd', '#09c', '#a6c', '#93c', '#9c0', '#690', '#fb3', '#f80', '#f44', '#c06'];

window.onload = function() {
    var canvas = document.getElementById("myCanvas");
    var context= canvas.getContext("2d");

    canvas.width = WINDOW_WIDTH;
    canvas.height = WINDOW_HEIGHT;

    currentTimeSeconds = getCurrentTimeSeconds();

    setInterval(function() {
        render(context);
        upDate();
    }, 50);//50ms
    
};

function getCurrentTimeSeconds() {
    var curTime = new Date();
    var res = ENDTIME.getTime() - curTime.getTime();
    res = Math.round(res/1000);

    return res >= 0 ? res:0;
}

function upDate() {
    var nextTimeSeconds = getCurrentTimeSeconds();

    var nextHours = parseInt(nextTimeSeconds/3600);
    var nextMinutes = parseInt((nextTimeSeconds-nextHours*3600)/60);
    var nextSceonds = nextTimeSeconds % 60;

    var curHours = parseInt(currentTimeSeconds/3600);
    var curMinutes = parseInt((currentTimeSeconds-curHours*3600)/60);
    var curSeconds = currentTimeSeconds % 60;

    if(nextSceonds !== curSeconds) {
        //控制小时的变化效果
        if(parseInt(curHours/10) !== parseInt(nextHours/10)) {
            addBalls(MARGIN_LEFT, MARGIN_TOP, parseInt(curHours/10));
        }
        if(parseInt(curHours%10) !== parseInt(nextHours%10)) {
            addBalls(MARGIN_LEFT + 15*(RADIUS+1), MARGIN_TOP, parseInt(curHours%10));
        }
        //控制分钟的变化效果
        if(parseInt(curMinutes/10) !== parseInt(nextMinutes/10)) {
            addBalls(MARGIN_LEFT + 39*(RADIUS+1), MARGIN_TOP, parseInt(curMinutes/10));
        }
        if(parseInt(curMinutes%10) !== parseInt(nextMinutes%10)) {
            addBalls(MARGIN_LEFT + 54*(RADIUS+1), MARGIN_TOP, parseInt(curMinutes%10));
        }
        //控制秒钟的变化效果
        if(parseInt(curSeconds/10) !== parseInt(nextSceonds/10)) {
            addBalls(MARGIN_LEFT + 78*(RADIUS+1), MARGIN_TOP, parseInt(curSeconds/10));
        }
        if(parseInt(curSeconds%10) !== parseInt(nextSceonds%10)) {
            addBalls(MARGIN_LEFT + 93*(RADIUS+1), MARGIN_TOP, parseInt(curSeconds%10));
        }

        currentTimeSeconds = nextTimeSeconds;
    }

    updateBalls();
}

function updateBalls() {
    for(var i=0; i<balls.length; i++) {
        balls[i].x += balls[i].vx;
        balls[i].y += balls[i].vy;
        balls[i].vy += balls[i].g;

        //检测小球与地板是否发生碰撞
        if(balls[i].y >= WINDOW_HEIGHT-RADIUS) {
            balls[i].y = WINDOW_HEIGHT-RADIUS;
            balls[i].vy = -balls[i].vy*0.5;
        }
    }
}

function addBalls(x, y, num) {
    for(var i=0; i<digitNumber[num].length; i++) {
        for(var j=0; j<digitNumber[num][i].length; j++) {
            if(digitNumber[num][i][j] === 1) {
                var aBall = {
                    x: x + j*2*(RADIUS+1) + (RADIUS+1),
                    y: y + i*2*(RADIUS+1) + (RADIUS+1),
                    g: 1.5*Math.random(),
                    vx: Math.pow(-1, Math.ceil(Math.random()*1000))*2,
                    vy: -2,
                    color: COLOR[Math.floor(Math.random()*COLOR.length)]
                };
                balls.push(aBall);
            }
        }
    }
}

function render(cxt) {
    cxt.clearRect(0, 0, WINDOW_WIDTH, WINDOW_HEIGHT);

    var hours = parseInt(currentTimeSeconds/3600);
    var minutes = parseInt((currentTimeSeconds - hours*3600)/60);
    // var minutes = parseInt(currentTimeSeconds%60/60);
    var seconds = currentTimeSeconds % 60;

    renderDigit(MARGIN_LEFT, MARGIN_TOP, parseInt(hours/10), cxt);
    renderDigit(MARGIN_LEFT + 15*(RADIUS+1), MARGIN_TOP, parseInt(hours%10), cxt);
    renderDigit(MARGIN_LEFT + 30*(RADIUS+1), MARGIN_TOP, 10, cxt);
    renderDigit(MARGIN_LEFT + 39*(RADIUS+1), MARGIN_TOP, parseInt(minutes/10), cxt);
    renderDigit(MARGIN_LEFT + 54*(RADIUS+1), MARGIN_TOP, parseInt(minutes%10), cxt);
    renderDigit(MARGIN_LEFT + 69*(RADIUS+1), MARGIN_TOP, 10, cxt);
    renderDigit(MARGIN_LEFT + 78*(RADIUS+1), MARGIN_TOP, parseInt(seconds/10), cxt);
    renderDigit(MARGIN_LEFT + 93*(RADIUS+1), MARGIN_TOP, parseInt(seconds%10), cxt);

    for(var i=0; i<balls.length; i++) {
        cxt.fillStyle = balls[i].color;

        cxt.beginPath();
        cxt.arc(balls[i].x, balls[i].y, RADIUS, 0, 2*Math.PI, true);
        cxt.closePath();

        cxt.fill();
    }
}

function renderDigit(x, y, num, cxt) {

    cxt.fillStyle = "#0cd";

    for(var i=0; i<digitNumber[num].length; i++) {
        for(var j=0; j<digitNumber[num][i].length; j++) {
            if(digitNumber[num][i][j] === 1) {
                cxt.beginPath();
                cxt.arc(x+j*2*(RADIUS+1)+(RADIUS+1), y+i*2*(RADIUS+1)+(RADIUS+1), RADIUS, 0, 2*Math.PI);
                cxt.closePath();

                cxt.fill();
            }
        }
    }
}