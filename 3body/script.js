const canvas = document.getElementById("canvas");

const ctx = canvas.getContext("2d");

const G = 6.67408e-11; // 引力常数

const m1 = 1.989e30; // 太阳质量

const m2 = 5.972e24; // 地球质量

const m3 = 5.972e24; // 地球质量

const m4 = 5.972e24; // 地球质量

let x1 = canvas.width / 2; // 太阳初始位置

let y1 = canvas.height / 2;

let x2 = canvas.width / 2 + 200000000; // 地球初始位置

let y2 = canvas.height / 2;

let x3 = canvas.width / 2 - 200000000; // 地球初始位置

let y3 = canvas.height / 2 + 200000000;

let x4 = canvas.width / 2 - 200000000; // 地球初始位置

let y4 = canvas.height / 2 - 200000000;

let vx1 = 0; // 太阳初始速度

let vy1 = 0;

let vx2 = 0; // 地球初始速度

let vy2 = -29783;

let vx3 = 29783 / Math.sqrt(2); // 地球初始速度

let vy3 = -29783 / Math.sqrt(2);

let vx4 = -29783 / Math.sqrt(2); // 地球初始速度

let vy4 = 29783 / Math.sqrt(2);

const r1 = 20; // 太阳半径

const r2 = 10; // 地球半径

const r3 = 10; // 地球半径

const r4 = 10; // 地球半径

const dt = 1000; // 时间步长

const path2 = []; // 地球轨迹

const path3 = []; // 地球轨迹

const path4 = []; // 地球轨迹

function resizeCanvas() {

	canvas.width = window.innerWidth;	canvas.height = window.innerHeight;

}

function update() {

	// 计算引力

	const d12 = Math.sqrt(Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2));

	const d13 = Math.sqrt(Math.pow(x1 - x3, 2) + Math.pow(y1 - y3, 2));

	const d14 = Math.sqrt(Math.pow(x1 - x4, 2) + Math.pow(y1 - y4, 2));

	const F12 = G * m1 * m2 / Math.pow(d12, 2);

	const F13 = G * m1 * m3 / Math.pow(d13, 2);

	const F14 = G * m1 * m4 / Math.pow(d14, 2);

	const theta12 = Math.atan2(y2 - y1, x2 - x1);

	const theta13 = Math.atan2(y3 - y1, x3 - x1);

	const theta14 = Math.atan2(y4 - y1, x4 - x1);

	const Fx2 = F12 * Math.cos(theta12) + F13 * Math.cos(theta13) + F14 * Math.cos(theta14);

	const Fy2 = F12 * Math.sin(theta12) + F13 * Math.sin(theta13) + F14 * Math.sin(theta14);

	const Fx3 = -F12 * Math.cos(theta12) + F13 * Math.cos(theta13) - F14 * Math.cos(theta14);

	const Fy3 = -F12 * Math.sin(theta12) + F13 * Math.sin(theta13) - F14 * Math.sin(theta14);

	const Fx4 = -F13 * Math.cos(theta13) - F14 * Math.cos(theta14);

	const Fy4 = -F13 * Math.sin(theta13) - F14 * Math.sin(theta14);

	// 计算加速度和速度

	const ax2 = Fx2 / m2;

	const ay2 = Fy2 / m2;

	const ax3 = Fx3 / m3;

	const ay3 = Fy3 / m3;

	const ax4 = Fx4 / m4;

	const ay4 = Fy4 / m4;

	vx2 += ax2 * dt;

	vy2 += ay2 * dt;

	vx3 += ax3 * dt;

	vy3 += ay3 * dt;

	vx4 += ax4 * dt;

	vy4 += ay4 * dt;

	// 计算位置

	x2 += vx2 * dt;

	y2 += vy2 * dt;

	x3 += vx3 * dt;

	y3 += vy3 * dt;

	x4 += vx4 * dt;

	y4 += vy4 * dt;

	// 绘制太阳和行星

	ctx.clearRect(0, 0, canvas.width, canvas.height);

	ctx.fillStyle = "orange";

	ctx.beginPath();

	ctx.arc(x1, y1, r1, 0, 2 * Math.PI);

	ctx.fill();

	ctx.fillStyle = "yellow";

	ctx.beginPath();

	ctx.arc(x2, y2, r2, 0, 2 * Math.PI);

	ctx.fill();

	ctx.beginPath();

	ctx.arc(x3, y3, r3, 0, 2 * Math.PI);

	ctx.fill();

	ctx.beginPath();

	ctx.arc(x4, y4, r4, 0, 2 * Math.PI);

	ctx.fill();

	// 绘制轨迹

	path2.push({x: x2, y: y2});

	path3.push({x: x3, y: y3});

	path4.push({x: x4, y: y4});

	ctx.strokeStyle = "yellow";

	ctx.beginPath();

	ctx.moveTo(path2[0].x, path2[0].y);

	for (let i = 1; i < path2.length; i++) {

		ctx.lineTo(path2[i].x, path2[i].y);

	}

	ctx.stroke();

	ctx.strokeStyle = "green";

	ctx.beginPath();

	ctx.moveTo(path3[0].x, path3[0].y);

	for (let i = 1; i < path3.length; i++) {

		ctx.lineTo(path3[i].x, path3[i].y);

	}

	ctx.stroke();

	ctx.strokeStyle = "blue";

	ctx.beginPath();

	ctx.moveTo(path4[0].x, path4[0].y);

	for (let i = 1; i < path4.length; i++) {

		ctx.lineTo(path4[i].x, path4[i].y);

	}

	ctx.stroke();

	// 删除太阳轨迹

	if (path2.length > 5000) {

		path2.shift();

	}

	if (path3.length > 5000) {

		path3.shift();

	}

	if (path4.length > 5000) {

		path4.shift();

	}

}

resizeCanvas();

window.addEventListener("resize", resizeCanvas);

setInterval(update, dt);
