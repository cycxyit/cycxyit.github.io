var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");

var G = 6.67408e-11; // 引力常数
var m1 = 1.989e30; // 太阳质量
var m2 = 5.972e24; // 地球质量
var m3 = 5.972e24; // 地球质量
var m4 = 5.972e24; // 地球质量
var x1 = canvas.width/2; // 太阳初始位置
var y1 = canvas.height/2;
var x2 = canvas.width/2 + 200000000; // 地球初始位置
var y2 = canvas.height/2;
var x3 = canvas.width/2 - 200000000; // 地球初始位置
var y3 = canvas.height/2 + 200000000;
var x4 = canvas.width/2 - 200000000; // 地球初始位置
var y4 = canvas.height/2 - 200000000;
var vx1 = 0; // 太阳初始速度
var vy1 = 0;
var vx2 = 0; // 地球初始速度
var vy2 = -29783;
var vx3 = 29783/Math.sqrt(2); // 地球初始速度
var vy3 = -29783/Math.sqrt(2);
var vx4 = -29783/Math.sqrt(2); // 地球初始速度
var vy4 = 29783/Math.sqrt(2);
var r1 = 20; // 太阳半径
var r2 = 10; // 地球半径
var r3 = 10; // 地球半径
var r4 = 10; // 地球半径
var dt = 1000; // 时间步长
var path2 = []; // 地球轨迹
var path3 = []; // 地球轨迹
var path4 = []; // 地球轨迹

function update() {
	// 计算引力
	var d12 = Math.sqrt(Math.pow(x1-x2, 2) + Math.pow(y1-y2, 2));
	var d13 = Math.sqrt(Math.pow(x1-x3, 2) + Math.pow(y1-y3, 2));
	var d14 = Math.sqrt(Math.pow(x1-x4, 2) + Math.pow(y1-y4, 2));
	var F12 = G * m1 * m2 / Math.pow(d12, 2);
	var F13 = G * m1 * m3 / Math.pow(d13, 2);
	var F14 = G * m1 * m4 / Math.pow(d14, 2);
	var theta12 = Math.atan2(y2-y1, x2-x1);
	var theta13 = Math.atan2(y3-y1, x3-x1);
	var theta14 = Math.atan2(y4-y1, x4-x1);
	var Fx2 = F12 * Math.cos(theta12) + F13 * Math.cos(theta13) + F14 * Math.cos(theta14);
	var Fy2 = F12 * Math.sin(theta12) + F13 * Math.sin(theta13) + F14 * Math.sin(theta14);
	var Fx3 = -F12 * Math.cos(theta12) + F13 * Math.cos(theta13) - F14 * Math.cos(theta14);
	var Fy3 = -F12 * Math.sin(theta12) + F13 * Math.sin(theta13) - F14 * Math.sin(theta14);
	var Fx4 = -F13 * Math.cos(theta13) - F14 * Math.cos(theta14);
	var Fy4 = -F13 * Math.sin(theta13) - F14 * Math.sin(theta14);

	// 计算加速度和速度
	var ax2 = Fx2 / m2;
	var ay2 = Fy2 / m2;
	var ax3 = Fx3 / m3;
	var ay3 = Fy3 / m3;
	var ax4 = Fx4 / m4;
	var ay4 = Fy4 / m4;
	vx2 += ax2 * dt;
	vy2 += ay2 * dt;
	vx3 += ax3 * dt;
	vy3 += ay3 * dt;
	vx4 += ax4 * dt;
	vy4 += ay4 * dt;

	// 更新位置
	x2 += vx2 * dt;
	y2 += vy2 * dt;
	x3 += vx3 * dt;
	y3 += vy3 * dt;
	x4 += vx4 * dt;
	y4 += vy4 * dt;

	// 记录轨迹
	path2.push({x: x2, y: y2});
	path3.push({x: x3, y: y3});
	path4.push({x: x4, y: y4});
}

function draw() {
	// 绘制背景
	ctx.fillStyle = "black";
	ctx.fillRect(0, 0, canvas.width, canvas.height);

	// 绘制太阳
	ctx.beginPath();
	ctx.arc(x1, y1, r1, 0, 2*Math.PI);
	ctx.fillStyle = "orange";
	ctx.fill();

	// 绘制地球
	ctx.beginPath();
	ctx.arc(x2, y2, r2, 0, 2*Math.PI);
	ctx.fillStyle = "yellow";
	ctx.fill();

	// 绘制地球轨迹
	ctx.beginPath();
	ctx.moveTo(path2[0].x, path2[0].y);
	for (var i = 1; i < path2.length; i++) {
		ctx.lineTo(path2[i].x, path2[i].y);
	}
	ctx.strokeStyle = "white";
	ctx.stroke();

	// 绘制地球2
	ctx.beginPath();
	ctx.arc(x3, y3, r3, 0, 2*Math.PI);
	ctx.fillStyle = "yellow";
	ctx.fill();

	// 绘制地球2轨迹
	ctx.beginPath();
	ctx.moveTo(path3[0].x, path3[0].y);
	for (var i = 1; i < path3.length; i++) {
		ctx.lineTo(path3[i].x, path3[i].y);
	}
	ctx.strokeStyle = "white";
	ctx.stroke();

	// 绘制地球3
	ctx.beginPath();
	ctx.arc(x4, y4, r4, 0, 2*Math.PI);
	ctx.fillStyle = "yellow";
	ctx.fill();

	// 绘制地球3轨迹
	ctx.beginPath();
	ctx.moveTo(path4[0].x, path4[0].y);
	for (var i = 1; i < path4.length; i++) {
		ctx.lineTo(path4[i].x, path4[i].y);
	}
	ctx.strokeStyle = "white";
	ctx.stroke();
}

function loop() {
	update();
	draw();
	requestAnimationFrame(loop);
}

loop();
