var gameState =  "play"


function preload(){
background1 = loadImage("desertbg.jpg");
boyimg = loadAnimation("12.png")
atheimg = loadAnimation("0.png","1.png","2.png","3.png","4.png","5.png","6.png","7.png","8.png","9.png","10.png","11.png",)
btnmov=loadImage("btn.png")

boyImg1 = loadAnimation("14.png","16.png")
boyImg2 = loadAnimation("43.png","44.png","45.png")
}



function setup() {
	createCanvas(displayWidth-40,displayHeight-150);

	ground = createSprite(width/2,height-10,displayWidth,20)
  //ground.addImage(background1)
  //ground.scale=9
	boy    =  createSprite(width/6,height-160,100,100)
boy.addAnimation("anim",boyimg);
boy.addAnimation("collided",boyImg1)
boy.addAnimation("up",boyImg2)
boy.scale = (2);

  athena = createSprite(width/1.2,height-110,100,100);
  athena.addAnimation("goddess",atheimg);
  athena.scale = (2)


 healthBar1 = createSprite(175,100,300,25);
 healthBar1.shapeColor = "white";

  healthLevel1 = createSprite(175,100,290,15);
  healthLevel1.shapeColor = "red";

  healthBlock1 = createSprite(19,100,40,45);
  healthBlock1.shapeColor = "lightgrey";


  healthBar2 = createSprite(windowWidth-195,100,300,25);
  healthBar2.shapeColor = "white";

  healthLevel2 = createSprite(windowWidth-195,100,290,15);
  healthLevel2.shapeColor = "red";

  healthBlock2 = createSprite(windowWidth-50,100,40,45);
  healthBlock2.shapeColor = "lightgrey";
  
  healthBlock1.depth = healthLevel2.depth;
  healthLevel2.depth -= 1;

 bt = createSprite(70,windowHeight-160,50,50);
  bt.addImage(btnmov);
  bt.scale = 0.3;

   // restart btn
  restart = createButton('RESTART');
  restart.position(windowWidth/2-60,windowHeight/2-100);
  restart.style('width','120px');
  restart.style('height','60px');
  restart.style('border-radius','20px');
  restart.style('color','black');
  restart.style('font-size','20px');
  restart.hide();
  restart.mousePressed(() => {
    gameState = "play";
    healthLevel1.x = 175;
    healthLevel2.x = windowWidth-200;
    boy.x = 400;
    athena.x =windowWidth-400;
  })
}


function draw() {
  rectMode(CENTER);
  background(background1);
drawSprites();
 
 //Player movement  

 if(gameState==="play"){
     frameRate(50);
  restart.hide();
  
if(keyWentDown(RIGHT_ARROW)){
  boy.x=boy.x+15
boy.changeAnimation("collided",boyImg1)
  }
if(keyWentDown(LEFT_ARROW)){
  boy.x=boy.x-15
  boy.addAnimation("anim",boyimg);
} 
if(keyWentDown(UP_ARROW)){
 boy.velocityY=-5
  boy.changeAnimation("up",boyImg2);
}

boy.velocityY=boy.velocityY+0.2
boy.collide(ground)

//Enemy movement

if(keyWentDown("w")){
  athena.x=athena.x+15 
  }
if(keyWentDown("s")){
  athena.x=athena.x-15
  }
if(keyWentDown("d")){
 athena.velocityY=-5
}
athena.velocityY=athena.velocityY+0.2
athena.collide(ground)


//boy punching 

  if(keyDown("P")) {
    
    if(boy.isTouching(athena)) {
      healthLevel2.x += 0.5;
    }
  }
 
 //enemy punching

  if(keyDown("E")) {
    
    if(athena.isTouching(boy)) {
       healthLevel1.x -= 0.5;
     
    }
  }

 if(healthLevel1.x<-100) {
   gameState = "athenaWin";
  }

  if(healthLevel2.x>windowWidth+100) {
    gameState = "boyWin";
  }
 }
 
 
else if(gameState==="boyWin"){
  textSize(25);
  fill("red");
  text("Boy WINS!!",windowWidth/2-70,windowHeight/2-125);
  restart.style('background','red');
  restart.show();

} else if(gameState === "athenaWin") {

  textSize(25);
  fill("blue");
  text("ATHENA WINS!!",windowWidth/2-70,windowHeight/2-125);
  restart.style('background','blue');
  restart.show();
}
}



 



