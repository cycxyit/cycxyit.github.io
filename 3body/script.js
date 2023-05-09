var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");

var G = 1; // 引力常数
var m1 = 100; // 质量
var m2 = 100;
var m3 = 100;
var x1 = canvas.width/2 - 100; // 初始位置
var y1 = canvas.height/2;
var x2 = canvas.width/2 + 100;
var y2 = canvas.height/2 - 100;
var x3 = canvas.width/2 + 100;
var y3 = canvas.height/2 + 100;
var vx1 = 0; // 初始速度
var vy1 = -0.01;
var vx2 = 0;
var vy2 = 0.01;
var vx3 = 0.01;
var vy3 = 0;

function update() {
	// 计算三个质点之间的引力
	var d12 = Math.sqrt(Math.pow(x1-x2, 2) + Math.pow(y1-y2, 2));
	var d13 = Math.sqrt(Math.pow(x1-x3, 2) + Math.pow(y1-y3, 2));
	var d23 = Math.sqrt(Math.pow(x2-x3, 2) + Math.pow(y2-y3, 2));
	var F12 = G * m1 * m2 / Math.pow(d12, 2);
	var F13 = G * m1 * m3 / Math.pow(d13, 2);
	var F23 = G * m2 * m3 / Math.pow(d23, 2);
	var theta12 = Math.atan2(y2-y1, x2-x1);
	var theta13 = Math.atan2(y3-y1, x3-x1);
	var theta23 = Math.atan2(y3-y2, x3-x2);
	var Fx1 = F12 * Math.cos(theta12) + F13 * Math.cos(theta13);
	var Fy1 = F12 * Math.sin(theta12) + F13 * Math.sin(theta13);
	var Fx2 = -F12 * Math.cos(theta12) + F23 * Math.cos(theta23);
	var Fy2 = -F12 * Math.sin(theta12) + F23 * Math.sin(theta23);
	var Fx3 = -F13 * Math.cos(theta13) - F23 * Math.cos(theta23);
	var Fy3 = -F13 * Math.sin(theta13) - F23 * Math.sin(theta23);

	// 计算加速度和速度
	var ax1 = Fx1 / m1;
	var ay1 = Fy1 / m1;
	var ax2 = Fx2 / m2;
	var ay2 = Fy2 / m2;
	var ax3 = Fx3 / m3;
	var ay3 = Fy3 / m3;
	vx1 += ax1;
	vy1 += ay1;
	vx2 += ax2;
	vy2 += ay2;
	vx3 += ax3;
	vy3 += ay3;

	// 更新位置
	x1 += vx1;
	y1 += vy1;
	x2 += vx2;
	y2 += vy2;
	x3 += vx3;
	y3 += vy3;
}

function draw() {
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	ctx.beginPath();
	ctx.arc(x1, y1, 10, 0, 2*Math.PI);
	ctx.fillStyle = "red";
	ctx.fill();
	ctx.beginPath();
	ctx.arc(x2, y2, 10, 0, 2*Math.PI);
	ctx.fillStyle = "green";
	ctx.fill();
	ctx.beginPath();
	ctx.arc(x3, y3, 10, 0, 2*Math.PI);
	ctx.fillStyle = "blue";
	ctx.fill();
}

function loop() {
	update();
	draw();
	requestAnimationFrame(loop);
}

loop();