var tower, towerImg;
var ghost, ghostImg;
var climber, climberImg,climbersGroup;
var door, doorImg, doorsGroup;
var invisibleBlockGroup,invisibleBlock;
var gameState="play";
var spookySound;

function preload(){
  towerImg=loadImage("tower.png");
  climberImg=loadImage("climber.png");
  doorImg=loadImage("door.png");
  ghostImg=loadImage("ghost-standing.png");
  spookySound=loadSound("spooky.wav");
  
}

function setup(){
  createCanvas(600,600)
  tower= createSprite(300,10,0,0);
  tower.addImage("tower",towerImg);
  tower.velocityY=3;
  
  doorsGroup=new Group();
  climbersGroup=new Group();
  invisibleBlockGroup=new Group();
  
  ghost=createSprite(300,300,0,0);
  ghost.addImage(ghostImg)
  ghost.scale=0.5;
  spookySound.loop();
  
  
  
}
function draw(){
  
  if(tower.y>100){
    tower.y=10;
  }
  if(gameState==="play"){
    
  if(keyDown("right")){
    ghost.x=ghost.x+2;
  }
  if(keyDown("left")){
    ghost.x=ghost.x-2;
  }
  
  
  if(keyDown("space")){
    ghost.velocityY=-10;
  }
  ghost.velocityY=ghost.velocityY+0.5
 spawnDoors();  
  if(climbersGroup.isTouching(ghost)){
    ghost.velocityY=0;
  }
  if(invisibleBlockGroup.isTouching(ghost)|| ghost.y>600){
    ghost.destroy();
    gameState="end"
  }
    drawSprites();
  }
  if(gameState==="end"){
    stroke("red")
    fill("yellow")
    textSize(30);
    text("GAME OVER",300,300)
  }
  
}

function spawnDoors(){
  
  if(frameCount%200===0)
  {
    door=createSprite(Math.round(random(60,500)),10,0,0)
  door.addImage(doorImg)
  door.velocityY=3;
    door.lifeTime=400;
    doorsGroup.add(door);
  climber=createSprite(door.x,60,0,0);
    climber.addImage(climberImg);
    climber.velocityY=3;
    climber.lifeTime=400;
    climbersGroup.add(climber)
    
    ghost.depth=door.depth;
    ghost.depth=ghost.depth+1;
    
    invisibleBlock=createSprite(door.x,60,climber.width,climber.height);
    invisibleBlock.velocityY=3;
    invisibleBlock.lifeTime=400;
    invisibleBlockGroup.add(invisibleBlock);
    invisibleBlock.visible=false;
    
    
  }
}
