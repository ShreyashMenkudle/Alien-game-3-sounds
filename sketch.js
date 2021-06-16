//Gamestates
var PLAY=1;
var END =0;
var WIN =2;
var BEGAN =3;
var gameState=BEGAN;

//scores
var score=0;

//sprites
var alien,grass, ground,germ;
var edges;

// Sounds & Images 
var alienImg,grassImg;
var bg,germImg;
var sng,help;

//Groups
var grassGroup,germGroup;

function preload(){
  //Load images here
  alienImg = loadImage("image/alien1.png");
  grassImg = loadImage("image/grass.png");

  germImg  = loadAnimation("image/germ1.png","image/germ2.png");
  bg       = loadImage("image/bg.png");

  sng      = loadSound("sng.mp3");
  help     = loadSound("hlp.mp3");
}

function setup() {
  createCanvas(600, displayHeight);
  
  // create groups and sprites here
  ground= createSprite(300,displayHeight-100,1000,30);
  ground.shapeColor="green";
  
  alien = createSprite(200, displayHeight-displayHeight+50);
  alien.addImage(alienImg);
  alien.scale = 0.3;

  grassGroup = createGroup();
  germGroup = createGroup();

  /*button = createButton('restart');
  button.position(500,50);
  button.style('width', '100px');
  button.style('height', '40px');
  button.style('background', 'lightpink'); */
}

function draw() {
  /*button.mousePressed(() => {
    restart();
});*/
  
// Create edge sprites and create bounce off
  edges = createEdgeSprites();
  alien.bounceOff(edges[0]);
  alien.bounceOff(edges[1]);
  
  if(gameState===3){
    background("black");

    help.play();
    alien.visible = false;
    textSize(20);
    fill("yellow");
    stroke("black");
    text("Help ALIEANO to eat grass &",150,100);
    text("avoid dangerous germs to",180,125);
    text("infect the ALIEANO.",180,150);
    text("You are only the will of",180,200);
    text("ALIEANO to survive in",180,225);
    text("dangerous land of germs.",180,250);

    textSize(10);
    fill("white");
    text("Press Space to continue...",150,400);

    if(keyDown("space")){
      gameState=1;
    }
  }

if(gameState===1){
  background(bg);

  sng.play();

  alien.visible = true;
  if(keyDown("RIGHT_ARROW")){
      alien.velocityX=6;
    }
  if(keyDown("LEFT_ARROW")){
    alien.velocityX=-6;
  }
  
  stroke("black");
  textSize(22);
  fill("white");
  text("Score: " +score,10,displayHeight-displayHeight+50);

  spawnGrass();
  spawnGerm();

  if(score === 100){
    gameState=2;
  }
  
}else if(gameState === 0){
  background(bg);

  grassGroup.setVelocityYEach(0);
  grassGroup.setLifetimeEach(-1);

  germGroup.setVelocityYEach(0);
  germGroup.setLifetimeEach(-1);

  alien.setVelocityX = 0;
  stroke("white");
  textSize(22);
  fill("red");
  text("You Lose!",300,displayHeight/2-50);
 }

  if(alien.isTouching(grassGroup)){
  score=score+10;
  grassGroup[0].destroy();
  }

  if(alien.isTouching(germGroup)){
  gameState=0;
  }

  if(gameState===2){
    textSize(30);
    fill("red");
    text("YOU WON!",300,displayHeight/2);
  }
  drawSprites();
}

//functions to spawn NPCs.
function spawnGrass(){
  if (frameCount % 100 === 0) {
    grass = createSprite(600,displayHeight-50,40,10);
    grass.x = Math.round(random(50,575));
    grass.addImage(grassImg);
    grass.scale = 0.3;
    grass.velocityY = -5;
    
     //assign lifetime to the variable
    grass.lifetime = 200;
    
    grassGroup.add(grass);

  }
}

function spawnGerm(){
  if (frameCount % 60 === 0) {
    germ = createSprite(600,displayHeight-50,20,20);
    germ.x = Math.round(random(50,575));
    germ.addAnimation("alien",germImg);
    germ.scale = 0.1;
    germ.velocityY = -(score/10);
    
    germGroup.add(germ);

  }

  if(germGroup.y<0){
    germGroup.destroyEach(0);
  }
}

/*
function restart(){
  gameState=3;
  score=0;
*/