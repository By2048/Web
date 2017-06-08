var ball={x:512,y:100,r:20,g:2,vx:-2,vy:0,color:"red"}
window.onload=function(){
	var canvas=document.getElementById("canvas");
	canvas.width=1024
	canvas.height=768
	var context=canvas.getContext("2d");
	setInterval(
		function(){
			drawBall(context)
			updateBall()
		},
		35
	);
}

function updateBall(){
	ball.x+=ball.vx
	ball.y+=ball.vy
	ball.vy+=ball.g
	if(ball.y>=768-ball.r){
		ball.y=768-ball.r
		ball.vy=-ball.vy*0.618
	}
}
function drawBall(context){
	context.clearRect(0,0,context.canvas.width,context.canvas.height)
	context.fillStyle=ball.color
	context.beginPath()
	context.arc(ball.x,ball.y,ball.r,0,2*Math.PI)
	context.closePath()
	context.fill()
}