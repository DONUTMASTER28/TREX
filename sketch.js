var Play = 1;
var End = 0;
var GameState = Play;

var trex, trex_running, trex_collided;
var ground, invisibleGround, groundImage;
var cloud, cloudsGroup, cloudImage;
var obstaclesGroup, obstacle1, obstacle2, obstacle3, obstacle4, obstacle5, obstacle6;
var GameOverImage, RestartImage;
var JumpSound, CheckpointSound, DiedSound;


var score;


function preload(){
  trex_running = loadAnimation("trex1.png","trex2.png","trex3.png");
  trex_collided = loadAnimation("trex_collided.png");
  
  groundImage = loadImage("ground2.png");
  cloudImage = loadImage("cloud.png");
  obstacle1 = loadImage("obstacle1.png");
  obstacle2 = loadImage("obstacle2.png");
  obstacle3 = loadImage("obstacle3.png");
  obstacle4 = loadImage("obstacle4.png");
  obstacle5 = loadImage("obstacle5.png");
  obstacle6 = loadImage("obstacle6.png");
  GameOverImage = loadImage("GAMEOVER.png");
  RestartImage = loadImage("restart.png");
  JumpSound = loadSound("jump.mp3");
  CheckpointSound = loadSound("checkpoint.mp3");
  DiedSound = loadSound("die.mp3");
  
}

function setup() {

  createCanvas(600,200)
  
  //crear sprite de trex
  trex = createSprite(50,160,20,50);
  trex.addAnimation("running", trex_running);
  trex.addAnimation("collided", trex_collided); 
  trex.scale = 0.5;
  
  //crear sprite de suelo
  ground = createSprite(200,180,400,20);
  ground.addImage("ground",groundImage);
  ground.x = ground.width /2;

  //Crear GAME OVER y acerlo invisible
  GameOVER = createSprite(300,100);
  GameOVER.addImage(GameOverImage);
  Restart = createSprite(300,140);
  Restart.addImage(RestartImage);
  GameOVER.scale = 0.05;
  Restart.scale = 0.5;
  //aaaaaaaaaaaabbbbbbbbccccccdddddddeeeeeefffffgggggggghhhhhiiiiiiiijjjjjjjjjjjkkkkkkkkklllllllllmmmmmmmnnnnnnnnoooooopppprrrrsssssttttttt
  
  //crear sprite de suelo invisible
  invisibleGround = createSprite(200,190,400,10);
  invisibleGround.visible = false;
  //crear grupos de obstaculos y nubes
  //:D
  //:))
  obstaclesGroup = new Group();
  cloudsGroup = new Group();
  trex.setCollider("rectangle", 0,0,100,trex.height);
  trex.debug = false;
  //generar números aleatorios

  score = 0;
}

function draw() {
  //establecer color de fondo
  background(180);
  //algo para añadir la punctuacion
  text("Score: "+score,500,50);
 if(GameState === Play){
   score = score + Math.round(frameCount/60);
   ground.velocityX = -4;
   GameOVER.visible = false;
   Restart.visible = false;
   
  
  //hacer que el trex salte al presionar la barra espaciadora
    if(keyDown("space")&& trex.y >= 150) {
      trex.velocityY = -12;
      JumpSound.play();
    }
  
    trex.velocityY = trex.velocityY + 0.8;

  
    if (ground.x < 0){
     ground.x = ground.width/2;
    }
  
  //aparecer nubes
    spawnClouds();
    spawnObstacles();
    if(obstaclesGroup.isTouching(trex)){
     DiedSound.play();
     GameState = End; 

    }
  
  
  }
   else if(GameState === End){
    GameOVER.visible = true;
    Restart.visible = true;
    ground.velocityX = 0;
    trex.velocityX = 0;
    trex.changeAnimation("collided", trex_collided );
    //restableser el tiempo de vida :D
    obstaclesGroup.setLifetimeEach(-1);
    cloudsGroup.setLifetimeEach(-1);
    obstaclesGroup.setVelocityXEach(0);
    cloudsGroup.setVelocityXEach(0);
    if (mousePressedOver(Restart)){
     reset();
    }
   }
  
   //evitar que el trex caiga
  trex.collide(invisibleGround);
  
  drawSprites();
}

//función para aparecer las nubes
function spawnClouds(){
 //escribir aquí el código 
 if (frameCount%60 === 0){
  cloud = createSprite(600,100,40,10);
  cloud.addImage(cloudImage);
  cloud.y = Math.round(random(10,60))
  cloud.scale = 0.4;
  cloud.velocityX = -3;
  cloud.depth = trex.depth;
  trex.depth = trex.depth+1;
  cloud.lifetime = 200
  cloudsGroup.add(cloud)
  //codigo escrrito!🫡
 }
}

function spawnObstacles(){
 if (frameCount%60 === 0){
  var obstacle = createSprite(400,160,10,40);
  obstacle.velocityX = -6;
  var rand = Math.round(random(1, 6));
  switch(rand){
    case 1: obstacle.addImage(obstacle1);
            break;
    case 2: obstacle.addImage(obstacle2);
            break;
    case 3: obstacle.addImage(obstacle3);
            break;
    case 4: obstacle.addImage(obstacle4);
            break;
    case 5: obstacle.addImage(obstacle5);
            break;
    case 6: obstacle.addImage(obstacle6);
            break;
    default: break;
  }
  obstacle.lifetime = 300;
  obstacle.scale = 0.5;
  obstaclesGroup.add(obstacle)
 }
}
function reset(){
  GameState = Play;
  GameOVER.visible = false;
  Restart.visible = false;
  obstaclesGroup.destroyEach();
  cloudsGroup.destroyEach();
  score = 0;
  trex.changeAnimation("running", trex_running);
}




