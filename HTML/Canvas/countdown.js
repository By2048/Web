var Win_Width=1024
var Win_Height=768
var Radius=8
var Margin_Top=60
var Margin_Left=30

// var End_Time=new Date(2017,1,5,18,27,52)
var End_Time=new Date()
End_Time.setTime(End_Time.getTime()+7200*1000)

var countdownSeconds=0

const colors = ["#33B5E5","#0099CC","#AA66CC","#9933CC","#99CC00","#669900","#FFBB33","#FF8800","#FF4444","#CC0000"]
var balls=[]


window.onload=function(){

	Win_Width=document.documentElement.clientWidth-0
	Win_Height=document.documentElement.clientHeight-0
	// Win_Width=document.body.clientWidth
	// Win_Height=document.body.clientHeight
	Margin_Left=Math.round(Win_Width/10)
	Radius = Math.round(Win_Width * 4 / 5 / 108)-1
	Margin_Top=Math.round(Win_Height/5)


	var canvas=document.getElementById("canvas");
	var context=canvas.getContext("2d");
	canvas.width=Win_Width;
	canvas.height=Win_Height;

	currentShowSeconds=getCurrentShowSeconds()
	setInterval(
		function(){
			drawClock(context)
			updateClock()
		},
		50
	);
}

function drawClock(context){
	context.clearRect(0,0,Win_Width,Win_Height)

	var hours=parseInt(currentShowSeconds/3600)
	var minutes=parseInt((currentShowSeconds-hours*3600)/60)
	var seconds=currentShowSeconds%60

	drawMatrix(Margin_Left+0*(Radius+1),Margin_Top,parseInt(hours/10),context)
	drawMatrix(Margin_Left+15*(Radius+1),Margin_Top,parseInt(hours%10),context)
	drawMatrix(Margin_Left+30*(Radius+1),Margin_Top,parseInt(10),context)
	drawMatrix(Margin_Left+39*(Radius+1),Margin_Top,parseInt(minutes/10),context)
	drawMatrix(Margin_Left+54*(Radius+1),Margin_Top,parseInt(minutes%10),context)
	drawMatrix(Margin_Left+69*(Radius+1),Margin_Top,parseInt(10),context)
	drawMatrix(Margin_Left+78*(Radius+1),Margin_Top,parseInt(seconds/10),context)
	drawMatrix(Margin_Left+93*(Radius+1),Margin_Top,parseInt(seconds%10),context)
	for( var i = 0 ; i < balls.length ; i ++ ){
        context.fillStyle=balls[i].color;

        context.beginPath();
        context.arc( balls[i].x , balls[i].y , Radius , 0 , 2*Math.PI , true );
        context.closePath();

        context.fill();
    }
}



function updateClock(){
	var nextShowSeconds=getCurrentShowSeconds()
	var nextHours=parseInt(nextShowSeconds/3600)
	var nextMinutes=parseInt((nextShowSeconds-nextHours*3600)/60)
	var nextSeconds=nextShowSeconds%60

	var curHours=parseInt(currentShowSeconds/3600)
	var curMinutes=parseInt((currentShowSeconds-curHours*3600)/60)
	var curSeconds=currentShowSeconds%60

	if(nextSeconds != curSeconds){
		if( parseInt(curHours/10) != parseInt(nextHours/10) ){
            addBalls( Margin_Left + 0 , Margin_Top , parseInt(curHours/10) );
        }
        if( parseInt(curHours%10) != parseInt(nextHours%10) ){
            addBalls( Margin_Left + 15*(Radius+1) , Margin_Top , parseInt(curHours/10) );
        }

        if( parseInt(curMinutes/10) != parseInt(nextMinutes/10) ){
            addBalls( Margin_Left + 39*(Radius+1) , Margin_Top , parseInt(curMinutes/10) );
        }
        if( parseInt(curMinutes%10) != parseInt(nextMinutes%10) ){
            addBalls( Margin_Left + 54*(Radius+1) , Margin_Top , parseInt(curMinutes%10) );
        }

        if( parseInt(curSeconds/10) != parseInt(nextSeconds/10) ){
            addBalls( Margin_Left + 78*(Radius+1) , Margin_Top , parseInt(curSeconds/10) );
        }
        if( parseInt(curSeconds%10) != parseInt(nextSeconds%10) ){
            addBalls( Margin_Left + 93*(Radius+1) , Margin_Top , parseInt(nextSeconds%10) );
        }
		currentShowSeconds=nextShowSeconds
	}
	updateBalls()
	console.log(balls.length)
}

function addBalls(x,y,num){
	for(var i=0;i<matrixNum[num].length;i++){
		for(var j=0;j<matrixNum[num][i].length;j++){
			if(matrixNum[num][i][j]==1){
				var aBall={
					x:x+j*2*(Radius+1)+(Radius+1),
					y:y+i*2*(Radius+1)+(Radius+1),
                    g:1.5+Math.random(),
 					vx:Math.pow( -1 , Math.ceil( Math.random()*1000 ) ) * 4,
                    vy:-5,
                    color: colors[ Math.floor( Math.random()*colors.length ) ]
				}
				balls.push( aBall )
			}
		}
	}
}

function updateBalls(){
    for( var i = 0 ; i < balls.length ; i ++ ){
        balls[i].x += balls[i].vx;
        balls[i].y += balls[i].vy;
        balls[i].vy += balls[i].g;
        if( balls[i].y >= Win_Height-Radius ){
            balls[i].y = Win_Height-Radius;
            balls[i].vy = - balls[i].vy*0.75;
        }
    }
    var cnt=0
    for(var i=0;i<balls.length;i++){
    	if(balls[i].x+Radius>0 && balls[i].x-Radius<Win_Width){
    		balls[cnt++]=balls[i]
    	}
    }
    while(balls.length>Math.min(300,cnt)){
    	balls.pop()
    }
}

function drawMatrix(x,y,num,context){
	context.fillStyle="rgb(0,102,153)"
	for(var i=0;i<matrixNum[num].length;i++){
		for(var j=0;j<matrixNum[num][i].length;j++){
			if(matrixNum[num][i][j]==1){
				context.beginPath()
				x_point=x+j*2*(Radius+1)+(Radius+1)
				y_point=y+i*2*(Radius+1)+(Radius+1)
				context.arc(x_point,y_point,Radius,0,2*Math.PI)
				context.closePath()
				context.fill()
			}
		}
	}
}

function getCurrentShowSeconds(){
	// var nowTime=new Date()
	// var seconds=End_Time.getTime()-nowTime.getTime()
	// seconds=Math.round(seconds/1000)
	// return seconds>=0 ? seconds:0
	
	var nowTime = new Date();
    var seconds = nowTime.getHours() * 3600 + nowTime.getMinutes() * 60 + nowTime.getSeconds();
    return seconds;
}





