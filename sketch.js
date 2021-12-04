var bgImg,bg
var topGround,bottomGround
var balloon,balloonImg
var obstacleTop,obstop1,obstop2
var obstacleBottom,obsbottom1,obsbottom2,obsbottom3
var gameOver,gameOverImg,restart,restartImg
var score=0
var PLAY=1
var END=0
var gameState=PLAY
var topGroup,bottomGroup,barGroup


function preload() {
  bgImg=loadImage("sprites/bg.png")
  balloonImg=loadAnimation("sprites/balloon1.png","sprites/balloon2.png","sprites/balloon3.png")

    obstop1=loadImage("sprites/obsTop1.png")
    obstop2=loadImage("sprites/obsTop2.png")
    obsbottom1=loadImage("sprites/obsBottom1.png")
    obsbottom2=loadImage("sprites/obsBottom2.png")
    obsbottom3=loadImage("sprites/obsBottom3.png")
    gameOverImg=loadImage("sprites/gameOver.png")
    restartImg=loadImage("sprites/restart.png")

}

function setup(){
   bg=createSprite(170,400)
   bg.addImage(bgImg)
   bg.scale=1.1

   topGround=createSprite(200,10,700,20)
   topGround.visible=false

   bottomGround=createSprite(200,390,700,20)
   bottomGround.visible=false

   balloon=createSprite(100,200,20,50)
   balloon.addAnimation("balloon",balloonImg)
   balloon.scale=0.2

   topGroup=new Group();
   bottomGroup=new Group();
   barGroup=new Group();

   gameOver=createSprite(175,200)
    gameOver.addImage(gameOverImg)
    gameOver.scale=0.5
    gameOver.visible=false

    restart=createSprite(200,220)
    restart.addImage(restartImg)
    restart.scale=0.5
    restart.visible=false


}

function draw(){
   background("black")

   if(gameState===PLAY){

    if(keyDown("space")){

        balloon.velocityY=-6

    }

    balloon.velocityY=balloon.velocityY+2
    bar()
    spawnObstaclesTop()
    spawnObstaclesBottom()

    if(topGroup.isTouching(balloon) || bottomGroup.isTouching(balloon) || balloon.isTouching(topGround) || balloon.isTouching(bottomGround)){
        gameState=END
    }
   }
   if(gameState===END){
       gameOver.visible=true
       restart.visible=true
       balloon.velocityX=0
       balloon.velocityY=0
       topGroup.setVelocityXEach(0)
       bottomGroup.setVelocityXEach(0)
        barGroup.setVelocityXEach(0)
        topGroup.setLifetimeEach(-1)
        bottomGroup.setLifetimeEach(-1)
        balloon.y=200
        
        if(mousePressedOver(restart)){
            reset()
        }

   }
 
   drawSprites()

   
}

function spawnObstaclesTop(){

   if(World.frameCount%60===0){
       obstacleTop=createSprite(400,50,50,50)
    obstacleTop.velocityX=-4
    obstacleTop.scale=0.1
    obstacleTop.y=Math.round(random(10,100))
    var rand=Math.round(random(1,2))
    switch(rand){
        case 1:obstacleTop.addImage(obstop1)
        break;

        case 2:obstacleTop.addImage(obstop2)
        break;
        default:break;
    }

    obstacleTop.lifetime=100
    topGroup.add(obstacleTop)

    //balloon.depth=baloon.depth+1
   }
}

function spawnObstaclesBottom(){

    if(World.frameCount%60===0){
        obstacleBottom=createSprite(400,350,350,50)
     obstacleBottom.velocityX=-4
     obstacleBottom.scale=0.1
     //obstacleBottom.y=Math.round(random(10,100))
     var rand=Math.round(random(1,3))
     switch(rand){
         case 1:obstacleBottom.addImage(obsBottom1)
         break;
 
         case 2:obstacleBottom.addImage(obsBottom2)
         break;

         case 3:obstacleBottom.addImage(obsBottom3)
         break;
         default:break;
     }
 
     obstacleBottom.lifetime=100
     bottomGroup.add(obstacleBottom)
     //balloon.depth=baloon.depth+1
 
    }
 }

function bar(){

    if(World.frameCount%60===0){

        var bar=createSprite(400,200,10,400)
        bar.velocityX=-6 
        bar.depth=balloon.depth
        bar.lifetime=70
        bar.visible=false

    }

}

function reset(){

    gameState=PLAY
    gameOver.visible=false
    restart.visible=false
    topGroup.destroyEach()
    bottomGroup.destroyEach()
    score=0
}


/*sync function getBackgroundImg(){
    var response = await fetch("http://worldtimeapi.org/api/timezone/Asia/Kolkata");
    var responseJSON = await response.json();

    var datetime = responseJSON.datetime;
    var hour = datetime.slice(11,13);
    
    if(hour>=0600 && hour<=1900){
        bg = "sprites/bg1.png";
    }
    else{
        bg = "sprites/bg2.jpg";
    }

    backgroundImg = loadImage(bg);
    console.log(backgroundImg);
}*/